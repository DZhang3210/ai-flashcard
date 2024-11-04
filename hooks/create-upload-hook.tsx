import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface Set {
  isOn: boolean;
  setId: Id<"sets"> | null;
  setOn: (setId: Id<"sets">) => void;
  setOff: () => void;
}

const useCreateUpload = create<Set>((set) => ({
  isOn: false,
  setId: null,
  setOn: (setId: Id<"sets">) => set({ setId, isOn: true }),
  setOff: () => set({ isOn: false, setId: null }),
}));

export default useCreateUpload;
