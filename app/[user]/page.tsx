import ProfileNav from "@/components/profile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { findProfileByUsername, findUserPhotos } from "@/db/queries";
import { auth } from "@/lib/auth";
import { BarChart3, Heart, ImageIcon, User } from "lucide-react";

export default async function UserProfilePage({
  params: { user },
}: {
  params: { user: string };
}) {
  const session = await auth();
  const profile = await findProfileByUsername(user);
  const photos = await findUserPhotos(session?.user.id as string);

  if (!profile) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold text-red-500">User not found.</h1>
        <p className="text-lg">
          The user @{user} does not exist. Please check the username or try
          searching for someone else.
        </p>
      </main>
    );
  }

  return (
    <>
      <header>
        <ProfileNav />
      </header>
      <main className="p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={session?.user.image as string}
              alt={session?.user.name as string}
            />
            <AvatarFallback>
              {profile?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{session?.user.name}</h1>
            <p className="text-zinc-400">
              @{profile?.username} {/* bio */}
            </p>
            <p className="mt-2 text-sm">{/* description */}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Photos
              </CardTitle>
              <ImageIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs">+56 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <User className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10.2K</div>
              <p className="text-xs">+324 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.6K</div>
              <p className="text-xs">+1.2K this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Engagement Rate
              </CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7%</div>
              <p className="text-xs">+0.3% from last month</p>
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
