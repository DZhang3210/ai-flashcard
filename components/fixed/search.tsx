"use client";
import { Search as SearchIcon } from "lucide-react";
import React, { useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { useGetSetsAll } from "@/features/set/api/use-get-sets-all";
import { Input } from "../ui/input";
import { Avatar, AvatarImage } from "../ui/avatar";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { results: sets, status: setsStatus } = useGetSetsAll({
    keyword: searchQuery || "",
  });
  // Add filters array
  // const filters = ["All", "Posts", "Comments", "Communities", "People"];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      console.log(
        "trimmedQuery",
        `/explore/${encodeURIComponent(trimmedQuery)}`
      );
      router.push(`/explore/${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery("");
    }
  };
  const handleLinkClick = (link: string) => {
    if (searchQuery.trim().length > 0) {
      router.push(link);
      setSearchQuery("");
    }
  };

  return (
    <div className="relative sm:flex-1 max-w-xl mx-4 h-1/2 rounded-full">
      {searchQuery.trim().length > 0 && setsStatus !== "LoadingFirstPage" && (
        <div
          className="absolute top-full left-0 w-full bg-gray-100 backdrop-blur-sm transform transition-all duration-200 ease-in-out origin-top
            animate-in slide-in-from-top-2 fade-in
            data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2 data-[state=closed]:fade-out"
        >
          <div className="w-full overflow-y-auto pt-5 flex-grow p-4">
            <div className="text-sm font-bold text-gray-800 mb-2">
              Recommended Sets
            </div>
            <div className="ml-1 grid grid-cols-3 gap-2">
              {sets.map((set) => (
                <div
                  key={set._id}
                  className="text-gray-700 flex items-center gap-2 rounded-lg p-2 hover:bg-gray-200 transition-all duration-200"
                >
                  <button
                    onClick={() => handleLinkClick(`/set/${set._id}`)}
                    className="w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={set.thumbnail || ""} alt={set.name} />
                      </Avatar>
                      <div className="flex flex-col gap-0 justify-center">
                        <div className="text-sm font-bold">{set.name}</div>
                        <div className="text-xs text-gray-500">
                          {set.numFlashcards} flashcards
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSearch}
        className="relative rounded-full h-full flex gap-1 px-4"
      >
        <button
          type="button"
          className="text-gray-400"
          onClick={handleSearch}
          aria-label="search-trigger"
        >
          <SearchIcon size={22} className="text-gray-700" />
        </button>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for your favorite threads!"
          className="w-full h-full text-gray-700 text-lg rounded-full placeholder:text-sm placeholder:text-gray-700 border-0 outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 block"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
      </form>
    </div>
  );
};

export default Search;
