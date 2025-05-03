import { ipcMain } from 'electron'
import { SystemInfoService } from './system-info'
import { WingetService } from './winget'
import { app } from 'electron';

/**
 * IPC mesaj işleyicilerini kaydeden servis
 */
export class IpcHandlerService {
  private systemInfoService: SystemInfoService
  private wingetService: WingetService

  constructor() {
    this.systemInfoService = new SystemInfoService()
    this.wingetService = new WingetService(app);
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
      try {
        const systemInfo = await this.systemInfoService.getAllSystemInfo()

        // Get total app count
        try {
          const installedApps = await this.wingetService.getInstalledApps()
          if (Array.isArray(installedApps)) {
            systemInfo.totalApps = installedApps.length
          }
        } catch (error) {
          console.error('Error getting installed apps count:', error)
          systemInfo.totalApps = 0
        }

        return systemInfo
      } catch (error) {
        console.error('Error getting system info:', error)
        return {
          cpu: 'Error getting system info',
          ram: 'Unknown',
          os: 'Unknown',
          version: 'Unknown',
          totalApps: 0
        }
      }
    })
  }

  /**
   * Winget ile ilgili IPC işleyicilerini kaydeder
   */
  private registerWingetHandlers() {
    ipcMain.handle('get-installed-apps', async () => {
      try {
        const result = await this.wingetService.getInstalledApps();
        // Check if result is an error object
        if (result && typeof result === 'object' && 'error' in result) {
          return result; // Return the error object as is
        }
        // Check if result is an array (expected format for app list)
        if (Array.isArray(result)) {
          return result; // Return the array as is
        }
        // For unexpected formats, return an error
        console.error('Unexpected result format from getInstalledApps:', result);
        return { error: 'Unexpected result format from getInstalledApps' };
      } catch (error: any) {
        console.error('IPC handler get-installed-apps error:', error);
        return { error: error.message || 'Uygulama listesi alınırken bir hata oluştu' };
      }
    });

    ipcMain.handle('search-apps', async (_event, keyword) => {
      try {
        const result = await this.wingetService.searchApps(keyword);
        // Check if result is an error object
        if (result && typeof result === 'object' && 'error' in result) {
          return result; // Return the error object as is
        }
        // Check if result is an array (expected format for search results)
        if (Array.isArray(result)) {
          return result; // Return the array as is
        }
        // For unexpected formats, return an error
        console.error('Unexpected result format from searchApps:', result);
        return { error: 'Unexpected result format from searchApps' };
      } catch (error: any) {
        console.error('IPC handler search-apps error:', error);
        return { error: error.message || 'Uygulama araması yapılırken bir hata oluştu' };
      }
    });

    ipcMain.handle('update-app', async (_event, appId) => {
      try {
        const result = await this.wingetService.updateApp(appId);
        // Check if result is already in the expected format
        if (result && typeof result === 'object' && 'success' in result) {
          return result; // Return the result object as is
        } else {
          // For backward compatibility, wrap the result in a success object
          return { success: true, message: result };
        }
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
        // Check if result is already in the expected format
        if (result && typeof result === 'object' && 'success' in result) {
          return result; // Return the result object as is
        } else {
          // For backward compatibility, wrap the result in a success object
          return { success: true, message: result };
        }
      } catch (error: any) {
        console.error('IPC handler install-app error:', error);
        return { 
          success: false, 
          message: error.message || 'Uygulama yüklenirken bir hata oluştu',
          details: error.stack
        };
      }
    });

    ipcMain.handle('uninstall-app', async (_event, appId) => {
      try {
        const result = await this.wingetService.uninstallApp(appId);
        // Check if result is already in the expected format
        if (result && typeof result === 'object' && 'success' in result) {
          return result; // Return the result object as is
        } else {
          // For backward compatibility, wrap the result in a success object
          return { success: true, message: result };
        }
      } catch (error: any) {
        console.error('IPC handler uninstall-app error:', error);
        return { 
          success: false, 
          message: error.message || 'Uygulama kaldırılırken bir hata oluştu',
          details: error.stack
        };
      }
    });

    ipcMain.handle('install-winget', async () => {
      try {
        const result = await this.wingetService.installWinget();
        return result;
      } catch (error: any) {
        console.error('IPC handler install-winget error:', error);
        return { 
          success: false, 
          message: error.message || 'Winget yüklenirken bir hata oluştu',
          details: error.stack
        };
      }
    });
  }
}
