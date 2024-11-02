import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface Flashcard {
  isOn: boolean;
  editMode: boolean;
  id: string;
  front: string;
  back: string;
  setId: Id<"sets"> | null;
  setMany: (values: Partial<Flashcard>) => void;
  toggle: () => void;
  setOn: ({ setId }: { setId: Id<"sets"> }) => void;
  setOff: () => void;
  setFront: (front: string) => void;
  setBack: (back: string) => void;
}

const useCreateFlashcard = create<Flashcard>((set) => ({
  isOn: false,
  editMode: false,
  id: "",
  front: "",
  back: "",
  setId: null,
  setMany: (values: Partial<Flashcard>) => set(values),
  toggle: () => set((state) => ({ isOn: !state.isOn })),
  setOn: ({ setId }: { setId: Id<"sets"> }) => set({ isOn: true, setId }),
  setOff: () =>
    set({
      isOn: false,
      editMode: false,
      id: "",
      front: "",
      back: "",
      setId: null,
    }),
  setFront: (front: string) => set({ front }),
  setBack: (back: string) => set({ back }),
}));

export default useCreateFlashcard;
