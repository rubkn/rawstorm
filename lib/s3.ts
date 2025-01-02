import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

type File = {
  buffer: Buffer;
  originalFilename: string;
  mimetype: string;
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadToS3(file: File, user: string) {
  const bucket = process.env.S3_BUCKET_NAME;
  const photoId = crypto.randomUUID();
  const uniqueFileName = `${user}/${photoId}-${file.originalFilename}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return {
    s3Url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`,
    photoId,
  };
}

export async function spotlightPhoto() {
  const bucket = process.env.S3_BUCKET_NAME;

  const listParams = {
    Bucket: bucket,
    Delimiter: "/",
  };

  const foldersList = await s3.send(new ListObjectsV2Command(listParams));
  const folders =
    foldersList.CommonPrefixes?.map((folder) => folder.Prefix) || [];

  if (folders.length === 0) {
    throw new Error("No folders found in the bucket.");
  }

  const randomFolder = folders[Math.floor(Math.random() * folders.length)];
  const folderParams = {
    Bucket: bucket,
    Prefix: randomFolder,
  };

  const folderResponse = await s3.send(new ListObjectsV2Command(folderParams));
  const items = folderResponse.Contents?.map((content) => content.Key) || [];

  if (items.length === 0) {
    throw new Error("No photos found in the selected folder.");
  }

  const randomItem = items[Math.floor(Math.random() * items.length)];
  const userId = randomItem?.split("/")[0];
  const photoUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${randomItem}`;

  return {
    photoUrl,
    userId,
  };
}
