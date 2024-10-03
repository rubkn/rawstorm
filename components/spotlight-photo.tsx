import Image from "next/image";
import { Logo } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SpotlightPhoto({
  photoUrl,
  userId,
}: {
  photoUrl: string;
  userId: string;
}) {
  return (
    <aside className="relative hidden lg:block h-full">
      <Image
        alt="test"
        width={2000}
        height={2000}
        src={photoUrl}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-between p-8">
        <Logo />
        <Link href={`/${userId}`}>
          <Button variant="outline" className="w-fit">
            {`@${userId}`}
          </Button>
        </Link>
      </div>
    </aside>
  );
}