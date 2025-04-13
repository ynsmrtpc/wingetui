import React, { useState } from 'react';
import { Download, Search, Loader, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useAppContext } from './AppContext';

const InstallTab = () => {
    const { t } = useTranslation();
    const {
        searchResults,
        searchLoading,
        searching,
        performSearch,
        clearSearch,
        columns,
        onRowSelectionChange,
        selectedApps,
        installSelected,
        installingApps
    } = useAppContext();

    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        if (searchText && searchText.trim().length >= 2) {
            performSearch(searchText);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-slate-600" />
                    {t('apps.tabs.install')}
                </CardTitle>
                <CardDescription>
                    {t('apps.selectToInstall')}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-3 mb-5">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t('apps.searchPlaceholder')}
                            className="pl-8"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSearch} disabled={searchLoading || searchText.length < 2}>
                            {searchLoading ? (
                                <>
                                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                                    {t('apps.searching')}
                                </>
                            ) : (
                                <>
                                    <Search className="h-4 w-4 mr-2" />
                                    {t('apps.search')}
                                </>
                            )}
                        </Button>

                        {searching && (
                            <Button variant="outline" onClick={clearSearch}>
                                <XCircle className="h-4 w-4 mr-2" />
                                {t('apps.clearSearch')}
                            </Button>
                        )}
                    </div>
                </div>

                {searching && selectedApps.length > 0 && (
                    <div className="flex justify-between items-center mb-4 p-2 bg-muted rounded-md">
                        <div className="text-sm">
                            {t('apps.appsSelected', { count: selectedApps.length })}
                        </div>
                        <Button
                            size="sm"
                            onClick={installSelected}
                            disabled={installingApps}
                        >
                            {installingApps ? (
                                <>
                                    <Loader className="h-3.5 w-3.5 mr-2 animate-spin" />
                                    {t('apps.installing')}
                                </>
                            ) : (
                                <>
                                    <Download className="h-3.5 w-3.5 mr-2" />
                                    {t('apps.installSelected')}
                                </>
                            )}
                        </Button>
                    </div>
                )}

                {searchLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        {searching && searchResults.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <XCircle className="h-16 w-16 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium">{t('apps.noResults')}</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {t('apps.tryAnotherSearch')}
                                </p>
                            </div>
                        ) : searching ? (
                            <div>
                                <h3 className="text-sm font-medium mb-2">{t('apps.searchResults')}</h3>
                                <DataTable
                                    columns={columns}
                                    data={searchResults}
                                    onRowSelectionChange={onRowSelectionChange}
                                    rowSelection={true}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <Search className="h-16 w-16 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium">{t('apps.searchApps')}</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {t('apps.searchToInstall')}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default InstallTab; 