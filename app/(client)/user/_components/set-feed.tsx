import useCreateSet from "@/hooks/create-set-hook";
import { SetWithCreator } from "@/lib/types";
import { Ellipsis, Search } from "lucide-react";
import React, { useMemo } from "react";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToggleLike } from "@/features/likes/api/use-toggle-like";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SetFeed = ({
  sets,
  search,
  setSearch,
}: {
  sets: SetWithCreator[];
  search: string;
  setSearch: (search: string) => void;
  toggleCreate?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="rounded-3xl  ">
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
          className="h-10 text-xl border-0 border-b border-gray-400 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
          required
          name="email"
        />
      </div>

      <div className=" gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sets.map((set) => (
          <FeedItem set={set} key={set._id} />
        ))}
      </div>
    </div>
  );
};

const FeedItem = ({ set }: { set: SetWithCreator }) => {
  const borderColor = useMemo(() => Math.floor(Math.random() * 4) + 1, []);
  const setModal = useCreateSet();
  const { mutate: toggleLike, isPending: togglingLike } = useToggleLike();

  const handleEdit = () => {
    setModal.setMany({
      editMode: true,
      id: set._id,
      title: set.name,
      description: set.description,
      previewImage: set.thumbnail ?? "/nijika-image.jpg",
    });
    setModal.setOn();
  };
  return (
    <div
      className={`flex flex-row gap-2 px-2 py-4 border-b-4 border-font${borderColor}`}
    >
      <div className="flex flex-row gap-2 flex-1 transition">
        <Image
          src={set.thumbnail ?? "/nijika-image.jpg"}
          alt={set.name}
          width={60}
          height={60}
          className="rounded-xl overflow-hidden aspect-square object-cover w-[60px] h-[60px]"
        />
        <div>
          <p className={`text-base font-bold flex gap-2 items-center`}>
            <Link
              href={`/set/${set._id}`}
              className={cn(`hover:text-font${borderColor} text-gray-600`)}
            >
              {set.name}
            </Link>
            <button
              className="font-normal text-xs right-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike({ setId: set._id });
              }}
              disabled={togglingLike}
            >
              {set.isLiked ? (
                <div className="rounded-sm border border-blue-400 bg-blue-400 px-2 text-white hover:scale-[105%] transition">
                  Liked
                </div>
              ) : (
                <div className="rounded-sm border border-black/60 px-2 hover:scale-[105%] transition">
                  like
                </div>
              )}
            </button>
          </p>
          <p className="text-xs text-gray-500">
            {set.numFlashcards} cards • by <span>{set.creator.name}</span>
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent asChild>
          <div className="flex flex-col gap-1 text-sm items-start p-2">
            <Link
              href={`/user/${set.creator._id}`}
              className="hover:underline mb-1"
            >
              View Profile
            </Link>
            <button className="hover:underline" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SetFeed;
