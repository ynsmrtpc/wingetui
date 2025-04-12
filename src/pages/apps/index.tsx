import { useEffect, useState } from "react";
import {
    Download,
    Loader,
    Search,
    RefreshCw,
    Package,
    ShieldCheck,
    Check,
    AlertTriangle
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { createColumns, AppInfo } from "@/components/AppList/columns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { RowSelectionState } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Uygulama listesini getiren fonksiyon
async function getData(): Promise<{ data: AppInfo[], error?: string }> {
    try {
        const data = await window.ipcRenderer.invoke('getAppList');

        // Başarılı cevap kontrolü
        if (!data || !Array.isArray(data)) {
            console.error('Unexpected response format from getAppList:', data);
            return {
                data: [],
                error: 'Unexpected response format from getAppList'
            };
        }
        // Her uygulamaya benzersiz bir ID atayalım
        return {
            data: data.map((app) => ({
                ...app,
                selected: false,
            }))
        };
    } catch (error) {
        console.error('Error fetching app list:', error);
        return {
            data: [],
            error: error instanceof Error ? error.message : 'Unknown error fetching app list'
        };
    }
}

// Seçilen uygulamaları güncelleyen fonksiyon
async function updateSelectedApps(selectedApps: AppInfo[]): Promise<void> {
    try {
        // Her bir seçili uygulama için update çağrısı yapabiliriz
        for (const app of selectedApps) {
            await window.ipcRenderer.invoke('updateApp', app.id || app.name);
        }

        return Promise.resolve();
    } catch (error) {
        console.error('Error updating apps:', error);
        return Promise.reject(error);
    }
}

const Apps = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<AppInfo[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [updatingApps, setUpdatingApps] = useState<boolean>(false);
    const [selectedApps, setSelectedApps] = useState<AppInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [wingetMissing, setWingetMissing] = useState<boolean>(false);
    const [tab, setTab] = useState("all")

    const [stats, setStats] = useState({
        total: 0,
        updatable: 0,
    });

    // Tabloyu oluştur (çeviri desteğiyle)
    const columns = createColumns();

    // Verileri yükleyen fonksiyon
    const getDataFromData = async () => {
        try {
            setError(null);
            const result = await getData();

            if (result.error) {
                // Hatayı işle ve kullanıcıya göster
                console.error('App list loading error:', result.error);
                setError(result.error);
                // Winget hatası olup olmadığını kontrol et
                if (result.error.toLowerCase().includes('winget')) {
                    setWingetMissing(true);
                }
            }

            setLoading(false);
            setData(result.data);

            // İstatistikleri güncelle
            const updatableCount = result.data.filter(app => app.newVersion && app.newVersion !== app.version).length;
            setStats({
                total: result.data.length,
                updatable: updatableCount,
            });
        } catch (error) {
            console.error('Uygulama listesi yüklenirken hata:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
            setLoading(false);
        }
    };

    // Güncellemeleri denetleme fonksiyonu
    const checkForUpdates = async () => {
        setRefreshing(true);
        setError(null);

        // Mevcut veriyi temizle ve yeni veriyi al
        setData(null);
        setLoading(true);

        try {
            await getDataFromData();
        } catch (error) {
            console.error('Error checking for updates:', error);
            setError(error instanceof Error ? error.message : 'Error checking for updates');
        } finally {
            setRefreshing(false);
        }
    };

    // Seçili uygulamaları güncelleme fonksiyonu
    const updateSelected = async () => {
        if (selectedApps.length === 0) {
            toast.error(t('apps.noAppSelected'), {
                description: t('apps.pleaseSelectApps')
            });
            return;
        }

        setUpdatingApps(true);
        try {
            await updateSelectedApps(selectedApps);
            toast.success(t('apps.updateStarted'), {
                description: t('apps.appsStartedUpdating', { count: selectedApps.length })
            });
            // verileri yeniden yükleyebiliriz
                await getDataFromData();
                setUpdatingApps(false);
                setSelectedApps([]);
                setTab(tab);
        } catch (error) {
            toast.error(t('apps.updateFailed'), {
                description: t('apps.errorUpdatingApps')
            });
            setUpdatingApps(false);
        }
    };

    useEffect(() => {
        getDataFromData();
    }, []);

    useEffect(() => {
        setSelectedApps([]);
    }, [tab]);

    // Arama ile filtrelenmiş veri
    const filteredData = data ? data.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    // Güncellenebilir uygulamalar
    const updatableApps = data ? data.filter(app =>
        app.newVersion && app.newVersion !== app.version
    ) : [];

    // Seçilen satırların yönetimi
    const onRowSelectionChange = (rowSelection: RowSelectionState) => {
        const source = tab === "updates" ? updatableApps : filteredData;
        const selectedRows = Object.keys(rowSelection)
            .map(index => source[parseInt(index, 10)]);
        setSelectedApps(selectedRows);
    };


    // Winget uyarı mesajını göster
    const renderWingetWarning = () => {
        if (!wingetMissing) return null;

        return (
            <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t('apps.wingetNotAvailable')}</AlertTitle>
                <AlertDescription>
                    {t('apps.wingetMockDataWarning')}
                </AlertDescription>
            </Alert>
        );
    };

    return (
        <div className="space-y-6 px-1">
            <Tabs  value={tab} onValueChange={setTab} className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <TabsList className="mb-2 md:mb-0">
                        <TabsTrigger value="all" className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>{t('apps.allApps')}</span>
                            <Badge variant="secondary" className="ml-1">{stats.total}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="updates" className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>{t('apps.updates')}</span>
                            <Badge variant="destructive" className="ml-1">{stats.updatable}</Badge>
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('apps.searchApps')}
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={checkForUpdates}
                            disabled={refreshing}
                        >
                            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                </div>

                {renderWingetWarning()}

                {error && !wingetMissing && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>{t('apps.errorTitle')}</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}


                <Card className="shadow-md mb-4">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">{t('apps.appStatistics')}</CardTitle>
                        <CardDescription>
                            {t('apps.systemAppStatus')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
                            <div onClick={() => setTab("all")} className={`flex items-center p-4 rounded-lg border ${tab==="all" && "bg-primary/10"}`}>
                                <Package className="h-8 w-8 mr-3 text-primary" />
                                <div>
                                    <p className="text-sm font-medium">{t('apps.totalApps')}</p>
                                    <p className="text-2xl font-bold">{stats.total}</p>
                                </div>
                            </div>
                            <div onClick={() => setTab("updates")}  className={`flex items-center p-4 border rounded-lg cursor-pointer  ${tab==="updates" && "bg-primary/10"}`}>
                                <RefreshCw className="h-8 w-8 mr-3 text-yellow-500" />
                                <div>
                                    <p className="text-sm font-medium">{t('apps.updatable')}</p>
                                    <p className="text-2xl font-bold">{stats.updatable}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <TabsContent value="all">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-slate-600" />
                                {t('apps.allApps')}
                            </CardTitle>
                            <CardDescription>
                                {t('apps.allInstalledApps')}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-3">
                            {selectedApps.length > 0 && (
                                <div className="flex justify-between items-center p-4 pt-0">
                                    <div className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />
                                        <span className="font-medium">{t('apps.appsSelected', { 'count': selectedApps.length })}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={updateSelected}
                                            disabled={updatingApps}
                                        >
                                            {updatingApps ? (
                                                <>
                                                    <Loader className="h-3.5 w-3.5 mr-1 animate-spin" />
                                                    {t('apps.updating')}
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-3.5 w-3.5 mr-1" />
                                                    {t('apps.updateSelected')}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <Loader className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : (
                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    onRowSelectionChange={onRowSelectionChange}
                                    rowSelection={true}
                                />
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="updates">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <RefreshCw className="h-5 w-5 " />
                                {t('apps.availableUpdates')}
                            </CardTitle>
                            <CardDescription>
                                {t('apps.updateableApps')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-3">
                            {selectedApps.length > 0 && (
                                <div className="flex justify-between items-center p-4 pt-0">
                                    <div className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />
                                        <span className="font-medium">{t('apps.appsSelected', { 'count': selectedApps.length })}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={updateSelected}
                                            disabled={updatingApps}
                                        >
                                            {updatingApps ? (
                                                <>
                                                    <Loader className="h-3.5 w-3.5 mr-1 animate-spin" />
                                                    {t('apps.updating')}
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-3.5 w-3.5 mr-1" />
                                                    {t('apps.updateSelected')}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <Loader className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : updatableApps.length > 0 ? (
                                <DataTable
                                    columns={columns}
                                    data={updatableApps}
                                    onRowSelectionChange={onRowSelectionChange}
                                    rowSelection={true}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                                    <ShieldCheck className="h-16 w-16 text-green-500 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{t('apps.allAppsUpToDate')}</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        {t('apps.noUpdatesAvailable')}
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={checkForUpdates}
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        {t('apps.checkAgain')}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Apps;