import { Route, Routes } from "react-router-dom";
import { WingetUIComponent } from "@/components/WingetUIComponent.tsx";
import Home from "@/pages/home";
import Apps from "@/pages/apps";
import Settings from "@/pages/settings";
import { Toaster } from "@/components/ui/sonner";
import '@/i18n'; // i18n kurulumunu başlat

function App() {

    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<WingetUIComponent><Home /></WingetUIComponent>} />
                <Route path="/apps" element={<WingetUIComponent><Apps /></WingetUIComponent>} />
                <Route path="/settings" element={<WingetUIComponent><Settings /></WingetUIComponent>} />
            </Routes>
        </>
    );
}

export default App;
