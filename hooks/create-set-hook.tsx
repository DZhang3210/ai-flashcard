import { create } from "zustand";

interface Set {
  isOn: boolean;
  editMode: boolean;
  id: string;
  title: string;
  description: string;
  logoImage: string;
  bannerImage: string;
  bannerColor: string | null;
  setMany: (values: Partial<Set>) => void;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

const useCreateSet = create<Set>((set) => ({
  isOn: false,
  editMode: false,
  id: "",
  title: "",
  description: "",
  logoImage: "",
  bannerImage: "",
  bannerColor: null,
  setMany: (values: Partial<Set>) => set(values),
  toggle: () => set((state) => ({ isOn: !state.isOn })),
  setOn: () => set({ isOn: true }),
  setOff: () =>
    set({
      isOn: false,
      editMode: false,
      title: "",
      description: "",
      logoImage: "",
      bannerImage: "",
      bannerColor: null,
      id: "",
    }),
}));

export default useCreateSet;
