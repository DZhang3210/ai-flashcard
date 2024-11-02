import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const toggleLike = mutation({
  args: {
    setId: v.id("sets"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("User not found");

    const [user, set] = await Promise.all([
      ctx.db.get(userId),
      ctx.db.get(args.setId),
    ]);
    if (!user) throw new Error("User not found");
    if (!set) throw new Error("Set not found");

    const currentLike = await ctx.db
      .query("likes")
      .withIndex("user_set", (q) => q.eq("user", userId).eq("set", args.setId))
      .first();

    if (currentLike) {
      const [_like, _mutatedUser] = await Promise.all([
        ctx.db.delete(currentLike._id),
        ctx.db.patch(userId, {
          numLiked: user.numLiked ? user.numLiked - 1 : 0,
          numLikedByOthers: user.numLikedByOthers
            ? user.numLikedByOthers - 1
            : 0,
        }),
      ]);
    } else {
      const [_like, _mutatedUser] = await Promise.all([
        ctx.db.insert("likes", {
          user: userId,
          set: args.setId,
        }),
        ctx.db.patch(userId, {
          numLiked: user.numLiked ? user.numLiked + 1 : 1,
          numLikedByOthers: user.numLikedByOthers
            ? user.numLikedByOthers + 1
            : 1,
        }),
      ]);
    }
  },
});
