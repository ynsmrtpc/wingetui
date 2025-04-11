import {Route, Routes} from "react-router-dom";
import Apps from "@/pages/apps";
import { WingetUIComponent } from "@/components/WingetUIComponent.tsx";
import Home from "@/pages/home";

function App() {
    return (
        <div className="flex h-svh items-center justify-center">
            <WingetUIComponent>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/apps" element={<Apps />} />
                    <Route path="*" element={<>not found</>} />
                </Routes>
            </WingetUIComponent>
        </div>
    );
}

export default App
