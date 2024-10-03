import { redirect } from "next/navigation";
import ChooseUsername from "@/components/choose-username-form"; // Client Component
import { auth } from "@/lib/auth";

export default async function ChooseUsernamePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.username) {
    redirect("/");
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-1">
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full border-2 border-primary"></div>
            <span className="text-xl font-bold">Rawstorm</span>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center p-6">
          <ChooseUsername userId={session.user.id!} />
        </main>
      </div>
    </div>
  );
}
