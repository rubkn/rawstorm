"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export function UserAvatar({ session }: { session: Session | null }) {
  const router = useRouter();

  if (!session?.user) {
    return <div className="text-gray-500">No avatar available</div>;
  }

  const userName = session.user.name || "A";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <Avatar onClick={() => router.push(`user/${session.user?.id}/photos`)}>
      <AvatarImage
        src={session.user.image || ""}
        alt={`${userName}'s avatar`}
      />
      <AvatarFallback>{firstLetter}</AvatarFallback>
    </Avatar>
  );
}
