import { auth } from "@/lib/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserAvatarDropdown } from "./user-avatar-dropdown";
import { findProfileById } from "@/db/queries";

export default async function AuthAction() {
  const session = await auth();
  const user = await findProfileById(session?.user.id as string);

  {
    /* <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button variant="ghost" type="submit">
            Log out
          </Button>
        </form> */
  }

  return (
    <>
      {session ? (
        <>
          <UserAvatarDropdown session={session} user={user!} />
        </>
      ) : (
        <Link href="/login">
          <Button variant="ghost">Log in</Button>
        </Link>
      )}
    </>
  );
}
