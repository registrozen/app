import { Class } from "@/types/classes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, UsersRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavLink } from "react-router-dom";

export function NavClasses({
  classes,
  otherClasses,
}: {
  classes: Class[];
  otherClasses: Class[];
}) {
  const { isMobile, open } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Classi</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              tooltip={{ children: "Classi", hidden: open }}
              asChild
            >
              <NavLink to={"classes"}>
                <UsersRound className="group-data-[state=collapsed]:mx-2" />
                <span>Classi</span>
              </NavLink>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <ChevronsUpDown className="size-4" />{" "}
                  <span className="sr-only">Apri</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="px-1 py-1.5 font-semibold">
                  Le Mie Classi
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-40 snap-y overflow-y-auto">
                  {classes.map((p) => (
                    <DropdownMenuItem key={p.id} className="snap-start">
                      {p.name}
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="px-1 py-1.5 font-semibold">
                  Altre Classi
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-40 snap-y overflow-y-auto">
                  {otherClasses.map((p) => (
                    <DropdownMenuItem key={p.id} className="snap-start">
                      {p.name}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
