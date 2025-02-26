import React from "react";
import { Flashcard } from "./types";
import { shuffleArray } from "./utils";

export function processFlashcards(
  flashcards: Flashcard[],
  randomKey: number,
  setRandomKey: React.Dispatch<React.SetStateAction<number>>,
  flipRef: React.RefObject<() => void>,
  forwardRef: React.RefObject<{ resetArray: () => void }>
) {
  // Only shuffle if we have a randomKey greater than 0
  const cardsToUse = randomKey > 0 ? shuffleArray(flashcards) : flashcards;

  // Create the array of regular cards
  const regularCards =
    cardsToUse?.map((flashcard, index) => ({
      id: index,
      frontHTML: (
        <button
          className="text-2xl w-full h-full flex justify-center items-center cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            flipRef.current?.();
          }}
        >
          {flashcard.front}
        </button>
      ),
      backHTML: (
        <button
          className="text-2xl w-full h-full flex justify-center items-center cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            flipRef.current?.();
          }}
        >
          {flashcard.back}
        </button>
      ),
    })) || [];

  // Add the completion card
  return [
    ...regularCards,
    {
      id: regularCards.length,
      frontHTML: (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <h2 className="text-3xl font-bold text-font4">Congratulations!</h2>
          <p className="text-xl text-gray-600">
            You&apos;ve completed all flashcards
          </p>
          <button
            className="px-4 py-2 bg-font4 text-white rounded-lg hover:bg-font4/80 transition-all"
            onMouseDown={(e) => {
              e.preventDefault();
              flipRef.current?.();
            }}
          >
            Click to celebrate! 🎉
          </button>
        </div>
      ),
      backHTML: (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <h2 className="text-3xl font-bold text-font4">Well done! 🌟</h2>
          <p className="text-xl text-gray-600">Ready for another round?</p>
          <button
            className="px-4 py-2 bg-font4 text-white rounded-lg hover:bg-font4/80 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setRandomKey((prev) => prev + 1);
              forwardRef.current?.resetArray();
            }}
          >
            Shuffle and start over
          </button>
        </div>
      ),
    },
  ];
}

//   return <div></div>;
// };

// export default ProcessFlashcards;
