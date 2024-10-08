import Nav from "@/components/profile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { findProfileByUsername, findUserPhotos } from "@/db/queries";
import { auth } from "@/lib/auth";
import { BarChart3, Heart, ImageIcon, User } from "lucide-react";

export default async function UserProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const session = await auth();
  const user = await findProfileByUsername(username);
  const photos = await findUserPhotos(session?.user.id as string);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={session?.user.image as string}
              alt={session?.user.name as string}
            />
            <AvatarFallback>
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{session?.user.name}</h1>
            <p className="text-zinc-400">
              @{user?.username} {/* • Professional Photographer */}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {/* Capturing life's moments, one click at a time. */}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Photos
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-zinc-500">+56 this month</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <User className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10.2K</div>
              <p className="text-xs text-zinc-500">+324 this week</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.6K</div>
              <p className="text-xs text-zinc-500">+1.2K this month</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Engagement Rate
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7%</div>
              <p className="text-xs text-zinc-500">+0.3% from last month</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <div>
        {photos?.map((photo) => (
          <img key={photo.id} src={photo.s3Url!} />
        ))}
      </div>
    </>
  );
}
