import { AppCommandDialog } from "@/components/app/app-command";
import { AppSidebar } from "@/components/app/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function LayoutPage() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="ml-1" />
        <section className="flex flex-col px-8 pt-8">
          {location.pathname !== "/" && <AppCommandDialog />}
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
