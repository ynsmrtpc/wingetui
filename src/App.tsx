import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table.tsx";
import { columns } from "@/components/AppList/columns.tsx";
import { Loader } from 'lucide-react';

async function getData(): Promise<{ name: string; version: string }[]> {
    return await window.ipcRenderer.invoke('getAppList')
}

function App() {
    const [data, setData] = useState<{ name: string; version: string }[] | null>(null);
    const [loading,setLoading] = useState<boolean>(true);

    const getDataFromData = async () => {
        const result = await getData();
        setLoading(false);
        setData(result);
    }

    useEffect(() => {
        getDataFromData();
    }, []);

    return (
        <div className="flex flex-col p-3 min-h-svh">
            <div className="p-3">
                {loading ? (
                    <div className="flex items-center justify-center h-[calc(100svh-100px)]">
                        <Loader  className="animate-spin"/>
                    </div>
                ) :
                    <DataTable
                        searchKey="name"
                        pageSize={15}
                        searchPlaceholder="Uygulama ara..."
                        columns={columns}
                        data={data ?? []}
                    >
                       <div className="flex w-full justify-end gap-2">
                           <Button size="sm" variant="outline">Güncellemeleri Denetle</Button>
                           <Button size="sm" variant="outline">Tümünü Güncelle</Button>
                       </div>
                    </DataTable>
                }
            </div>
        </div>
    );
}

export default App
