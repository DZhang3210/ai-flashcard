"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useGetSet } from "@/features/set/api/use-get-set";
import useCreateFlashcard from "@/hooks/create-flash-hook";
import React, { useEffect, useRef } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";

const FlashcardPage = ({ params }: { params: { setId: Id<"sets"> } }) => {
  const { data: set } = useGetSet(params.setId);
  const flashcardModal = useCreateFlashcard();
  const flashcards = set?.flashcards;
  const cards = flashcards?.map((flashcard, index) => ({
    id: index,
    frontHTML: (
      <button
        className="text-2xl w-full h-full flex justify-center items-center cursor-pointer"
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
        className="text-2xl  w-full h-full flex justify-center items-center cursor-pointer"
        onMouseDown={(e) => {
          // Prevent text selection
          e.preventDefault();
          flipRef.current?.();
        }}
      >
        {flashcard.back}
      </button>
    ),
  }));

  const flipRef = useRef<() => void>(() => {});
  const forwardRef = useRef({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });

  useEffect(() => {
    // Don't add the event listener if the modal is open
    if (flashcardModal.isOn) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        flipRef.current?.();
      }
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        event.preventDefault();
        forwardRef.current?.nextCard?.();
      }
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        event.preventDefault();
        forwardRef.current?.prevCard?.();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [flashcardModal.isOn]);

  return (
    <div className="flex flex-col items-center p-10 h-[calc(100vh-100px)] w-full">
      <div className="">
        <FlashcardArray
          cards={cards || []}
          currentCardFlipRef={flipRef}
          forwardRef={forwardRef}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
        <button className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition">
          Edit Card
        </button>
        <button
          className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={() => flashcardModal.setOn({ setId: params.setId })}
        >
          Add Card
        </button>
        <button className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition">
          Remove Card
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
