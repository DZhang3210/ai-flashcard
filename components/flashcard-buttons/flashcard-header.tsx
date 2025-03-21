import { SetWithFlashcards } from "@/lib/types";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GiCycle } from "react-icons/gi";

interface FlashcardHeaderProps {
  set: SetWithFlashcards;
  currentUser: Doc<"users">;
  randomKey: number;
  setModal: any;
}

const FlashcardHeader = ({
  set,
  currentUser,
  setModal,
  randomKey,
}: FlashcardHeaderProps) => {
  const handleEdit = () => {
    setModal.setMany({
      editMode: true,
      id: set?._id,
      title: set?.name,
      description: set?.description,
      previewImage: set?.thumbnail ?? "/nijika-image.jpg",
    });
    setModal.setOn();
  };
  return (
    <div className="flex flex-row items-center justify-between mb-5 gap-4 w-full">
      <div className="flex flex-row items-center justify-center gap-4">
        <Image
          src={set?.thumbnail ?? "/nijika-image.jpg"}
          alt={"Set Image"}
          width={100}
          height={100}
          className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] rounded-lg object-cover"
        />
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-2xl font-bold text-gray-700">{set?.name}</h1>
          <p className="text-base text-gray-500">{set?.description}</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-base text-gray-500">
            {set?.flashcards.length} cards
          </p>
          {randomKey > 0 && <GiCycle className="w-6 h-6" />}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {set?.creator?._id === currentUser?._id && (
          <button
            onClick={handleEdit}
            className="text-font4 text-xl flex flex-row items-center gap-2 px-2 py-1 rounded-lg hover:bg-font4/20 transition-all duration-100 border border-font4"
          >
            <span className="text-base hidden md:block">Edit</span>
            <Edit className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FlashcardHeader;
