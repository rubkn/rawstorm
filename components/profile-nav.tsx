import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import UploadButton from "./upload-button";
import { LogOutIcon } from "lucide-react";

export default function ProfileNav() {
  return (
    <header className="flex items-center justify-between p-6">
      <Logo />
      <div className="flex items-center space-x-4">
        <UploadButton />
        <Button variant="ghost">
          <LogOutIcon className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
