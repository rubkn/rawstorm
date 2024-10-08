import { db } from ".";
import { asc, eq } from "drizzle-orm";
import { photos } from "./schema";

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
  await db.insert(photos).values({
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

export const findProfileById = async (userId: string) => {
  const profile = await db.query.profiles.findFirst({
    where: (profile) => eq(profile.userId, userId),
  });

  return profile;
};

export const findProfileByUsername = async (username: string) => {
  const profile = await db.query.profiles.findFirst({
    where: (profile) => eq(profile.username, username),
  });

  return profile;
};

export const findPhotosByUploadDate = async () => {
  const photos = await db.query.photos.findMany({
    orderBy: (photo) => asc(photo.createdAt),
  });

  return photos;
};
