"use client";
import React from "react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import useCreateFlashcard from "@/hooks/create-flash-hook";
import { useCreateFlashcard as createFlashcardHook } from "@/features/flashcard/api/use-create-flashcard";
import { Id } from "@/convex/_generated/dataModel";
import { useUpdateFlashcard } from "@/features/flashcard/api/use-update-flashcard";
import { motion } from "framer-motion";
import { CiCircleInfo } from "react-icons/ci";

const SetDrawer = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full border-2 border-green-500 p-5 flex flex-col gap-y-4"
    >
      <div className="text-3xl w-full text-font4">
        {setModal.editMode ? "Edit Card" : "New Card"}
      </div>

      <div className="flex flex-col gap-y-1 mt-5">
        <Label className="text-lg uppercase " htmlFor="title">
          Title
        </Label>
        <Textarea
          disabled={creatingFlashcard}
          value={front}
          onChange={(e) => setModal.setFront(e.target.value)}
          className="text-lg rounded-lg"
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
          className="text-lg rounded-lg h-40"
          required
          name="description"
        />
      </div>
      <div className="flex flex-row items-center justify-end gap-x-2 text-xs mt-4">
        <button
          className=" bg-gray-400 text-background1 px-4 py-1 rounded-md hover:bg-gray-400/80 transition-all duration-100"
          onClick={() => setModal.setOff()}
        >
          Cancel
        </button>
        <button
          className=" bg-font4 text-background1 px-4 py-1 rounded-md hover:bg-font3/80 transition-all duration-100"
          onClick={onSubmit}
          disabled={creatingFlashcard || updatingFlashcard}
        >
          {creatingFlashcard || updatingFlashcard
            ? "Loading..."
            : setModal.editMode
              ? "Edit"
              : "Create"}
        </button>
      </div>
      <div className="text-sm text-gray-500 flex flex-row items-center gap-x-1">
        <CiCircleInfo className="w-4 h-4" />
        Keyboard Controls disabled while this window is open
      </div>
    </motion.div>
  );
};

export default SetDrawer;
