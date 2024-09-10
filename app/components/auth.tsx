/* eslint-disable @next/next/no-img-element */
import { signIn, signOut } from "@/lib/auth";
import { Session } from "next-auth";
import { WithAuth } from "../hoc/with-auth";

function Auth({ session }: { session: Session | null }) {
  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Sign in with Google</button>
      </form>
    );
  }

  return (
    <div>
      {session.user.image ? (
        <img src={session.user.image} alt="User Avatar" />
      ) : (
        <div>No avatar available</div>
      )}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}

export default WithAuth(Auth);
