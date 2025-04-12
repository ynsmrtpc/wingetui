import { Route, Routes } from "react-router-dom";
import { CustomSidebar } from "@/components/CustomSidebar.tsx";
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
                <Route path="/" element={<CustomSidebar><Home /></CustomSidebar>} />
                <Route path="/apps" element={<CustomSidebar><Apps /></CustomSidebar>} />
                <Route path="/settings" element={<CustomSidebar><Settings /></CustomSidebar>} />
            </Routes>
        </>
    );
}

export default App;
