/* eslint-disable @next/next/no-img-element */
import { getUserPhotos } from "@/lib/dynamodb";

interface DynamoDBAttribute {
  S?: string;
  N?: string;
  BOOL?: boolean;
}

interface Photo {
  photoId: DynamoDBAttribute;
  userId: DynamoDBAttribute;
  uploadTimestamp: DynamoDBAttribute;
  photoUrl: DynamoDBAttribute;
}

export default async function UserPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const userId = params.id;
    console.log(userId);
    const data = await getUserPhotos(userId);
    console.log(data);

    if (!data?.Items || data.Items.length === 0) {
      return (
        <div>
          <h1>No photos found for this user</h1>
        </div>
      );
    }

    const photos: Photo[] = data.Items.map(
      (item: Record<string, DynamoDBAttribute>) => ({
        photoId: item.photoId,
        userId: item.userId,
        uploadTimestamp: item.uploadTimestamp,
        photoUrl: item.photoUrl,
      })
    );

    return (
      <div>
        <h1>Photos for User: {userId}</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {photos.map((photo) => (
            <div key={photo.photoId.S} style={{ margin: "10px" }}>
              <img
                src={photo.photoUrl.S}
                alt={`Photo uploaded on ${photo.uploadTimestamp.S}`}
                width={200}
                height={200}
              />
              <p>Uploaded on: {photo.uploadTimestamp.S}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user photos!", error);

    return (
      <div>
        <h1>Error fetching user photos!</h1>
      </div>
    );
  }
}
