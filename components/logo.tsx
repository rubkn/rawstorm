import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full border-2 border-primary"></div>
        <span className="text-xl font-bold">Rawstorm</span>
      </div>
    </Link>
  );
}
