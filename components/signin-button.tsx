import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";

import { Mail, Twitter } from "lucide-react";

export function SignIn({ provider }: { provider: "google" | "twitter" }) {
  const providerUpperCase = `${provider[0].toUpperCase()}${provider.slice(1)}`;

  const providerIcons: Record<"google" | "twitter", React.ElementType> = {
    google: Mail,
    twitter: Twitter,
  };

  const Icon = providerIcons[provider];

  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button variant="outline" className="w-full" type="submit">
        <Icon className="mr-2 h-4 w-4" />
        {`Sign in with ${providerUpperCase}`}
      </Button>
    </form>
  );
}
