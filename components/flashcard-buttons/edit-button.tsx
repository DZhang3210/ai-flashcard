import { Flashcard } from "@/lib/types";
import React from "react";

interface FlashcardEditButtonProps {
  currentCard: number;
  flashcards: Flashcard[];
  flashcardModal: any;
  params: any;
}
const FlashcardEditButton = ({
  currentCard,
  flashcards,
  flashcardModal,
  params,
}: FlashcardEditButtonProps) => {
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
    if (!flashcardModal.isOpen && flashcardModal.editMode) {
      flashcardModal.toggle();
    }
  };
  return (
    <button
      className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
      onClick={handleEditFlashcard}
    >
      Edit Card
    </button>
  );
};

export default FlashcardEditButton;
