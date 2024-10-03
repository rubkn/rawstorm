import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubIcon, MailIcon } from "lucide-react";

export default function Signup() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Sign up to capture and share your best shots!
        </h1>
        <p className="text-zinc-400">
          Become part of a passionate photography community. Sign up now to
          showcase your creativity and discover new inspirations.
        </p>
      </div>
      <div className="space-y-4">
        <Input placeholder="name@example.com" type="email" />
        <Button variant="default" className="w-full">
          Sign up with Email
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
          <Button variant="outline" className="w-full">
            <MailIcon className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
