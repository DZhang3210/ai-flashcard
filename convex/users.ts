import { auth } from "./auth";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) return null;

    let res = await ctx.db.get(
      identity.tokenIdentifier.split("|")[1] as Id<"users">
    );
    const subscription = await ctx.db
      .query("subscriptions")
      .filter((q) => q.eq(q.field("user"), res?._id))
      .first();
    if (subscription?.expiresAt && subscription.expiresAt > Date.now()) {
      return { ...res, isSubscribed: true };
    } else {
      return { ...res, isSubscribed: false };
    }
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

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) return false;
    const user = await ctx.db.get(
      identity.tokenIdentifier.split("|")[1] as Id<"users">
    );
    return user?.email === "dz2188@nyu.edu";
  },
});
