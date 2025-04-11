import os from 'os'
import { screen } from 'electron'
import si from 'systeminformation'
import nodeDiskInfo from 'node-disk-info'

/**
 * Sistem bilgilerine erişim için servis
 */
export class SystemInfoService {
  /**
   * İşlemci bilgilerini döndürür
   * @returns İşlemci bilgileri
   */
  async getCpuInfo() {
    const cpuInfo = os.cpus()[0]
    const cpuCores = os.cpus().length
    const cpuThreads = os.cpus().length
    
    return {
      model: cpuInfo.model,
      speed: `${cpuInfo.speed / 1000} GHz`,
      cores: cpuCores,
      threads: cpuThreads
    }
  }
  
  /**
   * Bellek bilgilerini döndürür
   * @returns Bellek bilgileri
   */
  getMemoryInfo() {
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    
    return {
      total: `${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
      free: `${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
    }
  }
  
  /**
   * Disk bilgilerini döndürür
   * @returns Disk bilgileri
   */
  async getDiskInfo() {
    let diskSpace = "Bilinmiyor"
    let diskFree = "Bilinmiyor"
    
    try {
      const disks = nodeDiskInfo.getDiskInfoSync()
      const systemDisk = disks.find(disk => disk.mounted === 'C:') || disks[0]
      
      if (systemDisk) {
        diskSpace = `${Math.floor(systemDisk.blocks / (1024 * 1024 * 1024))} GB`
        diskFree = `${Math.floor(systemDisk.available / (1024 * 1024 * 1024))} GB`
      }
    } catch (error) {
      console.error('Disk bilgileri alınamadı:', error)
    }
    
    return {
      total: diskSpace,
      free: diskFree
    }
  }
  
  /**
   * İşletim sistemi bilgilerini döndürür
   * @returns İşletim sistemi bilgileri
   */
  getOsInfo() {
    return {
      os: `${os.type()} ${os.arch()}`,
      version: os.release(),
      networkName: os.networkInterfaces().Ethernet ? "Ethernet" : "Wi-Fi",
    }
  }
  
  /**
   * Ekran çözünürlüğünü döndürür
   * @returns Ekran çözünürlüğü
   */
  getScreenResolution() {
    let screenResolution = "Bilinmiyor"
    
    try {
      const primaryDisplay = screen.getPrimaryDisplay()
      const { width, height } = primaryDisplay.size
      screenResolution = `${width}x${height}`
    } catch (error) {
      console.error('Ekran çözünürlüğü alınamadı:', error)
    }
    
    return screenResolution
  }
  
  /**
   * Batarya seviyesini döndürür
   * @returns Batarya seviyesi
   */
  async getBatteryLevel() {
    let batteryLevel = 0
    
    try {
      const batteryInfo = await si.battery()
      batteryLevel = batteryInfo.percent
    } catch (error) {
      console.error('Batarya bilgisi alınamadı:', error)
    }
    
    return batteryLevel
  }
  
  /**
   * Sistemin çalışma süresini döndürür
   * @returns Çalışma süresi
   */
  getUptime() {
    const uptime = os.uptime()
    const uptimeHours = Math.floor(uptime / 3600)
    const uptimeMinutes = Math.floor((uptime % 3600) / 60)
    
    return `${uptimeHours} saat ${uptimeMinutes} dakika`
  }
  
  /**
   * Tüm sistem bilgilerini döndürür
   * @returns Tüm sistem bilgileri
   */
  async getAllSystemInfo() {
    const cpuInfo = await this.getCpuInfo()
    const memoryInfo = this.getMemoryInfo()
    const diskInfo = await this.getDiskInfo()
    const osInfo = this.getOsInfo()
    const screenResolution = this.getScreenResolution()
    const batteryLevel = await this.getBatteryLevel()
    const uptime = this.getUptime()
    
    return {
      cpu: cpuInfo.model,
      cpuSpeed: cpuInfo.speed,
      cpuCores: cpuInfo.cores,
      cpuThreads: cpuInfo.threads,
      ram: memoryInfo.total,
      freeRam: memoryInfo.free,
      os: osInfo.os,
      version: osInfo.version,
      networkName: osInfo.networkName,
      batteryLevel: batteryLevel,
      screenResolution: screenResolution,
      uptime: uptime,
      diskSpace: diskInfo.total,
      diskFree: diskInfo.free
    }
  }
} 