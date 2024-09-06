import { signIn, signOut, auth } from "@/lib/auth";

export default async function Auth() {
  const session = await auth(); // Fetch the session on the server side

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
      <img src={session.user.image} alt="User Avatar" />
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
