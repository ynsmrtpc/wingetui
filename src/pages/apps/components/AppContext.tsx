import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { RowSelectionState } from "@tanstack/react-table";
import { createColumns, AppInfo } from "@/components/AppList/columns";
import { useTranslation } from "react-i18next";
import {
    getData,
    updateSelectedApps,
    filterBySearchTerm,
    filterForUpdates,
    searchApps,
    markInstalledApps,
    installSelectedApps
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
            const updatableCount = filterForUpdates(result.data).length;
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
        } catch (error) {
            toast.error(t('apps.updateFailed'), {
                description: t('apps.errorUpdatingApps')
            });
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
            await installSelectedApps(selectedApps);
            toast.success(t('apps.installSuccess'));
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
                installingApps
            }}
        >
            {children}
        </AppContext.Provider>
    );
}; 