import { ipcMain } from 'electron'
import { SystemInfoService } from './system-info'
import { WingetService } from './winget'

/**
 * IPC mesaj işleyicilerini kaydeden servis
 */
export class IpcHandlerService {
  private systemInfoService: SystemInfoService
  private wingetService: WingetService
  
  constructor() {
    this.systemInfoService = new SystemInfoService()
    this.wingetService = new WingetService()
  }
  
  /**
   * Tüm IPC işleyicilerini kaydeder
   */
  registerHandlers() {
    this.registerSystemInfoHandlers()
    this.registerWingetHandlers()
  }
  
  /**
   * Sistem bilgileriyle ilgili IPC işleyicilerini kaydeder
   */
  private registerSystemInfoHandlers() {
    ipcMain.handle('getSystemInfo', async () => {
      return await this.systemInfoService.getAllSystemInfo()
    })
  }
  
  /**
   * Winget ile ilgili IPC işleyicilerini kaydeder
   */
  private registerWingetHandlers() {
    ipcMain.handle('get-installed-apps', async () => {
      try {
        const installedApps = await this.wingetService.getInstalledApps();
        return installedApps;
      } catch (error: any) {
        console.error('IPC handler get-installed-apps error:', error);
        return { error: error.message || 'Uygulama listesi alınırken bir hata oluştu' };
      }
    });

    ipcMain.handle('search-apps', async (_event, keyword) => {
      try {
        const searchResults = await this.wingetService.searchApps(keyword);
        return searchResults;
      } catch (error: any) {
        console.error('IPC handler search-apps error:', error);
        return { error: error.message || 'Uygulama araması yapılırken bir hata oluştu' };
      }
    });

    ipcMain.handle('update-app', async (_event, appId) => {
      try {
        const result = await this.wingetService.updateApp(appId);
        return { success: true, message: result };
      } catch (error: any) {
        console.error('IPC handler update-app error:', error);
        return { 
          success: false, 
          message: error.message || 'Uygulama güncellenirken bir hata oluştu',
          details: error.stack
        };
      }
    });

    ipcMain.handle('install-app', async (_event, appId) => {
      try {
        const result = await this.wingetService.installApp(appId);
        return { success: true, message: result };
      } catch (error: any) {
        console.error('IPC handler install-app error:', error);
        return { 
          success: false, 
          message: error.message || 'Uygulama yüklenirken bir hata oluştu',
          details: error.stack
        };
      }
    });
  }
} 