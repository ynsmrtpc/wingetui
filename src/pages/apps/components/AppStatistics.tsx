import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppContext } from './AppContext';

const AppStatistics = () => {
    const { t } = useTranslation();
    const { stats, setCurrentTab, currentTab } = useAppContext();

    return (
        <Card className="shadow-md mb-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{t('apps.appStatistics')}</CardTitle>
                <CardDescription>
                    {t('apps.systemAppStatus')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
                    <div
                        onClick={() => setCurrentTab("all")}
                        className={`flex items-center p-4 rounded-lg border ${currentTab === "all" && "bg-primary/10"}`}
                    >
                        <Package className="h-8 w-8 mr-3 text-primary" />
                        <div>
                            <p className="text-sm font-medium">{t('apps.totalApps')}</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                    </div>
                    <div
                        onClick={() => setCurrentTab("updates")}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer ${currentTab === "updates" && "bg-primary/10"}`}
                    >
                        <RefreshCw className="h-8 w-8 mr-3 text-yellow-500" />
                        <div>
                            <p className="text-sm font-medium">{t('apps.updatable')}</p>
                            <p className="text-2xl font-bold">{stats.updatable}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppStatistics; 