import useCreateSet from "@/hooks/create-set-hook";
import { SetWithCreator } from "@/lib/types";
import { Plus, Search } from "lucide-react";
import React, { useMemo } from "react";
import { formatDate } from "date-fns";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToggleLike } from "@/features/likes/api/use-toggle-like";
import { cn } from "@/lib/utils";

const SetFeed = ({
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
      {!toggleCreate && (
        <button
          className="flex flex-row gap-2 px-10 py-4 rounded-full border-black/20 border-2 hover:bg-black hover:text-white transition-all hover:scale-[101%]"
          onClick={createSet.setOn}
        >
          <Plus className="w-6 h-6" />
          <p>Create Set</p>
        </button>
      )}
      {sets.map((set) => (
        <FeedItem set={set} key={set._id} />
      ))}
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
      <div className="flex flex-row gap-2 flex-1 transition hover:scale-[100.5%]">
        <Image
          src={set.thumbnail ?? "/nijika-image.jpg"}
          alt={set.name}
          width={60}
          height={60}
          className="rounded-xl overflow-hidden aspect-square object-cover w-[60px] h-[60px]"
        />
        <div>
          <p className={`text-lg font-bold flex gap-3 items-center`}>
            <Link
              href={`/set/${set._id}`}
              className={cn(`hover:text-font${borderColor}`)}
            >
              {set.name}
            </Link>
            <button
              className="font-normal text-sm right-0"
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
          <p className="text-sm">
            {formatDate(set.createdAt, "MMM d")} • {set.numFlashcards} cards •
            by <span>{set.creator.name}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Link
          href={`/user/${set.creator._id}`}
          className="text-sm hover:underline self-end mb-1"
        >
          View Profile
        </Link>
        <Button variant="outline" onClick={handleEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SetFeed;
