/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

export function Avatar({ image, userId }: { image: string; userId: string }) {
  const router = useRouter();

  return (
    <img
      src={image}
      alt="User Avatar"
      onClick={() => router.push(`user/${userId}/photos`)}
    />
  );
}
