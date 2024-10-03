import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import { GithubIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-zinc-400">
          Pick up where you left off and dive back into our vibrant photography
          community. Log in to continue sharing your creativity and discovering
          new inspirations.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>

        <Button type="submit" className="w-full" variant="default">
          Login
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0a] light:bg-white px-2 text-zinc-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button className="w-full" variant="outline">
              <MailIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </form>
          <Button className="w-full" variant="outline">
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
