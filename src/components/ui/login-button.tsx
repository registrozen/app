import { useAuth } from "@/auth";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback } from "./avatar";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

export function LoginButton() {
  const { user, logout } = useAuth();

  const { mutate } = useMutation({
    async mutationFn() {
      logout();
    },
  });

  const initials = useMemo(
    () =>
      user?.name
        .trim()
        .split(" ")
        .reduce((acc, cur) => acc + cur.charAt(0), ""),
    [user],
  );

  if (!user) {
    return <Button variant="link">Login</Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => mutate()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
