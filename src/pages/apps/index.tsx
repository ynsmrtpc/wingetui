import { Package, RefreshCw, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

// Context Provider
import { AppProvider, useAppContext } from './components/AppContext';

// Component Imports
import AppStatistics from './components/AppStatistics';
import SearchBar from './components/SearchBar';
import WarningMessages from './components/WarningMessages';
import WingetInstallPrompt from './components/WingetInstallPrompt';

// Tab Page Imports (Ayrı sayfa modülleri)
import AllApps from './tabs/AllApps';
import Updates from './tabs/Updates';
import Install from './tabs/Install';

// Ana tab bileşeni
const AppsTabsContent = () => {
    const { t } = useTranslation();
    const { stats, currentTab, setCurrentTab, wingetMissing, installWinget } = useAppContext();

    return (
        <div className="space-y-6 px-1">
            {wingetMissing ? (
                <WingetInstallPrompt onInstall={installWinget} />
            ) : (
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
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
                            <TabsTrigger value="install" className="flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                <span>{t('apps.tabs.install')}</span>
                            </TabsTrigger>
                        </TabsList>

                        {currentTab !== "install" && <SearchBar />}
                    </div>

                    <WarningMessages />
                    {currentTab !== "install" && <AppStatistics />}

                    <TabsContent value="all">
                        <AllApps />
                    </TabsContent>

                    <TabsContent value="updates">
                        <Updates />
                    </TabsContent>

                    <TabsContent value="install">
                        <Install />
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};

// Context Provider ile sarılmış ana bileşen
const Apps = () => {
    return (
        <AppProvider>
            <AppsTabsContent />
        </AppProvider>
    );
};

export default Apps;
