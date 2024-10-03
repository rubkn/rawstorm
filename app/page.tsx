import Nav from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { CameraIcon, HeartIcon, ShareIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (!session?.user?.username) {
    redirect("/choose-username");
  }

  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <Nav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none
                "
                >
                  Share Your Analog Story
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Rawstorm is the premier platform for analog photography
                  enthusiasts to showcase their work, connect with others, and
                  celebrate the art of film.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="default">Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className=" w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Rawstorm?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <CameraIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Authentic Sharing</h3>
                <p className="">
                  Share your unfiltered analog photos with a community that
                  appreciates the raw beauty of film.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShareIcon className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Connect with Artists</h3>
                <p className="">
                  Engage with fellow analog enthusiasts, exchange tips, and get
                  inspired by unique perspectives.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <HeartIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Curated Collections</h3>
                <p className="">
                  Discover carefully curated galleries showcasing the best of
                  analog photography from around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join the Rawstorm Community
                </h2>
                <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up now to start sharing your analog photography with the
                  world.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button variant="default" type="submit">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs ">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs">© 2023 Rawstorm. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
