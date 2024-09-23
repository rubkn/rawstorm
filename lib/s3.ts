import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { File } from "./types";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadToS3(file: File, userId: string) {
  const photoId = uuidv4();
  const uniqueFileName = `${userId}/${photoId}-${file.originalFilename}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return {
    s3Url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`,
    photoId,
  };
}
