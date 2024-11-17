"use client";
import Link from "next/link";
import { FlashcardArray } from "react-quizlet-flashcard";
import { useMemo, useRef, useState } from "react";
import { AArrowDown, MoveRight } from "lucide-react";
export default function Home() {
  const flipRef = useRef<() => void>(() => {});
  const forwardRef = useRef({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });
  const [currentCard, setCurrentCard] = useState(0);
  const flashcards = [
    {
      id: 1,
      front: "What is the capital of France?",
      back: "Paris",
    },
    {
      id: 2,
      front: "What is the capital of France?",
      back: "Paris",
    },
    {
      id: 3,
      front: "What is the capital of France?",
      back: "Paris",
    },
  ];
  const cards = useMemo(
    () =>
      flashcards?.map((flashcard, index) => ({
        id: index,
        frontHTML: (
          <button
            className="text-3xl w-full h-full flex justify-center items-center cursor-pointer"
            onMouseDown={(e) => {
              // Prevent text selection
              e.preventDefault();
              flipRef.current?.();
            }}
          >
            {flashcard.front}
          </button>
        ),
        backHTML: (
          <button
            className="text-3xl  w-full h-full flex justify-center items-center cursor-pointer"
            onMouseDown={(e) => {
              // Prevent text selection
              e.preventDefault();
              flipRef.current?.();
            }}
          >
            {flashcard.back}
          </button>
        ),
      })),
    [flashcards]
  );
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-background1 flex flex-col gap-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-10 items-center py-10 space-y-6 w-full">
          <div className="flex flex-col items-center space-y-2 col-span-5 w-full">
            <h1 className="text-6xl font-bold px-5 text-center flex flex-col items-start w-full">
              <span className="text-font3 text-left">Create</span>
              <span className="text-font1 text-left">Stunning Flashcards</span>
              <span className="text-font2 text-left">in seconds</span>
              <span className="text-font4 text-left">with AI</span>
              <Link
                href={`/user/current`}
                className="mt-10 text-2xl px-8 py-4 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group"
              >
                Let&apos;s Go!
                <MoveRight className="w-8 h-8 inline-block group-hover:translate-x-2 transition-all duration-300" />
              </Link>
            </h1>
          </div>
          <div className="w-full h-full col-span-5 flex items-center justify-center">
            <FlashcardArray
              cards={cards || []}
              currentCardFlipRef={flipRef}
              forwardRef={forwardRef}
              onCardChange={(id, index) => setCurrentCard(index)}
              FlashcardArrayStyle={{
                minWidth: "80%",
                // width: "80%",
                padding: "0 3rem",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full h-[2px] bg-font3" />
          <h1 className="text-4xl font-bold">Benefits</h1>
          <div className="w-full h-[2px] bg-font3" />
          <div className="grid grid-cols-4 mt-5">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">Easy to Use</h1>
              <p className="text-gray-600">
                Our flashcards are easy to use and can be created in seconds
                with AI.
              </p>
              <AArrowDown className="w-8 h-8 text-font3" />
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">Easy to Use</h1>
              <p className="text-gray-600">
                Our flashcards are easy to use and can be created in seconds
                with AI.
              </p>
              <AArrowDown className="w-8 h-8 text-font3" />
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">Easy to Use</h1>
              <p className="text-gray-600">
                Our flashcards are easy to use and can be created in seconds
                with AI.
              </p>
              <AArrowDown className="w-8 h-8 text-font3" />
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">Easy to Use</h1>
              <p className="text-gray-600">
                Our flashcards are easy to use and can be created in seconds
                with AI.
              </p>
              <AArrowDown className="w-8 h-8 text-font3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
