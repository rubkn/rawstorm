import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Upload } from "lucide-react";

export default function Nav() {
  return (
    <header className="flex items-center justify-between p-6">
      <Logo />
      <div className="flex items-center space-x-4">
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
        {/* <Logout /> */}
      </div>
    </header>
  );
}
