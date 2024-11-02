"use client";
import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";
import useCreateSet from "@/hooks/create-set-hook";
import { useCreateSet as createSetHook } from "@/features/set/api/use-create-set";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const SetModal = () => {
  const setModal = useCreateSet();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: createSet, isPending: creatingSet } = createSetHook();

  const onSubmit = () => {
    if (title.length === 0 || description.length === 0) {
      toast.error("Please fill in all fields");
      return;
    }
    createSet(
      { name: title, description },
      {
        onSuccess: () => {
          setModal.setOff();
        },
        onError: () => {
          toast.error("Failed to create set");
        },
      }
    );
  };

  return (
    <Modal isOpen={setModal.isOn} onClose={setModal.setOff}>
      <div className="text-3xl w-full text-center text-font3">New Set</div>
      <div className="flex flex-col gap-y-1">
        <Label className="text-lg uppercase" htmlFor="title">
          Title
        </Label>
        <Input
          disabled={creatingSet}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="email"
          className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
          required
          name="title"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <Label className="text-lg uppercase" htmlFor="description">
          Description
        </Label>
        <Textarea
          disabled={creatingSet}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100 h-32"
          required
          name="description"
        />
      </div>
      <button
        className="w-full bg-font3 text-background1 p-2 rounded-md hover:bg-font3/80 transition-all duration-100"
        onClick={onSubmit}
      >
        Create
      </button>
    </Modal>
  );
};

export default SetModal;
