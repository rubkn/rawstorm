import { findPhotosByUploadDate } from "@/db/queries";
import Image from "next/image";
import Link from "next/link";

export default async function Feed() {
  const photos = await findPhotosByUploadDate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.map((photo) => (
          <Link href={`/photo/${photo.id}`} key={photo.id} className="block">
            <div className="aspect-square w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="relative w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                <Image
                  src={photo.s3Url!}
                  alt={`Photo by ${photo.username}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                  <span className="text-white text-sm font-medium">
                    @{photo.username}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
