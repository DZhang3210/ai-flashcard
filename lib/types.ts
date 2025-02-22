import { Doc } from "@/convex/_generated/dataModel";

export type SetWithCreator = Omit<Doc<"sets">, "creator"> & {
  creator: Doc<"users">;
  // isLiked: boolean;
};

export type SetWithFlashcards = Omit<Doc<"sets">, "creator"> & {
  creator: Doc<"users">;
  // isLiked: boolean;
  flashcards: Doc<"flashcards">[];
};
