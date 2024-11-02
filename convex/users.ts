import { auth } from "./auth";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) return null;

    return await ctx.db.get(userId);
  },
});

export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    if (user === null) return null;
    return await ctx.db.get(userId);
  },
});
