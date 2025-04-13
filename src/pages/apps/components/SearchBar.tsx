import React from 'react';
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAppContext } from './AppContext';

const SearchBar = () => {
    const { t } = useTranslation();
    const { searchQuery, setSearchQuery, refreshing, checkForUpdates } = useAppContext();

    return (
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
    );
};

export default SearchBar; 