import useCreateSet from "@/hooks/create-set-hook";
import { SetWithCreator } from "@/lib/types";
import { Plus, Search } from "lucide-react";
import React, { useMemo } from "react";
import { formatDate } from "date-fns";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SetFeed = ({
  sets,
  search,
  setSearch,
}: {
  sets: SetWithCreator[];
  search: string;
  setSearch: (search: string) => void;
}) => {
  const createSet = useCreateSet();
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="p-4 rounded-3xl  ">
        <Label
          className="text-xl uppercase flex flex-row gap-2 items-center"
          htmlFor="search"
        >
          Search By Name <Search className="w-6 h-6" />
        </Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="email"
          className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
          required
          name="email"
        />
      </div>

      <div className=" mt-8 text-lg uppercase">Flashcards</div>
      <button
        className="flex flex-row gap-2 px-10 py-4 rounded-full border-black/20 border-2 hover:bg-black hover:text-white transition-all hover:scale-[101%]"
        onClick={createSet.setOn}
      >
        <Plus className="w-6 h-6" />
        <p>Create Set</p>
      </button>
      {sets.map((set) => (
        <FeedItem set={set} key={set._id} />
      ))}
    </div>
  );
};

const FeedItem = ({ set }: { set: SetWithCreator }) => {
  const borderColor = useMemo(() => Math.floor(Math.random() * 4) + 1, []);
  return (
    <div
      className={`flex flex-row gap-2 px-2 py-4 border-b-4 border-font${borderColor}`}
    >
      <Link
        href={`/set/${set._id}`}
        className="flex flex-row gap-2 flex-1 transition hover:scale-[101%]"
      >
        <Image
          src={set.thumbnail ?? "/nijika-image.jpg"}
          alt={set.name}
          width={60}
          height={60}
          className="rounded-3xl"
        />
        <div>
          <p className={`text-lg font-bold hover:text-font${borderColor}`}>
            {set.name}
          </p>
          <p className="text-sm">
            {formatDate(set.createdAt, "MMM d")} • {set.numFlashcards} cards •
            by <span>{set.creator.name}</span>
          </p>
        </div>
      </Link>
      <Link
        href={`/user/${set.creator._id}`}
        className="text-sm hover:underline self-end mb-1"
      >
        View Profile
      </Link>
    </div>
  );
};

export default SetFeed;
