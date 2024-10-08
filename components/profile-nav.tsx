import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
//import UploadButton from "./upload";
import Upload from "./upload-button";

export default function ProfileNav() {
  return (
    <header className="flex items-center justify-between p-6">
      <Logo />
      <div className="flex items-center space-x-4">
        <Upload />
        <Button variant="ghost">Logout</Button>
      </div>
    </header>
  );
}
