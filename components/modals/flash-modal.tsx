"use client";
import { Modal } from "@/components/ui/modal";
import React from "react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import useCreateFlashcard from "@/hooks/create-flash-hook";
import { useCreateFlashcard as createFlashcardHook } from "@/features/flashcard/api/use-create-flashcard";
import { Id } from "@/convex/_generated/dataModel";
import { useUpdateFlashcard } from "@/features/flashcard/api/use-update-flashcard";

const FlashModal = () => {
  const setModal = useCreateFlashcard();
  const [front, back] = [setModal.front, setModal.back];

  const { mutate: createFlashcard, isPending: creatingFlashcard } =
    createFlashcardHook();
  const { mutate: updateFlashcard, isPending: updatingFlashcard } =
    useUpdateFlashcard();

  const onSubmit = () => {
    if (front.trim().length === 0 || back.trim().length === 0) {
      toast.error("Please fill in both sides");
      return;
    }
    if (setModal.editMode) {
      updateFlashcard(
        {
          front,
          back,
          setId: setModal.setId as Id<"sets">,
          flashCardId: setModal.id as Id<"flashcards">,
        },
        {
          onSuccess: () => {
            setModal.setOff();
            toast.success("Flashcard Edited");
          },
          onError: () => {
            toast.error("Failed to edit flashcard");
          },
        }
      );
    } else {
      createFlashcard(
        { front, back, setId: setModal.setId as Id<"sets"> },
        {
          onSuccess: () => {
            setModal.setOff();
            toast.success("Flashcard created");
          },
          onError: () => {
            toast.error("Failed to create set");
          },
        }
      );
    }
  };

  return (
    <Modal isOpen={setModal.isOn} onClose={setModal.setOff}>
      <div className="text-3xl w-full text-center text-font4">
        {setModal.editMode ? "Edit Card" : "New Card"}
      </div>
      <div className="flex flex-col gap-y-1">
        <Label className="text-lg uppercase" htmlFor="title">
          Title
        </Label>
        <Textarea
          disabled={creatingFlashcard}
          value={front}
          onChange={(e) => setModal.setFront(e.target.value)}
          className="text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100 h-32"
          required
          name="front"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <Label className="text-lg uppercase" htmlFor="description">
          Description
        </Label>
        <Textarea
          disabled={creatingFlashcard}
          value={back}
          onChange={(e) => setModal.setBack(e.target.value)}
          className="text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100 h-32"
          required
          name="description"
        />
      </div>
      <button
        className="w-full bg-font4 text-background1 p-2 rounded-md hover:bg-font3/80 transition-all duration-100"
        onClick={onSubmit}
        disabled={creatingFlashcard || updatingFlashcard}
      >
        {creatingFlashcard || updatingFlashcard ? "Loading..." : "Create"}
      </button>
    </Modal>
  );
};

export default FlashModal;
