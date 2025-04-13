import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "react-i18next";

export type AppInfo = {
    id: string;
    name: string;
    version: string;
    newVersion?: string;
    selected?: boolean;
    isInstalled?: boolean;
}

// useTranslation hook'unu kullanmak için bir HOC (Higher Order Component) oluşturuyoruz
// çünkü columns bir değişken ve doğrudan hook kullanamıyor
export const createColumns = (): ColumnDef<AppInfo>[] => {
    // i18n için hook'u çağır
    const { t } = useTranslation();

    return [
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
                        aria-label={t('apps.selectAll')}
                    />
                </div>
            ),
            cell: ({ row }) => {
                const isInstalled = row.original.isInstalled;

                return (
                    <div className="w-[30px] flex justify-center">
                        {isInstalled ? (
                            <span className="text-xs text-primary font-medium">
                                {t('apps.installed')}
                            </span>
                        ) : (
                            <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(value: boolean | "indeterminate") => row.toggleSelected(!!value)}
                                aria-label={t('apps.selectApp')}
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
]