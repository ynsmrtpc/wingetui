import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { RowSelectionState } from "@tanstack/react-table";
import { createColumns, AppInfo } from "@/components/AppList/columns";
import { useTranslation } from "react-i18next";
import AppTabSkeletonLoader from "@/components/skeletons/AppTabSkeletonLoader";
import { Skeleton } from "@/components/ui/skeleton";
import {
    getData,
    updateSelectedApps,
    filterBySearchTerm,
    filterForUpdates,
    searchApps,
    markInstalledApps,
    installSelectedApps,
    uninstallApp,
    installWinget
} from '../services/appsService';

interface AppContextType {
    data: AppInfo[] | null;
    loading: boolean;
    error: string | null;
    wingetMissing: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    refreshing: boolean;
    updatingApps: boolean;
    selectedApps: AppInfo[];
    setSelectedApps: (apps: AppInfo[]) => void;
    stats: {
        total: number;
        updatable: number;
    };
    columns: any;
    filteredData: AppInfo[];
    updatableApps: AppInfo[];
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    checkForUpdates: () => Promise<void>;
    updateSelected: () => Promise<void>;
    onRowSelectionChange: (rowSelection: RowSelectionState) => void;

    // Arama ve kurulum ile ilgili state ve fonksiyonlar
    searchResults: AppInfo[];
    searchLoading: boolean;
    searching: boolean;
    performSearch: (keyword: string) => Promise<void>;
    clearSearch: () => void;
    installSelected: () => Promise<void>;
    installingApps: boolean;

    // Uygulama kaldırma fonksiyonu
    uninstallApp: (app: AppInfo) => Promise<void>;

    // Winget yükleme fonksiyonu
    installWinget: () => Promise<void>;
    installingWinget: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const { t } = useTranslation();
    const [data, setData] = useState<AppInfo[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [updatingApps, setUpdatingApps] = useState<boolean>(false);
    const [selectedApps, setSelectedApps] = useState<AppInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [wingetMissing, setWingetMissing] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState("all");

    // Uygulama kurulumu için state'ler
    const [searchResults, setSearchResults] = useState<AppInfo[]>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [installingApps, setInstallingApps] = useState<boolean>(false);
    const [installingWinget, setInstallingWinget] = useState<boolean>(false);

    const [stats, setStats] = useState({
        total: 0,
        updatable: 0,
    });

    // Verileri yükleyen fonksiyon
    const getDataFromData = async () => {
        try {
            // Only set loading to true if it's the initial load
            if (initialLoad) {
                setLoading(true);
            }

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

            setData(result.data);

            // İstatistikleri güncelle
            const updatableCount = filterForUpdates(result.data).length;
            setStats({
                total: result.data.length,
                updatable: updatableCount,
            });
        } catch (error) {
            console.error('Uygulama listesi yüklenirken hata:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            setLoading(false);
            if (initialLoad) {
                setInitialLoad(false);
            }
        }
    };

    // Uygulama kaldırma fonksiyonu
    const handleUninstallApp = async (app: AppInfo) => {
        if (!app || !app.id) {
            toast.error(t('apps.invalidApp'), {
                description: t('apps.uninstallFailed')
            });
            return;
        }

        try {
            const result = await uninstallApp(app);

            if (result && result.success) {
                toast.success(t('apps.uninstallSuccess'), {
                    description: result.message
                });
                // Kaldırma sonrası uygulamaları yenile
                await getDataFromData();
            } else {
                toast.error(t('apps.uninstallError'), {
                    description: result?.message || t('apps.unknownError')
                });
            }
        } catch (error) {
            toast.error(t('apps.uninstallError'), {
                description: error instanceof Error ? error.message : String(error)
            });
        }
    };

    // Winget yükleme fonksiyonu
    const handleInstallWinget = async () => {
        setInstallingWinget(true);
        try {
            const result = await installWinget();

            if (result && result.success) {
                toast.success(t('apps.wingetInstallStarted'), {
                    description: result.message
                });
                // Winget yüklendikten sonra uygulamaları yeniden yükle
                await getDataFromData();
            } else {
                toast.error(t('apps.wingetInstallError'), {
                    description: result?.message || t('apps.unknownError')
                });
            }
        } catch (error) {
            toast.error(t('apps.wingetInstallError'), {
                description: error instanceof Error ? error.message : String(error)
            });
        } finally {
            setInstallingWinget(false);
        }
    };

    // Tabloyu oluştur (çeviri desteğiyle ve mevcut sekme bilgisiyle)
    const columns = createColumns(currentTab, handleUninstallApp);

    // Güncellemeleri denetleme fonksiyonu
    const checkForUpdates = async () => {
        setRefreshing(true);
        setError(null);

        // Mevcut veriyi temizle ve yeni veriyi al
        setData(null);

        // Don't set loading to true for refreshes, only for initial load
        // This is handled in getDataFromData now

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
            const { success, results } = await updateSelectedApps(selectedApps);

            // Başarılı güncelleme sayısını hesapla
            const successCount = results.filter(r => r.success).length;

            // Başarısız güncellemeleri filtrele
            const failedUpdates = results.filter(r => !r.success);

            // Genel başarı durumuna göre bildirim göster
            if (success) {
                if (failedUpdates.length > 0) {
                    // Bazı güncellemeler başarılı, bazıları başarısız
                    toast.success(t('apps.someUpdatesSucceeded'), {
                        description: t('apps.someAppsUpdated', { 
                            success: successCount, 
                            total: selectedApps.length 
                        })
                    });

                    // Her başarısız güncelleme için ayrı hata bildirimi göster
                    failedUpdates.forEach(result => {
                        const appName = selectedApps.find(app => app.id === result.id)?.name || result.id;
                        toast.error(t('apps.updateFailed'), {
                            description: `${appName}: ${result.message || t('apps.unknownError')}`
                        });
                    });
                } else {
                    // Tüm güncellemeler başarılı
                    toast.success(t('apps.updateSuccess'), {
                        description: t('apps.allAppsUpdated', { count: selectedApps.length })
                    });
                }
            } else {
                // Hiçbir güncelleme başarılı değil
                toast.error(t('apps.updateFailed'), {
                    description: t('apps.noAppsUpdated')
                });

                // Her başarısız güncelleme için ayrı hata bildirimi göster
                failedUpdates.forEach(result => {
                    if (result.id === 'batch') {
                        // Genel hata
                        toast.error(t('apps.updateFailed'), {
                            description: result.message || t('apps.unknownError')
                        });
                    } else {
                        const appName = selectedApps.find(app => app.id === result.id)?.name || result.id;
                        toast.error(t('apps.updateFailed'), {
                            description: `${appName}: ${result.message || t('apps.unknownError')}`
                        });
                    }
                });
            }

            // verileri yeniden yükleyebiliriz
            await getDataFromData();
            setSelectedApps([]);
        } catch (error) {
            toast.error(t('apps.updateFailed'), {
                description: error instanceof Error ? error.message : t('apps.errorUpdatingApps')
            });
        } finally {
            setUpdatingApps(false);
        }
    };

    // Arama fonksiyonu
    const performSearch = async (keyword: string) => {
        if (!keyword || keyword.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        setSearchLoading(true);
        setSearching(true);
        setError(null);

        try {
            const result = await searchApps(keyword);

            if (result.error) {
                console.error('App search error:', result.error);
                setError(result.error);
                setSearchResults([]);
            } else if (data) {
                // Arama sonuçlarında yüklü uygulamaları işaretle
                const markedResults = markInstalledApps(result.data, data);
                setSearchResults(markedResults);
            } else {
                setSearchResults(result.data);
            }
        } catch (error) {
            console.error('Error searching apps:', error);
            setError(error instanceof Error ? error.message : 'Error searching for apps');
            setSearchResults([]);
        } finally {
            setSearchLoading(false);
        }
    };

    // Aramayı temizle
    const clearSearch = () => {
        setSearching(false);
        setSearchResults([]);
        setSearchQuery("");
    };

    // Seçili uygulamaları yükleme fonksiyonu
    const installSelected = async () => {
        if (selectedApps.length === 0) {
            toast.error(t('apps.noAppSelected'), {
                description: t('apps.pleaseSelectApps')
            });
            return;
        }

        setInstallingApps(true);
        try {
            const { success, results } = await installSelectedApps(selectedApps);

            // Başarılı yükleme sayısını hesapla
            const successCount = results.filter(r => r.success).length;

            // Başarısız yüklemeleri filtrele
            const failedInstalls = results.filter(r => !r.success);

            // Genel başarı durumuna göre bildirim göster
            if (success) {
                if (failedInstalls.length > 0) {
                    // Bazı yüklemeler başarılı, bazıları başarısız
                    toast.success(t('apps.someInstallsSucceeded'), {
                        description: t('apps.someAppsInstalled', { 
                            success: successCount, 
                            total: selectedApps.length 
                        })
                    });

                    // Her başarısız yükleme için ayrı hata bildirimi göster
                    failedInstalls.forEach(result => {
                        const appName = selectedApps.find(app => app.id === result.id)?.name || result.id;
                        toast.error(t('apps.installError'), {
                            description: `${appName}: ${result.message || t('apps.unknownError')}`
                        });
                    });
                } else {
                    // Tüm yüklemeler başarılı
                    toast.success(t('apps.installSuccess'), {
                        description: t('apps.allAppsInstalled', { count: selectedApps.length })
                    });
                }
            } else {
                // Hiçbir yükleme başarılı değil
                toast.error(t('apps.installError'), {
                    description: t('apps.noAppsInstalled')
                });

                // Her başarısız yükleme için ayrı hata bildirimi göster
                failedInstalls.forEach(result => {
                    if (result.id === 'batch') {
                        // Genel hata
                        toast.error(t('apps.installError'), {
                            description: result.message || t('apps.unknownError')
                        });
                    } else {
                        const appName = selectedApps.find(app => app.id === result.id)?.name || result.id;
                        toast.error(t('apps.installError'), {
                            description: `${appName}: ${result.message || t('apps.unknownError')}`
                        });
                    }
                });
            }

            // Yükleme sonrası aramayı temizle ve uygulamaları yenile
            clearSearch();
            await getDataFromData();
            setSelectedApps([]);
        } catch (error) {
            toast.error(t('apps.installError'), {
                description: error instanceof Error ? error.message : String(error)
            });
        } finally {
            setInstallingApps(false);
        }
    };

    useEffect(() => {
        getDataFromData();
    }, []);

    useEffect(() => {
        setSelectedApps([]);
    }, [currentTab]);

    // Arama ile filtrelenmiş veri
    const filteredData = filterBySearchTerm(data || [], searchQuery);

    // Güncellenebilir uygulamalar
    const updatableApps = filterForUpdates(data || []);

    // Seçilen satırların yönetimi
    const onRowSelectionChange = (rowSelection: RowSelectionState) => {
        let source;
        if (currentTab === "updates") {
            source = updatableApps;
        } else if (currentTab === "install" && searching) {
            source = searchResults;
        } else {
            source = filteredData;
        }

        const selectedRows = Object.keys(rowSelection)
            .map(index => source[parseInt(index, 10)]);
        setSelectedApps(selectedRows);
    };

    // Show skeleton loader only during initial load
    if (loading && initialLoad) {
        return (
            <div className="space-y-6 px-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-48" />
                </div>
                <AppTabSkeletonLoader 
                    showTable={true} 
                    showActions={false} 
                    showSearch={false} 
                />
            </div>
        );
    }

    return (
        <AppContext.Provider
            value={{
                data,
                loading,
                error,
                wingetMissing,
                searchQuery,
                setSearchQuery,
                refreshing,
                updatingApps,
                selectedApps,
                setSelectedApps,
                stats,
                columns,
                filteredData,
                updatableApps,
                currentTab,
                setCurrentTab,
                checkForUpdates,
                updateSelected,
                onRowSelectionChange,

                // Kurulum ve arama ile ilgili değerler
                searchResults,
                searchLoading,
                searching,
                performSearch,
                clearSearch,
                installSelected,
                installingApps,
                uninstallApp: handleUninstallApp,
                installWinget: handleInstallWinget,
                installingWinget
            }}
        >
            {children}
        </AppContext.Provider>
    );
}; 
