import { FlashcardType } from "@/hooks/create-flash-hook";
import { Set } from "@/hooks/create-upload-hook";
import { FlashcardArrayType, SetWithFlashcards } from "@/lib/types";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import FlashcardArray from "react-quizlet-flashcard/dist/components/FlashcardArray/FlashcardArray";
import { UseBoundStore } from "zustand";
import { StoreApi } from "zustand";

interface FlashcardButtonResponsiveProps {
  isLoading: boolean;
  set: SetWithFlashcards;
  cards: FlashcardArrayType[];
  flipRef: React.MutableRefObject<() => void>;
  forwardRef: React.MutableRefObject<{
    nextCard: () => void;
    prevCard: () => void;
    resetArray: () => void;
  }>;
  flashcardModal: UseBoundStore<StoreApi<FlashcardType>>;
  uploadModal: UseBoundStore<StoreApi<Set>>;
  setCurrentCard: React.Dispatch<React.SetStateAction<number>>;
}

const FlashcardButtonResponsive = ({
  isLoading,
  set,
  cards,
  flipRef,
  forwardRef,
  flashcardModal,
  uploadModal,
  setCurrentCard,
}: FlashcardButtonResponsiveProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (flashcardModal.getState().isOn || uploadModal.getState().isOn) return;
      else if (event.code === "Space") {
        event.preventDefault();
        flipRef.current?.();
      } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        event.preventDefault();
        forwardRef.current?.nextCard?.();
      } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
        event.preventDefault();
        forwardRef.current?.prevCard?.();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [flashcardModal.getState().isOn, uploadModal.getState().isOn]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full items-center justify-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : set ? (
        <div className="flex w-full items-center justify-center">
          <FlashcardArray
            cards={cards as FlashcardArrayType[]}
            currentCardFlipRef={flipRef}
            forwardRef={forwardRef}
            onCardChange={(_id, index) => setCurrentCard(index)}
            FlashcardArrayStyle={{
              minWidth: "100%",
              // width: "80%",
              padding: "0 1%",
            }}
          />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center h-full">
          <p className="text-2xl text-gray-500">No flashcards found</p>
        </div>
      )}
    </>
  );
};

export default FlashcardButtonResponsive;
