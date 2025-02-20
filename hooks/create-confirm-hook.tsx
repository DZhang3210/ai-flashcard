import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface Confirm {
  deleting: boolean;
  setDeleting: (deleting: boolean) => void;
  id: Id<"flashcards"> | null;
  setId: (id: Id<"flashcards"> | null) => void;
}

const useConfirm = create<Confirm>((set) => ({
  deleting: false,
  setDeleting: (deleting: boolean) => set({ deleting }),
  id: null,
  setId: (id: Id<"flashcards"> | null) => set({ id }),
}));

export default useConfirm;
