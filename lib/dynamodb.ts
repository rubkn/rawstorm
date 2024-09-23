import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";

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

export async function getUserPhotos(userId: string) {
  const params = {
    TableName: process.env.DYNAMODB_PHOTOS_TABLE_NAME,
    IndexName: "GSI1",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": { S: userId },
    },
  };

  return dynamoDB.send(new QueryCommand(params));
}

export async function getUserProfile(userId: string) {
  const params = {
    TableName: process.env.DYNAMODB_USERS_TABLE_NAME,
    KeyConditionExpression: "pk = :pk and begins_with(sk, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": { S: `USER#${userId}` },
      ":skPrefix": { S: "USER#" },
    },
  };

  return dynamoDB.send(new QueryCommand(params));
  /* const result = await dynamoDB.send(new QueryCommand(params));
  return result.Items?.[0] || null; */
}
