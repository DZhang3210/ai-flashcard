import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

export interface Set {
  isOn: boolean;
  editMode: boolean;
  id: Id<"sets"> | null;
  title: string;
  description: string;
  image: string | null;
  previewImage: string | null;
  setMany: (values: Partial<Set>) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: string) => void;
  setPreviewImage: (previewImage: string | null) => void;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

const useCreateSet = create<Set>((set) => ({
  isOn: false,
  editMode: false,
  id: null,
  title: "",
  description: "",
  image: null,
  previewImage: null,
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setImage: (image: string) => set({ image }),
  setPreviewImage: (previewImage: string | null) => set({ previewImage }),
  setMany: (values: Partial<Set>) => set(values),
  toggle: () => set((state) => ({ isOn: !state.isOn })),
  setOn: () => set({ isOn: true }),
  setOff: () =>
    set({
      isOn: false,
      editMode: false,
      title: "",
      description: "",
      image: null,
      previewImage: null,
      id: null,
    }),
}));

export default useCreateSet;
