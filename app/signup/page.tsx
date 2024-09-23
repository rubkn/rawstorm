import Signup from "@/components/signup-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-8 text-white">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-white"></div>
              <span className="text-xl font-bold">Rawstorm</span>
            </div>
            <div>
              <blockquote className="mb-4 text-2xl font-bold">
                {`"`}This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.
                {`"`}
              </blockquote>
              <cite className="text-sm font-medium">Sofia Davis</cite>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-black text-white">
          <header className="flex items-center justify-between lg:justify-end p-6">
            <div className="flex items-center space-x-2 lg:hidden">
              <div className="h-8 w-8 rounded-full border-2 border-white"></div>
              <span className="text-xl font-bold">Rawstorm</span>
            </div>
            <Button variant="ghost">Login</Button>
          </header>

          <main className="flex flex-1 items-center justify-center p-6">
            <Signup />
          </main>

          <footer className="p-6 lg:hidden">
            <blockquote className="mb-2">
              {`"`}This library has saved me countless hours of work and helped
              me deliver stunning designs to my clients faster than ever before.
              {`"`}
            </blockquote>
            <cite className="text-sm">Sofia Davis</cite>
          </footer>
        </div>
      </div>
    </div>
  );
}
