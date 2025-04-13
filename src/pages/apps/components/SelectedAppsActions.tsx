import React from 'react';
import { Check, Loader, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAppContext } from './AppContext';

const SelectedAppsActions = () => {
    const { t } = useTranslation();
    const { selectedApps, updatingApps, updateSelected } = useAppContext();

    if (selectedApps.length === 0) {
        return null;
    }

    return (
        <div className="flex justify-between items-center p-4 pt-0">
            <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="font-medium">
                    {t('apps.appsSelected', { 'count': selectedApps.length })}
                </span>
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
    );
};

export default SelectedAppsActions; 