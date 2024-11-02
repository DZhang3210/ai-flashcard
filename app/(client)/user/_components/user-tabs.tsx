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
    <div className="w-full mt-10">
      <div className="flex flex-row gap-4 justify-center">
        <button
          onClick={() => setTab(0)}
          className={cn(
            "px-4 py-2 border-t-2 text-2xl flex flex-row gap-1 text-black items-center hover:text-font2 transition-all",
            tab === 0 && "border-font2 text-font2"
          )}
        >
          <Zap className="w-6 h-6" />
          Flashcards
        </button>
        <button
          onClick={() => setTab(1)}
          className={cn(
            "px-4 py-2 border-t-2 text-2xl flex flex-row gap-1 text-black items-center hover:text-font3 transition-all",
            tab === 1 && "border-font3 text-font3"
          )}
        >
          <ThumbsUp className="w-6 h-6" />
          Liked
        </button>
      </div>
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
  );
};

export default UserTabs;
