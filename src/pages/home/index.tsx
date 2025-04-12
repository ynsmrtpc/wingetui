import { useEffect, useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    CogIcon,
    Laptop,
    MemoryStick,
    Microchip,
    Clock,
    HardDrive,
    Cpu,
    Network,
    Battery,
    Monitor,
    Activity
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemInfoTypes } from "@/global"
import { useTranslation } from "react-i18next";

// Data çekmek için fonksiyon
async function getData(): Promise<SystemInfoTypes> {
    return await window.ipcRenderer.invoke('getSystemInfo')
}

const Home = () => {
    const { t } = useTranslation();
    const [systemInfo, setSystemInfo] = useState<SystemInfoTypes>({
        cpu: "",
        ram: "",
        os: "",
        version: "",
        cpuSpeed: "3.2 GHz",
        cpuCores: 8,
        cpuThreads: 16,
        diskSpace: "512 GB",
        diskFree: "320 GB",
        networkName: "Wi-Fi",
        batteryLevel: 0,
        screenResolution: "1920x1080",
        uptime: "5 saat 32 dakika"
    })

    const getDataFromData = async () => {
        const result = await getData();
        setSystemInfo({ ...systemInfo, ...result });
    }

    useEffect(() => {
        getDataFromData();
    }, []);

    return (
        <div className="space-y-6">
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="overview">{t('home.overview')}</TabsTrigger>
                    <TabsTrigger value="hardware">{t('home.hardware')}</TabsTrigger>
                    <TabsTrigger value="system">{t('home.system')}</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Laptop className="h-6 w-6 text-blue-500" />
                            {t('home.computerSpecs')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg shadow-sm">
                            <Microchip className="h-8 w-8 text-blue-500 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('home.processor')}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{systemInfo.cpu}</p>
                                <p className="text-sm text-slate-500">{systemInfo.cpuCores} {t('home.cores')} / {systemInfo.cpuThreads} {t('home.threads')}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg shadow-sm">
                            <MemoryStick className="h-8 w-8 text-green-500 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('home.memory')}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{systemInfo.ram}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg shadow-sm">
                            <HardDrive className="h-8 w-8 text-amber-500 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('home.storage')}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{t('home.total')}: {systemInfo.diskSpace}</p>
                                <p className="text-sm text-slate-500">{t('home.freeSpace')}: {systemInfo.diskFree}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg shadow-sm">
                            <Activity className="h-8 w-8 text-red-500 mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('home.systemStatus')}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{t('home.uptime')}: {systemInfo.uptime}</p>
                                <p className="text-sm text-slate-500">{t('home.battery')}: {systemInfo.batteryLevel}%</p>
                            </div>
                        </div>
                    </CardContent>
                </TabsContent>

                <TabsContent value="hardware">
                    <CardHeader className="bg-gradient-to-r from-amber-500/10 to-red-500/10">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Cpu className="h-6 w-6 text-amber-500" />
                            {t('home.hardwareDetails')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Microchip className="h-5 w-5 text-blue-500" />
                                    {t('home.processor')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">{t('home.model')}:</span> {systemInfo.cpu}</p>
                                    <p><span className="font-medium">{t('home.speed')}:</span> {systemInfo.cpuSpeed}</p>
                                    <p><span className="font-medium">{t('home.cores')}:</span> {systemInfo.cpuCores}</p>
                                    <p><span className="font-medium">{t('home.threads')}:</span> {systemInfo.cpuThreads}</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <MemoryStick className="h-5 w-5 text-green-500" />
                                    {t('home.memory')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">{t('home.totalRAM')}:</span> {systemInfo.ram}</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <HardDrive className="h-5 w-5 text-amber-500" />
                                    {t('home.storage')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">{t('home.totalSpace')}:</span> {systemInfo.diskSpace}</p>
                                    <p><span className="font-medium">{t('home.freeSpace')}:</span> {systemInfo.diskFree}</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Monitor className="h-5 w-5 text-purple-500" />
                                    {t('home.display')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">{t('home.resolution')}:</span> {systemInfo.screenResolution}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </TabsContent>

                <TabsContent value="system">
                    <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <CogIcon className="h-6 w-6 text-green-500" />
                            {t('home.systemInfo')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Laptop className="h-5 w-5 text-blue-500" />
                                    {t('home.operatingSystem')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">OS:</span> {systemInfo.os}</p>
                                    <p><span className="font-medium">{t('home.version')}:</span> {systemInfo.version}</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Network className="h-5 w-5 text-indigo-500" />
                                    {t('home.network')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">{t('home.connection')}:</span> {systemInfo.networkName}</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Battery className="h-5 w-5 text-green-500" />
                                    {t('home.power')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">{t('home.battery')}:</span> {systemInfo.batteryLevel}%</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-red-500" />
                                    {t('home.uptime')}
                                </h3>
                                <div className="mt-2 pl-7 space-y-1">
                                    <p><span className="font-medium">Uptime:</span> {systemInfo.uptime}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Home;
