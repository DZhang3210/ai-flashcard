import { Doc, Id } from "@/convex/_generated/dataModel";

export type SetWithCreator = Omit<Doc<"sets">, "creator"> & {
  creator: Doc<"users">;
  // isLiked: boolean;
};

export type SetWithFlashcards = Omit<Doc<"sets">, "creator"> & {
  creator: Doc<"users">;
  // isLiked: boolean;
  flashcards: Doc<"flashcards">[];
};

export type Flashcard = {
  _id: Id<"flashcards">;
  front: string;
  back: string;
};

export type FlashcardArrayType = {
  id: number;
  frontHTML: string;
  backHTML: string;
};
