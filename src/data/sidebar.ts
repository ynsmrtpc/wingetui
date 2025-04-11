import {Home, LayoutGrid} from "lucide-react";

const SidebarData = () => {
    return {
        nav: [
            { name: "Home", icon: Home, to: "/"},
            { name: "Apps", icon: LayoutGrid, to: "/apps"},
        ],
    }
}

export { SidebarData };