"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import UserTabs from "./_components/user-tabs";

export default function UserProfile() {
  const { data: user, isLoading } = useCurrentUser();
  const { image, name, numOwned, numLiked, numLikedByOthers } = user ?? {};
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="px-4 py-8 w-full bg-background1 min-h-[calc(100vh-100px)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row space-y-4 gap-10 ">
          <Avatar className="h-24 w-24 md:h-28 md:w-28">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>
              {name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start h-full w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-xl font-bold md:text-2xl">{name}</h1>
              <button className="text-sm text-font1 border rounded-3xl px-2 border-font1 hover:bg-font1 hover:text-white transition-all">
                Edit
              </button>
            </div>
            <div className="flex flex-row gap-6 text-lg">
              <p>{numOwned ?? 0} owned</p>
              <p>{numLiked ?? 0} liked</p>
              <p>{numLikedByOthers ?? 0} likes</p>
            </div>
          </div>
        </div>

        <UserTabs />
      </div>
    </div>
  );
}
