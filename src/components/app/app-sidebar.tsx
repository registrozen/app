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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "../ui/logo";
import {
  CirclePause,
  ClipboardList,
  ListTodo,
  Mail,
  Star,
  UserRound,
} from "lucide-react";
import { NavStarred } from "./nav-starred";

export function AppSidebar() {
  const { state } = useSidebar();
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavLink to="/">
          <Logo collapsed={state === "collapsed"} />
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Registro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: "Classi", hidden: state === "expanded" }}
                  isActive={pathname.startsWith("/classes")}
                >
                  <NavLink to="classes">
                    <UserRound />
                    <span>Classi</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{
                    children: "Bacheca",
                    hidden: state === "expanded",
                  }}
                  isActive={pathname.startsWith("/board")}
                >
                  <NavLink to="board">
                    <ClipboardList />
                    <span>Bacheca</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Mail />
                  <span>Messaggi</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
