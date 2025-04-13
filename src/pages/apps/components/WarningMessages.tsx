import React from 'react';
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import { useAppContext } from './AppContext';

const WarningMessages = () => {
    const { t } = useTranslation();
    const { error, wingetMissing } = useAppContext();

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

    // Genel hata mesajını göster
    const renderErrorMessage = () => {
        if (!error || wingetMissing) return null;

        return (
            <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t('apps.errorTitle')}</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        );
    };

    return (
        <>
            {renderWingetWarning()}
            {renderErrorMessage()}
        </>
    );
};

export default WarningMessages; 