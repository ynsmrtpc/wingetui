import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    MemoryStick,
    Microchip,
    HardDrive,
    Cpu,
    Network,
    LayoutGrid,
    GaugeCircle,
    BarChart3,
} from "lucide-react";
import { SystemInfoTypes } from "@/global"
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import HomeSkeletonLoader from "@/components/skeletons/HomeSkeletonLoader";

// Data çekmek için fonksiyon
async function getData(): Promise<SystemInfoTypes> {
    return await window.ipcRenderer.invoke('getSystemInfo')
}

const Home = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(true);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const [systemInfo, setSystemInfo] = useState<SystemInfoTypes>({
        cpu: "",
        ram: "",
        os: "",
        version: "",
        cpuSpeed: "3.2 GHz",
        cpuCores: 8,
        cpuThreads: 16,
        cpuUsage: 0,
        memoryUsage: 0,
        gpu: "Unknown GPU",
        gpuUsage: 0,
        networkUsage: 0,
        diskSpace: "512 GB",
        diskFree: "320 GB",
        networkName: "Wi-Fi",
        batteryLevel: 0,
        screenResolution: "1920x1080",
        uptime: "5 saat 32 dakika",
        performanceScore: 0,
        totalApps: 0
    })

    const getDataFromData = async () => {
        // Only set loading to true if it's the initial load
        if (initialLoad) {
            setLoading(true);
        }
        try {
            const result = await getData();
            setSystemInfo({ ...systemInfo, ...result });
        } finally {
            setLoading(false);
            if (initialLoad) {
                setInitialLoad(false);
            }
        }
    }

    useEffect(() => {
        getDataFromData();

        // Refresh data every 5 seconds for real-time metrics
        const interval = setInterval(() => {
            getDataFromData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Helper function to determine color based on usage percentage
    const getUsageColor = (usage: number) => {
        if (usage < 30) return "text-green-500";
        if (usage < 70) return "text-amber-500";
        return "text-red-500";
    };

    // Helper function to determine progress color based on usage percentage
    const getProgressColor = (usage: number) => {
        if (usage < 30) return "bg-green-500";
        if (usage < 70) return "bg-amber-500";
        return "bg-red-500";
    };

    // Helper function to determine performance score color
    const getScoreColor = (score: number) => {
        if (score >= 7) return "text-green-500";
        if (score >= 4) return "text-amber-500";
        return "text-red-500";
    };

    if (loading && initialLoad) {
        return <HomeSkeletonLoader />;
    }

    return (
        <div className="space-y-6">

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <GaugeCircle className="h-10 w-10 mb-2 text-blue-500" />
                        <h3 className="text-lg font-semibold text-center">{t('home.performanceScore')}</h3>
                        <p className={`text-3xl font-bold ${getScoreColor(systemInfo.performanceScore || 0)}`}>
                            {systemInfo.performanceScore || 0}/10
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <LayoutGrid className="h-10 w-10 mb-2 text-purple-500" />
                        <h3 className="text-lg font-semibold text-center">{t('home.totalApps')}</h3>
                        <p className="text-3xl font-bold text-purple-500">
                            {systemInfo.totalApps || 0}
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <Microchip className="h-10 w-10 mb-2 text-green-500" />
                        <h3 className="text-lg font-semibold text-center">{t('home.processor')}</h3>
                        <p className="text-sm text-center text-muted-foreground mb-1">{systemInfo.cpu}</p>
                        <p className="text-xs text-center text-muted-foreground">{systemInfo.cpuCores} {t('home.cores')} / {systemInfo.cpuThreads} {t('home.threads')}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <MemoryStick className="h-10 w-10 mb-2 text-amber-500" />
                        <h3 className="text-lg font-semibold text-center">{t('home.memory')}</h3>
                        <p className="text-sm text-center text-muted-foreground mb-1">{systemInfo.ram}</p>
                        <p className="text-xs text-center text-muted-foreground">{t('home.freeSpace')}: {systemInfo.freeRam}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Real-time Usage Metrics */}
            <Card className="shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-500" />
                        {t('home.systemUsage')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CPU Usage */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Cpu className="h-5 w-5 text-blue-500" />
                                <h3 className="font-medium">{t('home.cpuUsage')}</h3>
                            </div>
                            <span className={`font-semibold ${getUsageColor(systemInfo.cpuUsage || 0)}`}>
                                {systemInfo.cpuUsage || 0}%
                            </span>
                        </div>
                        <Progress 
                            value={systemInfo.cpuUsage || 0} 
                            max={100} 
                            className="h-2 w-full bg-slate-200"
                            indicatorClassName={getProgressColor(systemInfo.cpuUsage || 0)}
                        />
                    </div>

                    {/* Memory Usage */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <MemoryStick className="h-5 w-5 text-green-500" />
                                <h3 className="font-medium">{t('home.memoryUsage')}</h3>
                            </div>
                            <span className={`font-semibold ${getUsageColor(systemInfo.memoryUsage || 0)}`}>
                                {systemInfo.memoryUsage || 0}%
                            </span>
                        </div>
                        <Progress 
                            value={systemInfo.memoryUsage || 0} 
                            max={100} 
                            className="h-2 w-full bg-slate-200"
                            indicatorClassName={getProgressColor(systemInfo.memoryUsage || 0)}
                        />
                    </div>

                    {/* GPU Usage */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Microchip className="h-5 w-5 text-amber-500" />
                                <h3 className="font-medium">{t('home.gpuUsage')}</h3>
                            </div>
                            <span className={`font-semibold ${getUsageColor(systemInfo.gpuUsage || 0)}`}>
                                {systemInfo.gpuUsage || 0}%
                            </span>
                        </div>
                        <Progress 
                            value={systemInfo.gpuUsage || 0} 
                            max={100} 
                            className="h-2 w-full bg-slate-200"
                            indicatorClassName={getProgressColor(systemInfo.gpuUsage || 0)}
                        />
                        <p className="text-xs text-muted-foreground">{systemInfo.gpu}</p>
                    </div>

                    {/* Network Usage */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Network className="h-5 w-5 text-indigo-500" />
                                <h3 className="font-medium">{t('home.networkUsage')}</h3>
                            </div>
                            <span className={`font-semibold ${getUsageColor(systemInfo.networkUsage || 0)}`}>
                                {systemInfo.networkUsage || 0}%
                            </span>
                        </div>
                        <Progress 
                            value={systemInfo.networkUsage || 0} 
                            max={100} 
                            className="h-2 w-full bg-slate-200"
                            indicatorClassName={getProgressColor(systemInfo.networkUsage || 0)}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>↓ {systemInfo.networkDownload || 0} KB/s</span>
                            <span>↑ {systemInfo.networkUpload || 0} KB/s</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Storage Information */}
            <Card className="shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-purple-500" />
                        {t('home.storage')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">{t('home.totalSpace')}: {systemInfo.diskSpace}</span>
                        <span className="text-muted-foreground">{t('home.freeSpace')}: {systemInfo.diskFree}</span>
                    </div>
                    <Progress 
                        value={systemInfo.diskSpace ? 
                            parseInt(systemInfo.diskSpace.replace(/\D/g, '')) - parseInt((systemInfo.diskFree || "0").replace(/\D/g, '')) 
                            : 0
                        } 
                        max={systemInfo.diskSpace ? parseInt(systemInfo.diskSpace.replace(/\D/g, '')) : 100} 
                        className="h-2 w-full bg-slate-200"
                        indicatorClassName="bg-purple-500"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
