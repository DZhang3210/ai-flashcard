"use client";
import { Modal } from "@/components/ui/modal";
import React from "react";
import useCreateSet from "@/hooks/create-set-hook";
import { useCreateSet as createSetHook } from "@/features/set/api/use-create-set";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import ImageUpload from "../image-upload";
import { useEditSet } from "@/features/set/api/use-edit-set";
import { useDeleteSet } from "@/features/set/api/use-delete-set";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

const SetModal = () => {
  const setModal = useCreateSet();

  const { mutate: createSet, isPending: creatingSet } = createSetHook();
  const { mutate: editSet, isPending: editingSet } = useEditSet();
  const { mutate: deleteSet, isPending: deletingSet } = useDeleteSet();
  const router = useRouter();
  const [title, description, image, previewImage] = [
    setModal.title,
    setModal.description,
    setModal.image,
    setModal.previewImage,
  ];

  const onSubmit = () => {
    if (title.length === 0 || description.length === 0) {
      toast.error("Please fill in all fields");
      return;
    }
    if (setModal.editMode && setModal.id) {
      if (image) {
        editSet(
          { setId: setModal.id, name: title, description, image },
          {
            onSuccess: () => {
              setModal.setOff();
              toast.success("Set updated");
            },
            onError: () => {
              toast.error("Failed to update set");
            },
          }
        );
      } else {
        editSet(
          { setId: setModal.id, name: title, description },
          {
            onSuccess: () => {
              setModal.setOff();
              toast.success("Set updated");
            },
            onError: () => {
              toast.error("Failed to create set");
            },
          }
        );
      }
    } else {
      createSet(
        { name: title, description, image: image || "" },
        {
          onSuccess: () => {
            setModal.setOff();
            toast.success("Set created");
          },
        }
      );
    }
  };
  const handleDelete = () => {
    if (setModal.id) {
      deleteSet({ setId: setModal.id }, { onSuccess: () => setModal.setOff() });
      router.push("/user/current");
    }
  };

  return (
    <Modal isOpen={setModal.isOn} onClose={setModal.setOff}>
      <div className="text-3xl w-full text-center text-font2 flex flex-row items-center justify-center gap-3">
        {setModal.editMode ? "Edit Set" : "New Set"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
        <div>
          <div className="flex flex-col gap-y-6">
            <Label className="text-lg uppercase text-font2" htmlFor="title">
              Title
            </Label>
            <Input
              disabled={creatingSet}
              value={setModal.title}
              onChange={(e) => setModal.setTitle(e.target.value)}
              type="email"
              className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
              required
              name="title"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label
              className="text-lg uppercase text-font2"
              htmlFor="description"
            >
              Description
            </Label>
            <Textarea
              disabled={creatingSet}
              value={setModal.description}
              onChange={(e) => setModal.setDescription(e.target.value)}
              className="text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100 h-32"
              required
              name="description"
            />
          </div>
        </div>

        <ImageUpload
          setImage={setModal.setImage}
          previewImage={previewImage}
          setPreviewImage={setModal.setPreviewImage}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-1">
        <button
          className="w-full bg-font2 text-background1 p-2 rounded-md hover:bg-font2/80 transition-all duration-100 grow"
          onClick={onSubmit}
          disabled={creatingSet || editingSet}
        >
          {creatingSet || editingSet
            ? "Loading..."
            : setModal.editMode
              ? "Update"
              : "Create"}
        </button>

        {setModal.editMode && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-full border border-black/20 aspect-square flex items-center justify-center rounded-lg bg-white hover:bg-black/5 transition-all duration-100">
                <EllipsisVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <button
                  onClick={handleDelete}
                  className="w-full right-0"
                  disabled={deletingSet}
                >
                  Delete
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Modal>
  );
};

export default SetModal;
