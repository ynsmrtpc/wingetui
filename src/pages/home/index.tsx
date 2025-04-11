import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {CogIcon, Laptop, MemoryStick, Microchip} from "lucide-react";

// SystemInfoTypes interface
interface SystemInfoTypes {
    cpu: string;
    ram: string;
    os: string;
    version: string;
}

// Data çekmek için fonksiyon
async function getData(): Promise<SystemInfoTypes> {
    return await window.ipcRenderer.invoke('getSystemInfo')}

const Home = () => {
    const [systemInfo, setSystemInfo] = useState<SystemInfoTypes>({
        cpu: "",
        ram: "",
        os: "",
        version: "",
    })

    const getDataFromData = async () => {
        const result = await getData();
        console.log(result)
        setSystemInfo(result);
    }

    useEffect(() => {
        getDataFromData();
    }, []);

    return (
        <div className="space-y-6">


            <Card className="shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Bilgisayar Özellikleri</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Microchip className="text-2xl" />
                        <div className="text-lg">
                            <strong>CPU:</strong> {systemInfo.cpu}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <MemoryStick className="text-2xl" />
                        <div className="text-lg">
                            <strong>RAM:</strong> {systemInfo.ram}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Laptop className="text-2xl" />
                        <div className="text-lg">
                            <strong>OS:</strong> {systemInfo.os}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <CogIcon className="text-2xl" />
                        <div className="text-lg">
                            <strong>Versiyon:</strong> {systemInfo.version}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
