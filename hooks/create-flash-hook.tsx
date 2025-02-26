import { Id } from "@/convex/_generated/dataModel";
import { Flashcard } from "react-quizlet-flashcard";
import { create } from "zustand";

export interface FlashcardType {
  isOn: boolean;
  editMode: boolean;
  id: string;
  front: string;
  back: string;
  setId: Id<"sets"> | null;
  setMany: (values: Partial<FlashcardType>) => void;
  toggle: () => void;
  setOn: ({ setId }: { setId: Id<"sets"> }) => void;
  setOff: () => void;
  setFront: (front: string) => void;
  setBack: (back: string) => void;
}

const useCreateFlashcard = create<FlashcardType>((set) => ({
  isOn: false,
  editMode: false,
  id: "",
  front: "",
  back: "",
  setId: null,
  setMany: (values: Partial<FlashcardType>) => set(values),
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
