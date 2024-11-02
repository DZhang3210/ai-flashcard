import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const createFlashcard = mutation({
  args: {
    front: v.string(),
    back: v.string(),
    setId: v.id("sets"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { front, back, setId } = args;
    const set = await ctx.db.get(setId);
    if (!set) {
      throw new Error("Set not found");
    }

    const [_updatedSet, flashCardId] = await Promise.all([
      ctx.db.patch(setId, {
        numFlashcards: set?.numFlashcards + 1,
      }),
      ctx.db.insert("flashcards", {
        front,
        back,
        set: setId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
    ]);

    return flashCardId;
  },
});
