"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut, Settings, User } from "lucide-react";

type User = {
  userId: string;
  username?: string;
  age?: number;
  bio?: string;
  profession?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableUser = Nullable<User>;

export function UserAvatarDropdown({
  session,
  user,
}: {
  session: Session | null;
  user: NullableUser;
}) {
  const router = useRouter();

  if (!session?.user) {
    return <div className="text-gray-500">No avatar available</div>;
  }

  const userName = session?.user?.username ?? "A";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session.user?.image || ""}
            alt={`${userName}'s avatar`}
          />
          <AvatarFallback>{firstLetter}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(`/${user}`)}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
