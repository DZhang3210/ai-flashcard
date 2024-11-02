"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useDeleteFlashcard } from "@/features/flashcard/api/use-delete-flashcard";
import { useGetSet } from "@/features/set/api/use-get-set";
import useCreateFlashcard from "@/hooks/create-flash-hook";
import { Ellipsis } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { toast } from "sonner";

const FlashcardPage = ({ params }: { params: { setId: Id<"sets"> } }) => {
  const { data: set, isLoading } = useGetSet(params.setId);
  const flashcardModal = useCreateFlashcard();
  // const setModal = useCreateSet();
  const { mutate: deleteFlashcard, isPending: isDeleting } =
    useDeleteFlashcard();
  const flashcards = useMemo(() => set?.flashcards || [], [set]);
  const cards = useMemo(
    () =>
      flashcards?.map((flashcard, index) => ({
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
      })),
    [flashcards]
  );
  const flipRef = useRef<() => void>(() => {});
  const forwardRef = useRef({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });

  const handleEditFlashcard = () => {
    if (currentCard - 1 < 0 || currentCard - 1 > flashcards?.length) return;
    const currentFlashcard = flashcards?.[currentCard - 1];
    if (!currentFlashcard) return;
    flashcardModal.setMany({
      editMode: true,
      front: currentFlashcard.front,
      back: currentFlashcard.back,
      id: currentFlashcard._id,
      setId: params.setId,
    });
    flashcardModal.toggle();
  };
  const handleDeleteFlashcard = () => {
    if (currentCard - 1 < 0 || currentCard - 1 > flashcards?.length) return;
    const currentFlashcard = flashcards?.[currentCard - 1];
    if (!currentFlashcard) return;
    deleteFlashcard(
      { flashCardId: currentFlashcard._id },
      {
        onSuccess: () => {
          toast.success("Flashcard deleted");
        },
        onError: () => {
          toast.error("Failed to delete flashcard");
        },
      }
    );
  };
  // const handleEditSet = () => {
  //   setModal.setMany({
  //     title: set?.name,
  //     description: set?.description,
  //   });
  // };

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

  useEffect(() => {
    if (flashcards.length <= 0 && !flashcardModal.isOn && !isLoading) {
      flashcardModal.setOn({ setId: params.setId });
    }
  }, [
    flashcards,
    flashcardModal.isOn,
    isLoading,
    params.setId,
    flashcardModal,
  ]);

  const [currentCard, setCurrentCard] = useState(1);

  if (!set && !isLoading) return <div>Set not found</div>;

  return (
    <div className="flex flex-col items-center p-10 h-[calc(100vh-100px)] w-full">
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="text-4xl font-bold">{set?.name}</h1>
        <p className="text-xl text-gray-500">{set?.description}</p>
      </div>
      <div className="flex">
        <FlashcardArray
          cards={cards || []}
          currentCardFlipRef={flipRef}
          forwardRef={forwardRef}
          onCardChange={(id, index) => setCurrentCard(index)}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
        <button
          className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={handleEditFlashcard}
        >
          Edit Card
        </button>
        <button
          className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={() => flashcardModal.setOn({ setId: params.setId })}
        >
          Add Card
        </button>
        <button
          className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={handleDeleteFlashcard}
          disabled={isDeleting}
        >
          Remove Card
        </button>
        <button
          className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={() => {}}
          disabled={isDeleting}
        >
          <Ellipsis className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
