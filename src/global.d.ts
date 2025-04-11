export {}

declare global {
    interface Window {
        api: {
            getAppList: () => Promise<{ name: string; version: string }[]>
        }
        ipcRenderer: {
            invoke: (channel: string, ...args: any[]) => Promise<any>
            on: (channel: string, func: (...args: any[]) => void) => void
        }
    }
}

export interface SystemInfoTypes {
    cpu: string
    cpuSpeed?: string
    cpuCores?: number
    cpuThreads?: number
    ram: string
    freeRam?: string
    os: string
    version: string
    networkName?: string
    batteryLevel?: number
    screenResolution?: string
    uptime?: string
    diskSpace?: string
    diskFree?: string
}
