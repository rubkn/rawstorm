import SignupForm from "@/components/signup-form";
import { spotlightPhoto } from "@/lib/s3";
import Spotlight from "@/components/spotlight-photo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Logo from "@/components/logo";

export default async function SignupPage() {
  const spotlight = await spotlightPhoto();
  const session = await auth();

  if (session) redirect("/");

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <Spotlight photoUrl={spotlight.photoUrl} userId={spotlight.userId!} />

      <section className="flex flex-col">
        <header className="flex items-center justify-between lg:justify-end p-6">
          <Logo />
        </header>

        <main className="flex flex-1 items-center justify-center p-6">
          <SignupForm />
        </main>
      </section>
    </div>
  );
}
