import Nav from "@/components/nav-bar";
import { findProfileByUsername, findUserPhotos } from "@/db/queries";
import { auth } from "@/lib/auth";

export default async function UserProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const session = await auth();
  //console.log("UserProfilePage-session", session);
  const profile = await findProfileByUsername(username);
  //console.log("UserProfilePage-profile", profile);

  const photos = await findUserPhotos(
    session?.user.id || profile?.username || ""
  );

  return (
    <div>
      <Nav />
      <h1>{username}</h1>
      <img
        src={session?.user.image || "/default-avatar.png"}
        alt={`${session?.user.name}'s profile picture`}
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
