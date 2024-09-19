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
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function UserAvatarDropdown({ session }: { session: Session | null }) {
  const router = useRouter();

  if (!session?.user) {
    return <div className="text-gray-500">No avatar available</div>;
  }

  const userName = session.user?.name ?? "A";
  const firstLetter = userName.charAt(0).toUpperCase();
  const userId = session.user?.id;

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
        <DropdownMenuItem onClick={() => router.push(`/user/${userId}/photos`)}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
