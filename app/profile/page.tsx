import { auth } from "@/lib/auth";
import { getUserProfile } from "@/lib/dynamodb";
import { transformDynamoDBItem } from "@/lib/utils";

export default async function Profile() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not authenticated");

  const { Items } = await getUserProfile(session.user.id);
  if (!Items?.length) throw new Error("User profile not found");

  const userProfile = transformDynamoDBItem(Items[0]);
  console.log("Session:", session);
  console.log("User Profile:", userProfile);

  return <div>Profile</div>;
}
