import { findPhotosByUploadDate } from "@/db/queries";
import Image from "next/image";

export default async function Feed() {
  const photos = await findPhotosByUploadDate();
  //console.log(photos);

  return photos.map((photo) => (
    <Image
      key={photo.id}
      src={photo.s3Url!}
      alt={photo.s3Url!}
      width={200}
      height={200}
    />
  ));
}
