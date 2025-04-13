import React from 'react';
import { RefreshCw, Loader, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAppContext } from './AppContext';
import SelectedAppsActions from './SelectedAppsActions';

const UpdatesTab = () => {
    const { t } = useTranslation();
    const { loading, updatableApps, columns, onRowSelectionChange, checkForUpdates } = useAppContext();

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    {t('apps.availableUpdates')}
                </CardTitle>
                <CardDescription>
                    {t('apps.updateableApps')}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
                <SelectedAppsActions />

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
    );
};

export default UpdatesTab; 