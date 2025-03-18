import { SetWithFlashcards } from "@/lib/types";
import React from "react";

interface DisplayFlashcardsListProps {
  set: SetWithFlashcards | undefined;
}
const DisplayFlashcardsList = ({ set }: DisplayFlashcardsListProps) => {
  if (!set) return null;
  return (
    <div className="w-full">
      {set && set.flashcards.length > 0 && (
        <div className="w-full flex flex-col gap-4 my-10">
          <h1 className="text-xl font-bold text-font2 text-center">
            New Flashcards
          </h1>
          {set.flashcards.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-2 gap-5 border-b border-gray-400 w-full max-w-6xl mx-auto"
            >
              <div className="text-sm font-bold w-full text-right">
                {item.front}
              </div>
              <div className="text-sm w-full text-left">{item.back}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFlashcardsList;
