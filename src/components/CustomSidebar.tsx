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
import { ReactNode } from "react";

export function CustomSidebar({ children }: { children: ReactNode }) {
  const { nav } = SidebarData()
  const router = useLocation();
  const activeTab = router.pathname;

  return (
    <SidebarProvider className="items-start h-full">
      <Sidebar collapsible="offcanvas" variant="floating" side="left" className="shadow-lg">
        <SidebarContent>
          <SidebarGroup className="flex flex-col gap-4 h-full">
            {/* Enhanced header with gradient background and better spacing */}
            <SidebarGroupContent className="flex items-center p-5 mb-2 bg-gradient-to-r from-primary/10 to-transparent rounded-md mx-1">
              <div className="flex items-center gap-3">
                <div>
                  <img src="https://yunusemretopcu.com/uploads/wingetui/icon.svg" alt="logo" className="h-10 w-10"/>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary tracking-tight">WingetUI</h3>
                  <p className="text-xs text-muted-foreground">Package Manager</p>
                </div>
              </div>
            </SidebarGroupContent>

            {/* Navigation items with enhanced styling */}
            <SidebarGroupContent className="px-2">
              {nav.map((item) => (
                <SidebarMenu key={item.href}>
                  <SidebarMenuButton
                    isActive={item.href === activeTab}
                    className={`transition-all duration-200 hover:translate-x-1 relative ${item.href === activeTab ? 'overflow-visible' : ''}`}
                  >
                    {/* Active indicator */}
                    {item.href === activeTab && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
                    )}

                    <Link to={item.href} className="w-full h-full flex items-center">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md ${item.href === activeTab ? 'bg-primary/10' : 'bg-muted/50'}`}>
                          <item.icon className={`h-5 w-5 ${item.href === activeTab ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className={`font-medium ${item.href === activeTab ? 'text-primary' : 'text-muted-foreground'}`}>
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>

            {/* Divider before footer */}
            <SidebarGroupContent className="px-3 mt-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-muted/50 to-transparent my-3"></div>
            </SidebarGroupContent>

            {/* Footer with version info */}
            <SidebarGroupContent className="px-4 pb-4">
              <div className="text-xs text-muted-foreground/60 flex items-center justify-between">
                <span className="bg-muted/30 px-2 py-0.5 rounded-full">v0.1.1</span>
                <span className="italic">WingetUI</span>
              </div>
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
