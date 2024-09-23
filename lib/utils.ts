import { DynamoDBItem, ParsedDynamoDBValue } from "./types";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function parseDynamoDBValue(value: AttributeValue): ParsedDynamoDBValue {
  if (value.S !== undefined) return value.S;
  if (value.N !== undefined) return Number(value.N);
  if (value.BOOL !== undefined) return value.BOOL;
  if (value.NULL !== undefined) return null;
  if (value.L !== undefined) return value.L.map(parseDynamoDBValue);
  if (value.M !== undefined) return transformDynamoDBItem(value.M);
  if (value.B !== undefined) return value.B.toString();
  throw new Error(`Unsupported DynamoDB type: ${Object.keys(value)[0]}`);
}

export function transformDynamoDBItem(
  item: DynamoDBItem
): Record<string, ParsedDynamoDBValue> {
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => [key, parseDynamoDBValue(value)])
  );
}
