import React from "react";

interface FlashcardAddButtonProps {
  flashcardModal: any;
  params: any;
}
const FlashcardAddButton = ({
  flashcardModal,
  params,
}: FlashcardAddButtonProps) => {
  const handleAddFlashcard = () => {
    flashcardModal.setMany({
      editMode: false,
      front: "",
      back: "",
      setId: params.setId,
    });
    flashcardModal.toggle();
  };
  return (
    <button
      className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
      onClick={handleAddFlashcard}
    >
      Add Card
    </button>
  );
};

export default FlashcardAddButton;
