import { auth } from "@/lib/auth";
import { uploadToS3 } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";
import { findUserById, insertUserPhoto } from "@/drizzle/db";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = session?.user?.id;

    if (!file || !userId) {
      return NextResponse.json(
        { message: "Missing file or userId." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileData = {
      buffer,
      originalFilename: file.name,
      mimetype: file.type,
    };

    const user = await findUserById(userId);
    const username = user?.username;
    const { s3Url, photoId } = await uploadToS3(fileData, username || userId);

    await insertUserPhoto(userId, photoId, s3Url);

    return NextResponse.json(
      { message: "Photo uploaded successfully.", s3Url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading photo.", error);
    return NextResponse.json(
      { message: "Error uploading photo.", error },
      { status: 500 }
    );
  }
}
