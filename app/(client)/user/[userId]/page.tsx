"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UserTabs from "../_components/user-tabs";
import UserProfileSkeleton from "../_skeletons/user-profile-skeleton";
import { useGetSets } from "@/features/set/api/use-get-sets";
import { Id } from "@/convex/_generated/dataModel";
import { useGetUser } from "@/features/auth/api/use-get-user";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useRouter } from "next/dist/client/components/navigation";

export default function UserProfile({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const router = useRouter();
  const { data: user, isLoading } = useGetUser(userId as Id<"users">);
  const { data: currentUser } = useCurrentUser();

  const { name, numOwned, numLiked, numLikedByOthers } = user ?? {};

  if (currentUser?._id === userId) {
    router.push("/user/current");
  }

  const {
    results: sets,
    status: setsStatus,
    loadMore: loadMoreSets,
  } = useGetSets({ keyword: "", userId: userId as Id<"users"> });

  if (isLoading) return <UserProfileSkeleton />;
  const avatarFallback = user
    ?.name!.split(" ")
    .map((part) => part[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  return (
    <div className="px-4 py-8 w-full bg-background1 min-h-[calc(100vh-100px)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row space-y-4 gap-10 ">
          <Avatar className="size-[100px] hover:opacity-75 transition border-2 border-font3 hover:border-transparent">
            <AvatarFallback className="text-font3 text-3xl hover:bg-font3 transition hover:text-white">
              {avatarFallback}
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

        <UserTabs sets={sets} />
        <div
          className="h-1"
          ref={(el) => {
            if (el) {
              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting && setsStatus === "CanLoadMore") {
                    loadMoreSets();
                  }
                },
                { threshold: 1.0 }
              );

              observer.observe(el);
              return () => observer.disconnect();
            }
          }}
        />
      </div>
    </div>
  );
}
