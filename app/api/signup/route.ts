import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, email, fullName, password } = await request.json();

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      username,
      email,
      fullName,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user", error: error.message },
      { status: 500 }
    );
  }
}
