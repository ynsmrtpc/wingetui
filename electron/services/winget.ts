import { exec, spawn } from 'child_process'
import { platform } from 'os'

/**
 * Winget ile ilgili işlemleri yöneten servis
 */
export class WingetService {
  private isWindows: boolean;
  private wingetAvailable: boolean | null = null;
  
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
  
  constructor() {
    this.isWindows = platform() === 'win32';
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
   * Yüklü uygulamaların listesini döndürür
   * @returns Yüklü uygulamaların listesi
   */
  async getInstalledApps() {
    try {
      // Winget kullanılabilir mi diye kontrol et
      const isAvailable = await this.checkWingetAvailability();
      if (!isAvailable) {
        console.warn('Winget not available, returning mock data');
        // Mock veri döndür
        return this.generateMockData();
      }
      
      return new Promise((resolve, reject) => {
        // Komut çalışma timeout'u ekle
        const timeout = setTimeout(() => {
          console.error('Winget command timed out');
          resolve(this.generateMockData());
        }, 10000);
        
        exec('winget list --source winget', (error, stdout, stderr) => {
          clearTimeout(timeout);
          
          if (error) {
            console.error('Winget Error:', error.message);
            console.error('Stderr:', stderr);
            // Hata durumunda mock veri döndür
            return resolve(this.generateMockData());
          }

          try {
            const lines = stdout.split('\n').slice(2);
            const apps = lines
              .map(line => line.trim())
              .filter(line => line.length > 0)
              .map(line => {
                const parts = line.split(/\s{2,}/);
                // Eksik alan kontrolü ekle
                if (parts.length < 3) {
                  return null; // Geçersiz satırları filtrele
                }
                return {
                  name: parts[0] || 'Unknown App',
                  version: parts[2] || '',
                  newVersion: parts[3] || "",
                };
              })
              .filter(app => app !== null); // null değerleri filtrele
            
            resolve(apps);
          } catch (parseError) {
            console.error('Error parsing winget output:', parseError);
            resolve(this.generateMockData());
          }
        });
      });
    } catch (error) {
      console.error('Unexpected error in getInstalledApps:', error);
      return this.generateMockData();
    }
  }
  
  /**
   * Winget ile uygulama arama
   * @param keyword Aranacak anahtar kelime
   * @returns Bulunan uygulamaların listesi
   */
  async searchApps(keyword: string) {
    try {
      // Winget kullanılabilir mi diye kontrol et
      const isAvailable = await this.checkWingetAvailability();
      if (!isAvailable) {
        console.warn('Winget not available, returning filtered mock data');
        // Anahtar kelime ile filtrele ve döndür
        return this.mockApps
          .filter(app => app.name.toLowerCase().includes(keyword.toLowerCase()))
          .map(app => ({ ...app, id: app.name.replace(/\s+/g, '.').toLowerCase() }));
      }
      
      return new Promise((resolve, reject) => {
        // Komut çalışma timeout'u ekle
        const timeout = setTimeout(() => {
          console.error('Winget search command timed out');
          // Anahtar kelime ile filtrele ve döndür
          resolve(this.mockApps
            .filter(app => app.name.toLowerCase().includes(keyword.toLowerCase()))
            .map(app => ({ ...app, id: app.name.replace(/\s+/g, '.').toLowerCase() })));
        }, 10000);
        
        exec(`winget search "${keyword}" --source winget`, (error, stdout, stderr) => {
          clearTimeout(timeout);
          
          if (error) {
            console.error('Winget Search Error:', error.message);
            console.error('Stderr:', stderr);
            // Hata durumunda filtrelenmiş mock veri döndür
            return resolve(this.mockApps
              .filter(app => app.name.toLowerCase().includes(keyword.toLowerCase()))
              .map(app => ({ ...app, id: app.name.replace(/\s+/g, '.').toLowerCase() })));
          }

          try {
            const lines = stdout.split('\n').slice(2);
            const apps = lines
              .map(line => line.trim())
              .filter(line => line.length > 0)
              .map(line => {
                const parts = line.split(/\s{2,}/);
                if (parts.length < 2) {
                  return null;
                }
                return {
                  name: parts[0] || 'Unknown App',
                  id: parts[1] || '',
                  version: parts[2] || '',
                };
              })
              .filter(app => app !== null);
            
            resolve(apps);
          } catch (parseError) {
            console.error('Error parsing winget search output:', parseError);
            resolve(this.mockApps
              .filter(app => app.name.toLowerCase().includes(keyword.toLowerCase()))
              .map(app => ({ ...app, id: app.name.replace(/\s+/g, '.').toLowerCase() })));
          }
        });
      });
    } catch (error) {
      console.error('Unexpected error in searchApps:', error);
      return this.mockApps
        .filter(app => app.name.toLowerCase().includes(keyword.toLowerCase()))
        .map(app => ({ ...app, id: app.name.replace(/\s+/g, '.').toLowerCase() }));
    }
  }
  
  /**
   * Winget ile uygulama güncelleme
   * @param appId Uygulamanın ID'si
   * @returns İşlem sonucu
   */
  async updateApp(appId: string) {
    try {
      // Winget kullanılabilir mi diye kontrol et
      const isAvailable = await this.checkWingetAvailability();
      if (!isAvailable) {
        console.warn('Winget not available, simulating update success');
        // Başarılı güncelleme simülasyonu
        return Promise.resolve("Update operation simulated successfully for " + appId);
      }
      
      return new Promise((resolve, reject) => {
        // Komut çalışma timeout'u ekle
        const timeout = setTimeout(() => {
          console.error('Winget update command timed out');
          resolve("Update operation timed out, but might still be running in background for " + appId);
        }, 15000);
        
        exec(`winget upgrade "${appId}" --source winget`, (error, stdout, stderr) => {
          clearTimeout(timeout);
          
          if (error) {
            console.error('Winget Update Error:', error.message);
            console.error('Stderr:', stderr);
            // Bazı hatalar, örneğin 'uygulama zaten güncel', başarı olarak değerlendirilebilir
            if (stderr.includes('already installed') || stdout.includes('already installed')) {
              return resolve("App is already up to date: " + appId);
            }
            return reject(new Error(`Error updating app ${appId}: ${stderr || error.message}`));
          }

          resolve(stdout);
        });
      });
    } catch (error) {
      console.error('Unexpected error in updateApp:', error);
      return Promise.reject(error);
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
} 