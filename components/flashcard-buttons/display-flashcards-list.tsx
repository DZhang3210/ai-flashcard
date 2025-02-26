import { SetWithFlashcards } from "@/lib/types";
import React from "react";

interface DisplayFlashcardsListProps {
  set: SetWithFlashcards | undefined;
}
const DisplayFlashcardsList = ({ set }: DisplayFlashcardsListProps) => {
  if (!set) return null;
  return (
    <div>
      {set && (
        <div className="w-full flex flex-col gap-4 my-10">
          <h1 className="text-xl font-bold text-font2 text-center">
            New Flashcards
          </h1>
          {set.flashcards.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-10 gap-2 border-b border-gray-400"
            >
              <div className="text-sm font-bold col-span-3">{item.front}</div>
              <div className="text-sm col-span-7">{item.back}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFlashcardsList;
