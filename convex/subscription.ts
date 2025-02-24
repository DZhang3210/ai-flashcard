import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const getByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("user", (q) => q.eq("user", args.userId))
      .first();
    if (!subscription) return null;
    return subscription;
  },
});

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const create = mutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    stripePriceId: v.string(),
    stripeCurrentPeriodEnd: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("user", (q) => q.eq("user", userId))
      .first();
    if (existingSubscription) {
      throw new Error("Subscription already exists");
    }

    await ctx.db.insert("subscriptions", {
      user: userId,
      expiresAt: args.stripeCurrentPeriodEnd + DAY_IN_MS,
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
      stripePriceId: args.stripePriceId,
      stripeCurrentPeriodEnd: args.stripeCurrentPeriodEnd,
    });
  },
});

export const update = mutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    stripeCurrentPeriodEnd: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("user", (q) => q.eq("user", userId))
      .first();
    if (!existingSubscription) {
      throw new Error("Subscription not found");
    }

    await ctx.db.patch(existingSubscription._id, {
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId:
        args.stripeSubscriptionId || existingSubscription.stripeSubscriptionId,
      stripePriceId: args.stripePriceId || existingSubscription.stripePriceId,
      stripeCurrentPeriodEnd:
        args.stripeCurrentPeriodEnd ||
        existingSubscription.stripeCurrentPeriodEnd,
    });
  },
});
