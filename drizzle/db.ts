import "@/drizzle/env";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

export const db = drizzle(sql, { schema });

export const findUserById = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users) => eq(users.id, userId),
  });

  return user;
};

export const findUserByUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: (users) => eq(users.username, username),
  });

  return user;
};

export const insertUserPhoto = async (
  userId: string,
  photoId: string,
  s3Url: string
) => {
  await db.insert(schema.photos).values({
    id: photoId,
    userId: userId,
    s3Url: s3Url,
  });
};

export const findUserPhotos = async (userId: string) => {
  const photos = await db.query.photos.findMany({
    where: (photos) => eq(photos.userId, userId),
  });

  return photos;
};
