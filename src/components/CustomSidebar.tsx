import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "@/data/sidebar.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { ReactNode } from "react";

export function CustomSidebar({ children }: { children: ReactNode }) {
  const { nav } = SidebarData()
  const router = useLocation();
  const activeTab = router.pathname;

  return (
    <SidebarProvider className="items-start h-full">
      <Sidebar collapsible="offcanvas" variant="floating" side="left" >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="flex items-center">
              <Avatar className="my-4 h-8 w-8 bg-primary text-primary-foreground">
                <AvatarImage src="/icon.svg" alt="Logo" />
                <AvatarFallback>WU</AvatarFallback>
                <h3 className="font-mono text-3xl bg-amber-400">WingetUI</h3>
              </Avatar>
            </SidebarGroupContent>
            <SidebarGroupContent>
              {nav.map((item) => (
                <SidebarMenu key={item.href}>
                  <SidebarMenuButton
                    isActive={item.href === activeTab}
                  >
                    <Link to={item.href} className="w-full h-full flex items-center">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 p-6 pt-3">
        {children}
      </div>
    </SidebarProvider>
  );
}
