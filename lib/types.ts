import { AttributeValue } from "@aws-sdk/client-dynamodb";

export type File = {
  buffer: Buffer;
  originalFilename: string;
  mimetype: string;
};
export type DynamoDBItem = Record<string, AttributeValue>;
export type ParsedDynamoDBValue =
  | string
  | number
  | boolean
  | null
  | ParsedDynamoDBValue[]
  | { [key: string]: ParsedDynamoDBValue };
