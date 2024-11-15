import { NavUser } from "./nav-user";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { NavClasses } from "./nav-classes";
import { useClassesStore } from "@/stores/classes";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
  const { state } = useSidebar();
  const { classes, otherClasses } = useClassesStore();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavLink to="/">
          {state === "collapsed" ? (
            <h1>
              R
              <span className="rounded bg-slate-900 p-1 text-secondary">Z</span>
            </h1>
          ) : (
            <h1>
              Registro
              <span className="rounded bg-slate-900 p-1 text-secondary">
                Zen
              </span>
            </h1>
          )}
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <NavClasses classes={classes} otherClasses={otherClasses} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: "Test", email: "test@test.it", avatar: "" }}
          logout={() => {}}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
