import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "react-i18next";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AppInfo = {
    id: string;
    name: string;
    version: string;
    newVersion?: string;
    selected?: boolean;
    isInstalled?: boolean;
    isUpdating?: boolean;
    isInstalling?: boolean;
}

// useTranslation hook'unu kullanmak için bir HOC (Higher Order Component) oluşturuyoruz
// çünkü columns bir değişken ve doğrudan hook kullanamıyor
export const createColumns = (
    currentTab: string = "all", 
    uninstallAppFn?: (app: AppInfo) => Promise<void>
): ColumnDef<AppInfo>[] => {
    // i18n için hook'u çağır
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();

    return [
        {
            id: "select",
            header: ({ table }) => {
                // Mevcut sayfadaki tüm satırları al
                const rows = table.getRowModel().rows;

                // Devre dışı olmayan satırları filtrele
                const selectableRows = rows.filter(row => {
                    const original = row.original as AppInfo;
                    const hasUpdate = original.newVersion && original.newVersion !== original.version;
                    const shouldDisable = currentTab === "all" && !hasUpdate;
                    return !shouldDisable && !original.isInstalled;
                });

                // Seçilebilir satırların hepsi seçili mi kontrol et
                const allSelectableSelected = selectableRows.length > 0 && 
                    selectableRows.every(row => row.getIsSelected());

                // Seçilebilir satırların bazıları seçili mi kontrol et
                const someSelectableSelected = selectableRows.length > 0 && 
                    selectableRows.some(row => row.getIsSelected()) && 
                    !allSelectableSelected;

                return (
                    <div className="w-[30px] flex justify-center">
                        <Checkbox
                            checked={
                                allSelectableSelected ||
                                (someSelectableSelected && "indeterminate")
                            }
                            onCheckedChange={(value: boolean | "indeterminate") => {
                                // Sadece seçilebilir satırları seç/kaldır
                                selectableRows.forEach(row => {
                                    row.toggleSelected(!!value);
                                });
                            }}
                            aria-label={t('apps.selectAll')}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const isInstalled = row.original.isInstalled;
                const isUpdating = row.original.isUpdating;
                const isInstalling = row.original.isInstalling;
                const isLoading = isUpdating || isInstalling;
                const hasUpdate = row.original.newVersion && row.original.newVersion !== row.original.version;
                // Only disable checkboxes in the "all" tab for apps without updates
                const shouldDisable = currentTab === "all" && !hasUpdate;

                return (
                    <div className="w-[30px] flex justify-center">
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : isInstalled ? (
                            <span className="text-xs text-primary font-medium">
                                {t('apps.installed')}
                            </span>
                        ) : (
                            <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(value: boolean | "indeterminate") => row.toggleSelected(!!value)}
                                aria-label={t('apps.selectApp')}
                                disabled={shouldDisable}
                            />
                        )}
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
            size: 30,
        },
        {
            accessorKey: "name",
            header: t('apps.appName'),
        },
        {
            accessorKey: "version",
            header: t('apps.version'),
        },
        {
            accessorKey: "newVersion",
            header: t('apps.newVersion'),
        },
        {
            id: "actions",
            header: t('apps.actions'),
            cell: ({ row }) => {
                const app = row.original;
                const isInstalled = app.isInstalled !== false; // Treat undefined as true for backward compatibility
                const isUpdating = app.isUpdating;

                if (isUpdating) {
                    return (
                        <div className="flex justify-center">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        </div>
                    );
                }

                if (isInstalled) {
                    return (
                        <div className="flex justify-end">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => uninstallAppFn && uninstallAppFn(app)}
                                title={t('apps.uninstall')}
                                aria-label={t('apps.uninstall')}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    );
                }

                return null;
            },
            enableSorting: false,
            size: 50,
        },
    ];
};

// Geriye uyumluluk için eski columns değişkenini tutuyoruz
// Ancak bunun yerine createColumns() fonksiyonunu kullanacağız
export const columns: ColumnDef<AppInfo>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="w-[30px] flex justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Tümünü seç"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="w-[30px] flex justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: boolean | "indeterminate") => row.toggleSelected(!!value)}
                    aria-label="Uygulama seç"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 30,
    },
    {
        accessorKey: "name",
        header: "Uygulama Adı",
    },
    {
        accessorKey: "version",
        header: "Sürüm",
    },
    {
        accessorKey: "newVersion",
        header: "Yeni Sürüm",
    },
    {
        id: "actions",
        header: "İşlemler",
        cell: ({ row }) => {
            const app = row.original;
            console.log(app)
            // Legacy columns don't have access to the context, so this is just a placeholder
            // The actual implementation uses createColumns() which has access to the context
            return null;
        },
        enableSorting: false,
        size: 50,
    },
]
