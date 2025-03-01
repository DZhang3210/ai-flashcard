import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

export interface PremiumType {
  isOn: boolean;
  setIsOn: (isOn: boolean) => void;
  setIsOff: () => void;
}

const useCreatePremium = create<PremiumType>((set) => ({
  isOn: false,
  setIsOn: (isOn: boolean) => set({ isOn }),
  setIsOff: () => set({ isOn: false }),
}));

export default useCreatePremium;
