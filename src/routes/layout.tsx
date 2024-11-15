import { AppSidebar } from "@/components/app/app-sidebar";
import { LoginButton } from "@/components/ui/login-button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";

export function LayoutPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="ml-1" />
        <section className="flex flex-col px-8 pt-8">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
