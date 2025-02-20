"use client";
import React from "react";
import { Modal } from "../ui/modal";
import useConfirm from "@/hooks/create-confirm-hook";
import { Button } from "../ui/button";
import { useDeleteFlashcard } from "@/features/flashcard/api/use-delete-flashcard";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
const ConfirmationModal = () => {
  const confirm = useConfirm();
  const { mutate: deleteFlashcard, isPending: isDeleting } =
    useDeleteFlashcard();
  const handleDelete = () => {
    deleteFlashcard({ flashCardId: confirm.id as Id<"flashcards"> });
    confirm.setDeleting(false);
    confirm.setId(null);
    toast.success("Flashcard deleted successfully");
  };
  return (
    <Modal
      isOpen={confirm.deleting}
      onClose={() => confirm.setDeleting(false)}
      className="bg-white/80 p-8"
    >
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-bold">Confirm Delete</h1>
        <p className="text-sm text-gray-800">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex flex-row gap-x-2 items-end justify-end">
          <Button variant="outline" onClick={() => confirm.setDeleting(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
