import { updateUserPhotoInDB } from "@/lib/dynamodb";
import { uploadToS3 } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json(
        { message: "Missing file or userId!" },
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

    const { s3Url, photoId } = await uploadToS3(fileData, userId);
    await updateUserPhotoInDB(userId, photoId, s3Url);

    return NextResponse.json(
      { message: "Photo uploaded successfully!", s3Url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading photo!", error);
    return NextResponse.json(
      { message: "Error uploading photo!", error },
      { status: 500 }
    );
  }
}
