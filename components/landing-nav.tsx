"use client";

import React from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingNav() {
  const smoothScroll = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="p-6 flex items-center">
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

        <Link href="/login">
          <Button variant="secondary">Join us</Button>
        </Link>
      </nav>
    </header>
  );
}
