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
   * CPU kullanım yüzdesini döndürür
   * @returns CPU kullanım yüzdesi
   */
  async getCpuUsage() {
    try {
      const cpuLoad = await si.currentLoad()
      return Math.round(cpuLoad.currentLoad)
    } catch (error) {
      console.error('CPU kullanım bilgisi alınamadı:', error)
      return 0
    }
  }

  /**
   * GPU bilgilerini döndürür
   * @returns GPU bilgileri
   */
  async getGpuInfo() {
    try {
      const gpuInfo = await si.graphics()
      if (gpuInfo.controllers && gpuInfo.controllers.length > 0) {
        const mainGpu = gpuInfo.controllers[0]
        return {
          name: mainGpu.model,
          vram: mainGpu.vram ? `${Math.round(mainGpu.vram / 1024)} GB` : 'Bilinmiyor',
          usage: mainGpu.utilizationGpu || 0
        }
      }
      return {
        name: 'Bilinmiyor',
        vram: 'Bilinmiyor',
        usage: 0
      }
    } catch (error) {
      console.error('GPU bilgisi alınamadı:', error)
      return {
        name: 'Bilinmiyor',
        vram: 'Bilinmiyor',
        usage: 0
      }
    }
  }

  /**
   * Bellek kullanım yüzdesini döndürür
   * @returns Bellek kullanım yüzdesi
   */
  getMemoryUsage() {
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const usedMem = totalMem - freeMem
    const memoryUsage = Math.round((usedMem / totalMem) * 100)

    return memoryUsage
  }

  /**
   * Ağ kullanım bilgilerini döndürür
   * @returns Ağ kullanım bilgileri
   */
  async getNetworkUsage() {
    try {
      const networkStats = await si.networkStats()
      if (networkStats && networkStats.length > 0) {
        const mainNetwork = networkStats.find(net => net.operstate === 'up') || networkStats[0]
        return {
          interface: mainNetwork.iface,
          download: Math.round(mainNetwork.rx_sec / 1024), // KB/s
          upload: Math.round(mainNetwork.tx_sec / 1024), // KB/s
          usage: Math.round(((mainNetwork.rx_sec + mainNetwork.tx_sec) / (10 * 1024 * 1024)) * 100) // % of 10 Mbps
        }
      }
      return {
        interface: 'Bilinmiyor',
        download: 0,
        upload: 0,
        usage: 0
      }
    } catch (error) {
      console.error('Ağ kullanım bilgisi alınamadı:', error)
      return {
        interface: 'Bilinmiyor',
        download: 0,
        upload: 0,
        usage: 0
      }
    }
  }

  /**
   * Performans puanını hesaplar
   * @param cpuUsage CPU kullanım yüzdesi
   * @param memoryUsage Bellek kullanım yüzdesi
   * @param gpuUsage GPU kullanım yüzdesi
   * @param networkUsage Ağ kullanım yüzdesi
   * @returns 10 üzerinden performans puanı
   */
  calculatePerformanceScore(cpuUsage: number, memoryUsage: number, gpuUsage: number, networkUsage: number) {
    // Düşük kullanım = yüksek puan
    const cpuScore = 10 - (cpuUsage / 10)
    const memoryScore = 10 - (memoryUsage / 10)
    const gpuScore = 10 - (gpuUsage / 10)
    const networkScore = 10 - (networkUsage / 10)

    // Ağırlıklı ortalama
    const weightedScore = (cpuScore * 0.4) + (memoryScore * 0.3) + (gpuScore * 0.2) + (networkScore * 0.1)

    return Math.round(weightedScore * 10) / 10 // 1 ondalık basamak
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

    // Yeni metrikler
    const cpuUsage = await this.getCpuUsage()
    const gpuInfo = await this.getGpuInfo()
    const memoryUsage = this.getMemoryUsage()
    const networkInfo = await this.getNetworkUsage()

    // Performans puanı
    const performanceScore = this.calculatePerformanceScore(
      cpuUsage, 
      memoryUsage, 
      gpuInfo.usage, 
      networkInfo.usage
    )

    return {
      cpu: cpuInfo.model,
      cpuSpeed: cpuInfo.speed,
      cpuCores: cpuInfo.cores,
      cpuThreads: cpuInfo.threads,
      cpuUsage: cpuUsage,
      ram: memoryInfo.total,
      freeRam: memoryInfo.free,
      memoryUsage: memoryUsage,
      gpu: gpuInfo.name,
      gpuVram: gpuInfo.vram,
      gpuUsage: gpuInfo.usage,
      networkInterface: networkInfo.interface,
      networkDownload: networkInfo.download,
      networkUpload: networkInfo.upload,
      networkUsage: networkInfo.usage,
      os: osInfo.os,
      version: osInfo.version,
      networkName: osInfo.networkName,
      batteryLevel: batteryLevel,
      screenResolution: screenResolution,
      uptime: uptime,
      diskSpace: diskInfo.total,
      diskFree: diskInfo.free,
      performanceScore: performanceScore
    }
  }
} 
