"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full border-2 border-primary"></div>
        <span className="text-xl font-bold">Rawstorm</span>
      </div>
    </Link>
  );
}

export default function Nav() {
  const smoothScroll = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Logo />
      <nav className="ml-auto pl-2 flex gap-4">
        <Button
          variant="link"
          className="p-0"
          onClick={() => {
            smoothScroll("features");
          }}
        >
          Features
        </Button>
        <Button
          variant="link"
          className="p-0"
          onClick={() => {
            smoothScroll("gallery");
          }}
        >
          Gallery
        </Button>
        <Button variant="link" className="p-0">
          About
        </Button>
        <Link href={"/login"}>
          <Button variant="link" className="p-0">
            Login
          </Button>
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
