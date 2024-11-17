"use client";
import SetFeed from "@/app/(client)/user/_components/set-feed";
import { useGetSetsAll } from "@/features/set/api/use-get-sets-all";
import { useState } from "react";

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const {
    results: sets,
    status: setsStatus,
    loadMore: loadMoreSets,
  } = useGetSetsAll({ keyword: search });
  return (
    <div className="px-4 py-8 w-full bg-background1 min-h-[calc(100vh-100px)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-5xl font-bold uppercase text-font1">Explore</div>
        <SetFeed
          sets={sets}
          search={search}
          setSearch={setSearch}
          toggleCreate={true}
        />
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
};

export default ExplorePage;
