import { ColumnDef } from "@tanstack/react-table"

export type AppInfo = {
    name: string;
    version: string;
}

export const columns: ColumnDef<AppInfo>[] = [
    {
        accessorKey: "name",
        header: "Uygulama Adı",
    },
    {
        accessorKey: "version",
        header: "Sürüm",
    },
]