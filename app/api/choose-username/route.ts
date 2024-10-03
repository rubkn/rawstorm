import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { username, userId } = await request.json();

  if (!username || !userId) {
    return NextResponse.json(
      { message: "Username and User ID are required" },
      { status: 400 }
    );
  }

  try {
    const sameUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (sameUsername.length > 0) {
      return NextResponse.json(
        { message: "Username is already taken" },
        { status: 400 }
      );
    }

    await db.update(users).set({ username }).where(eq(users.id, userId));

    return NextResponse.json({ message: "Username set successfully" });
  } catch (error) {
    console.error("Error updating username.", error);
    return NextResponse.json(
      { message: "Failed to set username" },
      { status: 500 }
    );
  }
}
