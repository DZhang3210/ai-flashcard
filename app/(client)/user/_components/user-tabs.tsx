"use client";
import { cn } from "@/lib/utils";
import { Zap, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import SetFeed from "./set-feed";
import LikedFeed from "./liked-feed";
import { SetWithCreator } from "@/lib/types";

const UserTabs = ({
  sets,
  search,
  setSearch,
  toggleCreate = false,
}: {
  sets: SetWithCreator[];
  search: string;
  setSearch: (search: string) => void;
  toggleCreate?: boolean;
}) => {
  const [tab, setTab] = useState(0);
  return (
    <div className="w-full">
      <div className="flex flex-row gap-4">
        <button
          onClick={() => setTab(0)}
          className={cn(
            "px-4 py-2 border-2 text-xl flex flex-row gap-1 text-gray-800 items-center hover:text-font2 transition-all rounded-2xl",
            tab === 0 && "border-font2 text-font2"
          )}
        >
          <Zap className="w-6 h-6" />
          Owned
        </button>
        <button
          onClick={() => setTab(1)}
          className={cn(
            "px-4 py-2 border-2 text-xl flex flex-row gap-1 text-gray-800 items-center hover:text-font3 transition-all rounded-2xl",
            tab === 1 && "border-font3 text-font3"
          )}
        >
          <ThumbsUp className="w-6 h-6" />
          Liked
        </button>
      </div>
      <div className="ml-5">
        {tab === 0 && (
          <SetFeed
            sets={sets}
            search={search}
            setSearch={setSearch}
            toggleCreate={toggleCreate}
          />
        )}
        {tab === 1 && <LikedFeed />}
      </div>
    </div>
  );
};

export default UserTabs;
