import {  spawn } from 'child_process'
import { platform } from 'os'
import { App } from 'electron'

// Uygulama bilgisi tipi tanımı
interface AppInfo {
  name: string;
  id: string;
  version: string;
  newVersion?: string;
}

/**
 * Winget ile ilgili işlemleri yöneten servis
 */
export class WingetService {
  private isWindows: boolean;
  private wingetAvailable: boolean | null = null;
  // private windowsTerminalAvailable: boolean;
  // private readonly execAsync: Function;
  updatingApps: Set<string> = new Set();
  installingApps: Set<string> = new Set();
  private readonly app: App;

  // Örnek uygulama verileri - winget çalışmazsa kullanılacak
  private mockApps = [
    { name: "Visual Studio Code", version: "1.76.0", newVersion: "1.80.1" },
    { name: "Google Chrome", version: "115.0.1", newVersion: "" },
    { name: "Mozilla Firefox", version: "115.0", newVersion: "116.0" },
    { name: "Node.js", version: "18.15.0", newVersion: "20.5.1" },
    { name: "WinRAR", version: "6.10", newVersion: "6.23" },
    { name: "7-Zip", version: "22.01", newVersion: "" },
    { name: "Notepad++", version: "8.5.0", newVersion: "8.5.4" },
    { name: "VLC Media Player", version: "3.0.18", newVersion: "" },
    { name: "Adobe Acrobat Reader", version: "23.001.20143", newVersion: "23.003.20244" },
    { name: "Spotify", version: "1.2.8.923", newVersion: "1.2.9.743" },
    { name: "Discord", version: "1.0.9012", newVersion: "1.0.9016" },
    { name: "WhatsApp", version: "2.2320.2", newVersion: "" }
  ];

  constructor(app: App) {
    this.isWindows = platform() === 'win32';
    // this.windowsTerminalAvailable = platform() === 'win32';
    // this.execAsync = promisify(exec);
    this.app = app;
  }

  /**
   * Winget komutunun çalışıp çalışmadığını kontrol eder
   * @returns Winget'in kullanılabilir olup olmadığı
   */
  async checkWingetAvailability(): Promise<boolean> {
    // Eğer daha önce kontrol edilmişse, sonucu döndür
    if (this.wingetAvailable !== null) {
      return this.wingetAvailable;
    }
    console.log(this.app);
    // Windows dışı işletim sistemlerinde winget çalışmaz
    if (!this.isWindows) {
      console.warn('Winget only works on Windows OS');
      this.wingetAvailable = false;
      return false;
    }

    return new Promise<boolean>((resolve) => {
      // Timeout ekleyelim ki winget yoksa program takılmasın
      const timeout = setTimeout(() => {
        console.warn('Winget availability check timed out');
        this.wingetAvailable = false;
        resolve(false);
      }, 3000);

      try {
        const process = spawn('winget', ['--version']);

        process.on('error', (error) => {
          clearTimeout(timeout);
          console.warn('Winget not available:', error.message);
          this.wingetAvailable = false;
          resolve(false);
        });

        process.on('close', (code) => {
          clearTimeout(timeout);
          this.wingetAvailable = code === 0;
          resolve(code === 0);
        });
      } catch (error) {
        clearTimeout(timeout);
        console.warn('Error checking winget availability:', error);
        this.wingetAvailable = false;
        resolve(false);
      }
    });
  }

  /**
   * Winget'i yükler
   * @returns Yükleme işleminin sonucu
   */
  async installWinget(): Promise<any> {
    try {
      // Windows dışı işletim sistemlerinde winget çalışmaz
      if (!this.isWindows) {
        return { 
          success: false, 
          message: 'Winget only works on Windows OS' 
        };
      }

      console.log('Installing winget...');

      // Microsoft Store'dan winget'i yüklemek için ms-appinstaller:?source=winget protokolünü kullanıyoruz
      const process = spawn('cmd.exe', ['/c', 'start', 'ms-appinstaller:?source=winget']);

      return new Promise((resolve) => {
        process.on('error', (error) => {
          console.error('Error installing winget:', error);
          resolve({ 
            success: false, 
            message: `Winget yüklenirken hata oluştu: ${error.message}` 
          });
        });

        process.on('close', (code) => {
          if (code === 0) {
            console.log('Winget installation process started successfully');
            // Yükleme başlatıldı, ancak tamamlanıp tamamlanmadığını bilemeyiz
            // Bu nedenle kullanıcıya yükleme işleminin başlatıldığını bildiriyoruz
            this.wingetAvailable = null; // Yeniden kontrol etmek için sıfırla
            resolve({ 
              success: true, 
              message: 'Winget yükleme işlemi başlatıldı. Lütfen Microsoft Store\'daki yükleme işlemini tamamlayın.' 
            });
          } else {
            console.error(`Winget installation process exited with code ${code}`);
            resolve({ 
              success: false, 
              message: `Winget yükleme işlemi başlatılamadı (Kod: ${code})` 
            });
          }
        });
      });
    } catch (error: any) {
      console.error('Error installing winget:', error);
      return { 
        success: false, 
        message: `Winget yüklenirken hata oluştu: ${error.message || 'Bilinmeyen bir hata'}` 
      };
    }
  }

  /**
   * Yüklü uygulamaların listesini döndürür
   * @returns Yüklü uygulamaların listesi
   */
  async getInstalledApps(): Promise<any> {
    try {
      if (!this.wingetAvailable) {
        await this.checkWingetAvailability();
        if (!this.wingetAvailable) {
          return { 
            error: 'Winget yüklü değil veya erişilemiyor' 
          };
        }
      }

      const result = await this.executeCommand('list', ['--source', 'winget']);
      const apps = this.parseInstalledAppsList(result);
      return apps;
    } catch (error: any) {
      console.error('Winget getInstalledApps error:', error);
      if (error.message.includes('0x80070002') || error.message.includes('not found')) {
        throw new Error('Winget bulunamadı. Lütfen winget\'in yüklü olduğundan emin olun');
      }
      throw new Error(`Uygulama listesi alınamadı: ${error.message}`);
    }
  }

  /**
   * Winget ile uygulama arama
   * @param keyword Aranacak anahtar kelime
   * @returns Bulunan uygulamaların listesi
   */
  async searchApps(keyword: string): Promise<any> {
    try {
      if (!this.wingetAvailable) {
        await this.checkWingetAvailability();
        if (!this.wingetAvailable) {
          return { 
            error: 'Winget yüklü değil veya erişilemiyor' 
          };
        }
      }

      const result = await this.executeCommand('search', [keyword, '--source', 'winget', '--accept-source-agreements']);
      const apps = this.parseSearchResults(result);
      return apps;
    } catch (error: any) {
      console.error('Winget searchApps error:', error);
      if (error.message.includes('0x80070002') || error.message.includes('not found')) {
        throw new Error('Winget bulunamadı. Lütfen winget\'in yüklü olduğundan emin olun');
      }
      throw new Error(`Uygulama araması yapılamadı: ${error.message}`);
    }
  }

  /**
   * Winget ile uygulama güncelleme
   * @param app Güncellenecek uygulama (AppInfo objesi veya string olarak id)
   * @returns İşlem sonucu
   */
  async updateApp(app: AppInfo | string): Promise<any> {
    try {
      if (!this.wingetAvailable) {
        await this.checkWingetAvailability();
        if (!this.wingetAvailable) {
          return { 
            success: false, 
            message: 'Winget yüklü değil veya erişilemiyor' 
          };
        }
      }

      // Uygulama ID'sini al
      const appId = typeof app === 'string' ? app : app.id;

      if (!appId) {
        return { 
          success: false, 
          message: 'Geçersiz uygulama ID. Güncelleme yapılamadı.' 
        };
      }

      console.log(`Updating app with ID: ${appId}`);

      // Uygulamanın şu anda zaten güncelleniyor olup olmadığını kontrol et
      if (this.updatingApps.has(appId)) {
        return { 
          success: false, 
          message: 'Bu uygulama zaten güncelleniyor' 
        };
      }

      // Güncelleme işlemini takip et
      this.updatingApps.add(appId);

      try {
        // Uygulamanın var olduğunu kontrol et
        const installedApps = await this.getInstalledApps();
        const appExists = Array.isArray(installedApps) && installedApps.some(app => app.id === appId);

        if (!appExists) {
          this.updatingApps.delete(appId);
          return { 
            success: false, 
            message: `${appId} uygulaması yüklü değil ve güncellenemez` 
          };
        }

        // Önce güncellenebilir paketi kontrol et
        const result = await this.executeCommand('upgrade', [appId, '--source', 'winget']);

        // Başarılı çıktıyı kontrol et
        if (result.includes('successfully') || result.includes('başarıyla')) {
          console.log(`Successfully updated app: ${appId}`);
          this.updatingApps.delete(appId);
          return { 
            success: true, 
            message: `${appId} başarıyla güncellendi` 
          };
        } 

        // Zaten güncel olup olmadığını kontrol et 
        else if (result.includes('No applicable update found') || 
                result.includes('güncelleştirme bulunamadı') || 
                result.includes('is already installed') ||
                result.includes('zaten yüklü')) {
          console.log(`App is already up to date: ${appId}`);
          this.updatingApps.delete(appId);
          return { 
            success: true, 
            message: `${appId} zaten güncel` 
          };
        } 

        // Diğer başarı durumlarını kontrol et
        else if (!result.includes('failed') && !result.includes('error') && !result.includes('hata')) {
          console.log(`App updated with custom message: ${appId}`);
          this.updatingApps.delete(appId);
          return { 
            success: true, 
            message: `${appId} güncellendi: ${result.split('\n')[0]}` 
          };
        } 

        // Erişim reddedildi hatası kontrolü
        else if (result.includes('Access denied') || result.includes('access is denied') || 
                result.includes('Erişim reddedildi') || result.includes('yetkisiz')) {
          console.error(`Access denied error while updating app: ${appId}`, result);
          this.updatingApps.delete(appId);
          return { 
            success: false, 
            message: `${appId} güncellenemedi: Erişim reddedildi. Yönetici olarak çalıştırmayı deneyin.` 
          };
        }

        // Paket bulunamadı hatası kontrolü
        else if (result.includes('No package found') || result.includes('bulunamadı') || 
                result.includes('not found')) {
          console.error(`Package not found error while updating app: ${appId}`, result);
          this.updatingApps.delete(appId);
          return { 
            success: false, 
            message: `${appId} paketi kaynakta bulunamadı.` 
          };
        }

        // Hata durumu
        else {
          console.error(`Error updating app: ${appId}`, result);
          this.updatingApps.delete(appId);

          // Hata çıktısını daha detaylı işleyelim
          const errorLine = result.split('\n').find(line => 
            line.includes('failed') || 
            line.includes('error') || 
            line.includes('hata') || 
            line.includes('başarısız')
          );

          return { 
            success: false, 
            message: `${appId} güncellenemedi: ${errorLine || result.split('\n')[0]}` 
          };
        }
      } catch (error: any) {
        console.error(`Exception when updating app ${appId}:`, error);
        this.updatingApps.delete(appId);

        // Özel hata mesajları için kontrol
        let errorMessage = error.message || 'Bilinmeyen bir hata oluştu';

        if (errorMessage.includes('0x80070002') || errorMessage.includes('not found')) {
          errorMessage = 'Winget bulunamadı. Lütfen winget\'in yüklü olduğundan emin olun';
        } else if (errorMessage.includes('0x8007139f')) {
          errorMessage = 'Bu işlem için yönetici izinleri gerekli';
        } else if (errorMessage.includes('NetworkError') || errorMessage.includes('network')) {
          errorMessage = 'Ağ hatası: Lütfen internet bağlantınızı kontrol edin';
        }

        return { 
          success: false, 
          message: `Hata: ${errorMessage}` 
        };
      }
    } catch (error: any) {
      console.error('updateApp error:', error);
      return { 
        success: false, 
        message: `Hata: ${error.message || 'Bilinmeyen bir hata oluştu'}` 
      };
    }
  }

  /**
   * Seçili uygulamaları güncelleme
   * @param apps Güncellenecek uygulama listesi
   * @returns Güncelleme sonuçları
   */
  async update(apps: (AppInfo | string)[]): Promise<any[]> {
    try {
      if (!Array.isArray(apps) || apps.length === 0) {
        return [{
          id: 'batch',
          success: false,
          message: 'Güncellenecek uygulama listesi boş veya geçersiz'
        }];
      }

      const results = [];

      for (const app of apps) {
        const result = await this.updateApp(app);
        const appId = typeof app === 'string' ? app : app.id;
        results.push({
          id: appId || 'unknown',
          ...result
        });
      }

      return results;
    } catch (error: any) {
      console.error('Batch update error:', error);
      return [{
        id: 'batch',
        success: false,
        message: `Toplu güncelleme hatası: ${error.message || 'Bilinmeyen bir hata oluştu'}`
      }];
    }
  }

  /**
   * Winget ile uygulama yükleme
   * @param appId Uygulamanın ID'si
   * @returns İşlem sonucu
   */
  async installApp(appId: string): Promise<any> {
    try {
      if (!this.wingetAvailable) {
        await this.checkWingetAvailability();
        if (!this.wingetAvailable) {
          return { 
            success: false, 
            message: 'Winget yüklü değil veya erişilemiyor' 
          };
        }
      }

      console.log(`Installing app with ID: ${appId}`);

      // Uygulamanın şu anda zaten yükleniyor olup olmadığını kontrol et
      if (this.installingApps.has(appId)) {
        return { success: false, message: 'Bu uygulama zaten yükleniyor' };
      }

      // Yükleme işlemini takip et
      this.installingApps.add(appId);

      try {
        // Uygulamanın zaten yüklü olup olmadığını kontrol et
        const installedApps = await this.getInstalledApps();
        const alreadyInstalled = installedApps.some((app: AppInfo) => app.id === appId);

        if (alreadyInstalled) {
          this.installingApps.delete(appId);
          return { 
            success: false, 
            message: `${appId} uygulaması zaten yüklü` 
          };
        }

        // Yükleme komutunu çalıştır
        const result = await this.executeCommand('install', [appId, '--source', 'winget', '--accept-source-agreements', '--accept-package-agreements']);

        // Başarılı çıktıyı kontrol et
        if (result.includes('successfully') || result.includes('başarıyla')) {
          console.log(`Successfully installed app: ${appId}`);
          this.installingApps.delete(appId);
          return { 
            success: true, 
            message: `${appId} başarıyla yüklendi` 
          };
        } 

        // Zaten yüklü olup olmadığını kontrol et 
        else if (result.includes('is already installed') || result.includes('zaten yüklü')) {
          console.log(`App is already installed: ${appId}`);
          this.installingApps.delete(appId);
          return { 
            success: true, 
            message: `${appId} zaten yüklü` 
          };
        } 

        // Diğer başarı durumlarını kontrol et
        else if (!result.includes('failed') && !result.includes('error')) {
          console.log(`App installed with custom message: ${appId}`);
          this.installingApps.delete(appId);
          return { 
            success: true, 
            message: `${appId} yüklendi: ${result.split('\n')[0]}` 
          };
        } 

        // Hata durumu
        else {
          console.error(`Error installing app: ${appId}`, result);
          this.installingApps.delete(appId);
          return { 
            success: false, 
            message: `${appId} yüklenemedi: ${result.split('\n')[0]}` 
          };
        }
      } catch (error: any) {
        console.error(`Exception when installing app ${appId}:`, error);
        this.installingApps.delete(appId);
        return { 
          success: false, 
          message: `Hata: ${error.message || 'Bilinmeyen bir hata oluştu'}` 
        };
      }
    } catch (error: any) {
      console.error('installApp error:', error);
      return { 
        success: false, 
        message: `Hata: ${error.message || 'Bilinmeyen bir hata oluştu'}` 
      };
    }
  }

  /**
   * Winget ile uygulama kaldırma
   * @param appId Kaldırılacak uygulamanın ID'si
   * @returns İşlem sonucu
   */
  async uninstallApp(appId: string): Promise<any> {
    try {
      if (!this.wingetAvailable) {
        await this.checkWingetAvailability();
        if (!this.wingetAvailable) {
          return { 
            success: false, 
            message: 'Winget yüklü değil veya erişilemiyor' 
          };
        }
      }

      console.log(`Uninstalling app with ID: ${appId}`);

      // Uygulamanın zaten yüklü olup olmadığını kontrol et
      const installedApps = await this.getInstalledApps();
      const isInstalled = installedApps.some((app: AppInfo) => app.id === appId);

      if (!isInstalled) {
        return { 
          success: false, 
          message: `${appId} uygulaması yüklü değil` 
        };
      }

      // Kaldırma komutunu çalıştır
      // Remove the --silent flag to ensure the uninstall process is interactive and completes properly
      const result = await this.executeCommand('uninstall', [appId, '--accept-source-agreements']);

      // Başarılı çıktıyı kontrol et
      if (result.includes('successfully') || result.includes('başarıyla')) {
        console.log(`Successfully uninstalled app: ${appId}`);

        // Verify that the app was actually uninstalled by checking the installed apps list again
        const updatedInstalledApps = await this.getInstalledApps();
        const stillInstalled = updatedInstalledApps.some((app: AppInfo) => app.id === appId);

        if (stillInstalled) {
          console.error(`App ${appId} is still installed despite successful uninstall message`);
          return { 
            success: false, 
            message: `${appId} kaldırma işlemi başarısız oldu: Uygulama hala yüklü görünüyor` 
          };
        }

        return { 
          success: true, 
          message: `${appId} başarıyla kaldırıldı` 
        };
      } 

      // Diğer başarı durumlarını kontrol et
      else if (!result.includes('failed') && !result.includes('error')) {
        console.log(`App uninstalled with custom message: ${appId}`);

        // Verify that the app was actually uninstalled by checking the installed apps list again
        const updatedInstalledApps = await this.getInstalledApps();
        const stillInstalled = updatedInstalledApps.some((app: AppInfo) => app.id === appId);

        if (stillInstalled) {
          console.error(`App ${appId} is still installed despite successful uninstall message`);
          return { 
            success: false, 
            message: `${appId} kaldırma işlemi başarısız oldu: Uygulama hala yüklü görünüyor` 
          };
        }

        return { 
          success: true, 
          message: `${appId} kaldırıldı: ${result.split('\n')[0]}` 
        };
      } 

      // Hata durumu
      else {
        console.error(`Error uninstalling app: ${appId}`, result);
        return { 
          success: false, 
          message: `${appId} kaldırılamadı: ${result.split('\n')[0]}` 
        };
      }
    } catch (error: any) {
      console.error('uninstallApp error:', error);
      return { 
        success: false, 
        message: `Hata: ${error.message || 'Bilinmeyen bir hata oluştu'}` 
      };
    }
  }

  /**
   * Mock veri üreten yardımcı metod
   * @returns Örnek uygulama listesi
   */
  private generateMockData() {
    // Her çağrıda bazı uygulamaların güncelleme durumunu rastgele değiştir
    return this.mockApps.map(app => {
      // Her uygulama için rastgele bir ID oluştur
      const id = app.name.replace(/\s+/g, '.').toLowerCase();
      return {
        ...app,
        id,
        // Uygulamanın güncelleme durumunu korumak için burada değişiklik yapmıyoruz
      };
    });
  }

  private async executeCommand(command: string, args: string[] = []): Promise<string> {
    try {
      // Komutu sadece bir kez çalıştır, yeniden deneme yok
      try {
        const result = await new Promise<string>((resolve, reject) => {
          console.log(`Executing winget command: winget ${command} ${args.join(' ')}`);

          const childProcess = spawn('winget', [command, ...args], {
            shell: true
          });

          let stdout = '';
          let stderr = '';

          childProcess.stdout.on('data', data => {
            const chunk = data.toString();
            stdout += chunk;
            console.log(`[winget stdout]: ${chunk}`);
          });

          childProcess.stderr.on('data', data => {
            const chunk = data.toString();
            stderr += chunk;
            console.error(`[winget stderr]: ${chunk}`);
          });

          childProcess.on('close', code => {
            console.log(`Winget command exited with code ${code}`);

            // Standart hata çıktısında daha detaylı hata bilgisi olabilir
            if (code !== 0) {
              const errorMessage = stderr || `Winget komutu ${code} kodu ile başarısız oldu`;
              const errorDetail = {
                command: `winget ${command} ${args.join(' ')}`,
                exitCode: code,
                stdout: stdout,
                stderr: stderr
              };

              console.error('Winget command failed:', errorDetail);

              // Bilinen hata mesajlarını daha açık hale getir
              if (stderr.includes('0x80070002') || stderr.includes('not found')) {
                reject(new Error('Winget bulunamadı. Lütfen winget\'in yüklü olduğundan emin olun'));
              } else if (stderr.includes('0x8007139f')) {
                reject(new Error('Bu işlem için yönetici izinleri gerekli olabilir'));
              } else if (stderr.includes('NetworkError') || stderr.includes('network')) {
                reject(new Error('Ağ hatası: Lütfen internet bağlantınızı kontrol edin'));
              } else if (stderr.includes('Failed to update package')) {
                reject(new Error('Paket güncellenirken hata oluştu: Güncelleme engellenmiş veya paket kilitli olabilir'));
              } else if (stderr.includes('Access denied') || stderr.includes('access is denied')) {
                reject(new Error('Erişim reddedildi: Bu işlem için yönetici izinleri gerekli olabilir'));
              } else if (stderr.includes('Package not found')) {
                reject(new Error('Paket bulunamadı: Belirtilen paket mevcut değil veya kaynak kullanılamıyor'));
              } else {
                reject(new Error(errorMessage));
              }
            } else {
              // Komut başarılı olsa da, çıktı boşsa veya hata içeriyorsa kontrol et
              if (!stdout.trim()) {
                console.warn('Winget command returned empty output');
                resolve('Komut başarıyla çalıştı fakat çıktı üretmedi');
              } else if (stdout.includes('failed') || stdout.includes('error')) {
                console.warn('Winget command output contains error indicators:', stdout);
                // Başarılı çıkış kodu, ancak çıktı hata içerebilir - bunu kullanıcıya bildir
                resolve(stdout);
              } else {
                resolve(stdout);
              }
            }
          });

          childProcess.on('error', err => {
            console.error('Winget process error:', err);
            reject(new Error(`Winget komutu çalıştırılamadı: ${err.message}`));
          });

          // Zaman aşımı ekle
          const timeout = setTimeout(() => {
            childProcess.kill();
            console.error('Winget command timed out after 30 seconds');
            reject(new Error('Winget komutu zaman aşımına uğradı. İşlem iptal edildi.'));
          }, 30000); // 30 saniye zaman aşımı

          // Çocuk süreç kapandığında zamanlayıcıyı temizle
          childProcess.on('close', () => clearTimeout(timeout));
        });

        return result;
      } catch (error: any) {
        // Hata durumunda daha açık bir mesaj döndür
        console.error(`Winget command failed: ${error.message}`);
        throw error;
      }
    } catch (error: any) {
      console.error('Winget executeCommand error:', error);
      throw error;
    }
  }

  private parseInstalledAppsList(result: string): any[] {
    try {
      // Çıktının yapısını incele
      console.log('Parsing winget list output:', result.slice(0, 200) + '...');

      // Çıktı satırlara bölünür
      const lines = result.split('\n');

      // Winget versiyonuna göre başlık satır sayısı değişebilir, bu yüzden veri satırlarını belirle
      let startIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Name') && lines[i].includes('Id') && lines[i].includes('Version')) {
          startIndex = i + 2; // Başlık ve ayırıcı satırdan sonraki satırdan başla
          break;
        }
      }

      if (startIndex === 0) {
        console.warn('Winget output header not found, using default parsing logic');
        startIndex = 2; // Başlık bulunamadıysa varsayılan olarak 3. satırdan başla
      }

      const dataLines = lines.slice(startIndex);

      const apps = dataLines
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          try {
            // Çıktı formatı: Ad  ID  Sürüm  Kullanılabilir [Kaynak]
            const parts = line.split(/\s{2,}/);

            // Eksik alan kontrolü ekle
            if (parts.length < 3) {
              console.warn('Invalid winget output line format:', line);
              return null; // Geçersiz satırları filtrele
            }

            return {
              name: parts[0] || 'Unknown App',
              id: parts[1] || '',
              version: parts[2] || '',
              newVersion: parts[3] || "",
            };
          } catch (lineError) {
            console.warn('Error parsing winget output line:', line, lineError);
            return null;
          }
        })
        .filter(app => app !== null); // null değerleri filtrele

      console.log(`Successfully parsed ${apps.length} applications`);
      return apps;
    } catch (parseError) {
      console.error('Error parsing winget output:', parseError);
      console.log('Returning mock data due to parsing error');
      return this.generateMockData();
    }
  }

  private parseSearchResults(result: string): any[] {
    try {
      console.log('Parsing winget search output:', result.slice(0, 200) + '...');

      // Çıktı satırlara bölünür
      const lines = result.split('\n');

      // Winget versiyonuna göre başlık satır sayısı değişebilir, bu yüzden veri satırlarını belirle
      let startIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Name') && lines[i].includes('Id') && lines[i].includes('Version')) {
          startIndex = i + 2; // Başlık ve ayırıcı satırdan sonraki satırdan başla
          break;
        }
      }

      if (startIndex === 0) {
        console.warn('Winget search output header not found, using default parsing logic');
        startIndex = 2; // Başlık bulunamadıysa varsayılan olarak 3. satırdan başla
      }

      const dataLines = lines.slice(startIndex);

      const apps = dataLines
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          try {
            // Çıktı formatı: Ad  ID  Sürüm [Kaynak]
            const parts = line.split(/\s{2,}/);

            if (parts.length < 2) {
              console.warn('Invalid winget search output line format:', line);
              return null;
            }

            return {
              name: parts[0] || 'Unknown App',
              id: parts[1] || '',
              version: parts[2] || '',
              installed: false // Varsayılan olarak yüklü değil
            };
          } catch (lineError) {
            console.warn('Error parsing winget search output line:', line, lineError);
            return null;
          }
        })
        .filter(app => app !== null);

      console.log(`Successfully parsed ${apps.length} search results`);
      return apps;
    } catch (parseError) {
      console.error('Error parsing winget search output:', parseError);
      console.log('Returning mock data due to parsing error');
      return this.mockApps
        .filter(app => app.name.toLowerCase().includes(''))
        .map(app => ({ 
          ...app, 
          id: app.name.replace(/\s+/g, '.').toLowerCase(),
          installed: false 
        }));
    }
  }
} 
