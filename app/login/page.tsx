import Login from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { spotlightPhoto } from "@/lib/s3";
import Link from "next/link";
// import Upload from "@/app/components/upload";
import Spotlight from "@/components/spotlight-photo";

export default async function LoginPage() {
  const spotlight = await spotlightPhoto();

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <Spotlight photoUrl={spotlight.photoUrl} userId={spotlight.userId!} />

      <div className="flex flex-col">
        <header className="flex items-center justify-between lg:justify-end p-6">
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="h-8 w-8 rounded-full border-2 border-primary"></div>
            <span className="text-xl font-bold">Rawstorm</span>
          </div>
          <Button variant="ghost">
            <Link href="/signup">Sign up</Link>
          </Button>
        </header>

        <main className="flex flex-1 items-center justify-center p-6">
          <Login />
        </main>
        {/* <Upload /> */}
      </div>
    </div>
  );
}
