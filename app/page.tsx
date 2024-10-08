import Logo from "@/components/logo";
import Feed from "@/components/feed";
import AuthAction from "@/components/auth-action";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  if (session && !session?.user.username) redirect(`/choose-username`);

  return (
    <div className="grid min-h-screen w-full">
      <section className="flex flex-col">
        <header className="flex items-center justify-center p-6 space-x-2">
          <Logo />
          <AuthAction />
        </header>
        <main className="w-full *:flex wrap">
          <Feed />
        </main>
      </section>
    </div>
  );
}
