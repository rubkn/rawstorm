"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChooseUsername({ userId }: { userId: string }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/choose-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, userId }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.message || "Failed to set username");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Pick your unique username</h1>
        <p className="text-zinc-400">
          Your username helps others discover your content on{" "}
          <span className="font-bold text-primary">Rawstorm</span>. Make it
          memorable and personal, so it’s easy for people to find your photos
          and connect with you.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="awesome-username"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <Button type="submit" className="w-full" variant="default">
          Submit
        </Button>
      </form>
    </div>
  );
}
