import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { profiles, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { username, userId } = await request.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required." },
      { status: 400 }
    );
  }

  try {
    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId));

    if (existingProfile.length > 0) {
      await db
        .update(profiles)
        .set({ username: username })
        .where(eq(profiles.userId, userId));

      await db
        .update(users)
        .set({ username: username })
        .where(eq(users.id, userId));

      return NextResponse.json({ message: "Username updated successfully." });
    }

    if (existingProfile.length === 0) {
      await db.insert(profiles).values({
        userId: userId,
        username: username,
      });

      await db
        .update(users)
        .set({ username: username })
        .where(eq(users.id, userId));

      return NextResponse.json({ message: "Profile created successfully." });
    }
  } catch (error) {
    console.error("Error creating or updating profile.", error);
    return NextResponse.json(
      { message: "Failed to create or update profile." },
      { status: 500 }
    );
  }
}
