import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDB = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY as string,
  },
});

export async function updateUserPhotoInDB(
  userId: string,
  photoId: string,
  s3Url: string
) {
  const params = {
    TableName: process.env.DYNAMODB_PHOTOS_TABLE_NAME,
    Item: {
      userId: { S: userId },
      photoId: { S: photoId },
      photoUrl: { S: s3Url },
      uploadTimestamp: { S: new Date().toISOString() },
    },
  };

  return dynamoDB.send(new PutItemCommand(params));
}
