import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export default function Authentication() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
        <p className="text-neutral-400">
          Log in to continue your journey with our vibrant photography
          community.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            className="bg-neutral-900 border-neutral-800 placeholder-neutral-400"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-neutral-400 hover:text-white"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-neutral-900 border-neutral-800 placeholder-neutral-400"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-neutral-200"
        >
          Login
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-neutral-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="w-full">
            <MailIcon className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
