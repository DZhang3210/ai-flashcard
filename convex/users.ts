import { auth } from "./auth";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) return null;

    return await ctx.db.get(
      identity.tokenIdentifier.split("|")[1] as Id<"users">
    );
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
