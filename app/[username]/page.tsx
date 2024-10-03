import { findUserByUsername, findUserPhotos } from "@/drizzle/db";
import { notFound } from "next/navigation";

export default async function UserProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await findUserByUsername(username);

  if (!user) {
    notFound();
  }

  const photos = await findUserPhotos(user.id);

  return (
    <div>
      <h1>{user.name || user.username}</h1>
      <img
        src={user.image || "/default-avatar.png"}
        alt={`${user.username}'s profile picture`}
      />

      <h2>Photos</h2>
      <div>
        {photos.length === 0 ? (
          <p>No photos uploaded yet.</p>
        ) : (
          photos.map((photo) => (
            <img key={photo.id} src={photo.s3Url!} alt="User photo" />
          ))
        )}
      </div>
    </div>
  );
}
