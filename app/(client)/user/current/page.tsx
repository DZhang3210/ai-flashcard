"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import UserTabs from "../_components/user-tabs";
import UserProfileSkeleton from "../_skeletons/user-profile-skeleton";
import { useGetSets } from "@/features/set/api/use-get-sets";
import { useState } from "react";

export default function UserProfile() {
  const { data: user, isLoading } = useCurrentUser();
  const { name, numOwned, numLiked, numLikedByOthers } = user ?? {};
  const [search, setSearch] = useState("");

  const {
    results: sets,
    status: setsStatus,
    loadMore: loadMoreSets,
  } = useGetSets({ keyword: search });

  if (isLoading) return <UserProfileSkeleton />;
  const avatarFallback = user
    ?.name!.split(" ")
    .map((part) => part[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  return (
    <div className="px-4 py-8 w-full bg-background1 min-h-[calc(100vh-100px)]">
      <div className="max-w-6xl mx-auto grid grid-cols-10 gap-10 px-6 ">
        <div className="col-span-3 flex flex-col space-y-1 gap-5">
          <Avatar className="size-[100px] hover:opacity-75 transition border-2 border-font3 hover:border-transparent mb-4">
            <AvatarFallback className="text-font3 text-3xl hover:bg-font3 transition hover:text-white">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start h-full w-full text-gray-700">
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-xl font-bold md:text-2xl">{name}</h1>
              <button className="text-sm text-font1 border rounded-3xl px-2 border-font1 hover:bg-font1 hover:text-white transition-all">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 mt-2 uppercase">
              <div className="flex flex-col items-start">
                <p className="font-bold text-lg">{numOwned ?? 0} </p>
                <p>owned</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold text-lg">{numLiked ?? 0} </p>
                <p>liked</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold text-lg">{numLikedByOthers ?? 0} </p>
                <p>likes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-7">
          <UserTabs sets={sets} search={search} setSearch={setSearch} />
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
    </div>
  );
}
