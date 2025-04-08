import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table.tsx";
import { columns } from "@/components/AppList/columns.tsx";

async function getData(): Promise<{ name: string; version: string }[]> {
    return await window.ipcRenderer.invoke('getAppList')
}

function App() {
    const [data, setData] = useState<{ name: string; version: string }[] | null>(null);

    const getDataFromData = async () => {
        const result = await getData();
        console.log(result);
        setData(result);
    }

    useEffect(() => {
        getDataFromData();
    }, []);

    return (
        <div className="flex flex-col p-3 min-h-svh">
            <div className="flex w-full justify-end gap-2 border-b-2 pb-2">
                <Button size="sm" variant="outline">Güncellemeleri Denetle</Button>
                <Button size="sm" variant="outline">Tümünü Güncelle</Button>
            </div>
            <div className="p-3">
                <DataTable columns={columns} data={data ?? []} />
            </div>
        </div>
    );
}

export default App
