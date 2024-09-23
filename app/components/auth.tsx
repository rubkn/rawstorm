import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { WithAuth } from "@/app/hoc/with-auth";
import { UserAvatarDropdown } from "./user-avatar-dropdown";
import { Button } from "@/components/ui/button";

function Auth({ session }: { session: Session | null }) {
  return (
    <>
      {session?.user ? (
        <UserAvatarDropdown session={session} />
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit">Sign in with Google</Button>
        </form>
      )}
    </>
  );
}

export default WithAuth(Auth);
