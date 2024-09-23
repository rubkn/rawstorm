import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubIcon, MailIcon } from "lucide-react";

export default function Authentication() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Sign up to capture and share stunning moments!
        </h1>
        <p className="text-neutral-400">
          Join our vibrant photography community today.
        </p>
      </div>
      <div className="space-y-4">
        <Input
          className="bg-neutral-900 border-neutral-800 placeholder-neutral-400"
          placeholder="name@example.com"
          type="email"
        />
        <Button className="w-full bg-white text-black hover:bg-neutral-200">
          Sign up with Email
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
