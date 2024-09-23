import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AUTH_DYNAMODB_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DynamoDBAdapter(client, {
    tableName: process.env.DYNAMODB_USERS_TABLE_NAME,
    partitionKey: "pk",
    sortKey: "sk",
    indexName: "GSI1",
    indexPartitionKey: "GSI1PK",
    indexSortKey: "GSI1SK",
  }),
  pages: {
    signIn: "/signup",
  },
});
