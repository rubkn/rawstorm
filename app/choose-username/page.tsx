import { redirect } from "next/navigation";
import ChooseUsernameForm from "@/components/choose-username-form";
import { auth } from "@/lib/auth";
//import { findProfileById } from "@/db/queries";
import Logo from "@/components/logo";

export default async function ChooseUsernamePage() {
  const session = await auth();
  //const user = await findProfileById(session?.user.id as string);

  //if (!session) redirect("/");
  if (session?.user?.username) redirect(`/${session.user.username}`);

  return (
    <div className="grid min-h-screen w-full grid-cols-1">
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-6">
          <Logo />
        </header>

        <main className="flex flex-1 items-center justify-center p-6">
          <ChooseUsernameForm session={session} />
        </main>
      </div>
    </div>
  );
}
