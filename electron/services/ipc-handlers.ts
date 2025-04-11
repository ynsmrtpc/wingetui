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
    ipcMain.handle('getAppList', async () => {
      return await this.wingetService.getInstalledApps()
    })
    
    ipcMain.handle('searchApps', async (_, keyword: string) => {
      return await this.wingetService.searchApps(keyword)
    })
    
    ipcMain.handle('updateApp', async (_, appId: string) => {
      return await this.wingetService.updateApp(appId)
    })
  }
} 