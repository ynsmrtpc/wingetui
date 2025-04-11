import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {Link, useLocation} from "react-router-dom";
import {SidebarData} from "@/data/sidebar.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ReactNode} from "react";

export function WingetUIComponent({children}: { children: ReactNode }) {
  const { nav } = SidebarData()
  const router = useLocation();
  const activeTab = router.pathname;

  return (
        <SidebarProvider className="items-start h-full">
          <Sidebar collapsible="offcanvas" variant="floating" side="left" >
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem className="mb-3 select-none">
                      <SidebarMenuButton isActive={true} asChild>
                        <div className="flex items-center justify-start w-full">
                          <Avatar>
                            <AvatarImage src="/icon.svg" className="h-6 w-6 m-auto"/>
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <h1 className="font-mono font-bold">WingetUI</h1>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.to === activeTab}
                        >
                          <Link to={item.to}>
                            <item.icon />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-3">
              {children}
            </div>
          </main>
        </SidebarProvider>
  )
}
