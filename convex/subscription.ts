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

// const DAY_IN_MS = 1000 * 60 * 60 * 24;
// export const create = mutation({
//   args: {
//     userId: v.id("users"),
//     receiptUrl: v.string(),
//     currentPeriodEnd: v.number(),
//   },
//   handler: async (ctx, args) => {
//     const existingSubscription = await ctx.db
//       .query("subscriptions")
//       .withIndex("user", (q) => q.eq("user", args.userId))
//       .first();
//     if (existingSubscription) {
//       throw new Error("Subscription already exists");
//     }

//     await ctx.db.insert("subscriptions", {
//       user: args.userId,
//       expiresAt: Date.now() + args.currentPeriodEnd * 1000,
//       receiptUrl: args.receiptUrl,
//     });
//   },
// });

export const update = mutation({
  args: {
    userId: v.id("users"),
    receiptUrl: v.string(),
    extraTime: v.number(),
  },
  handler: async (ctx, args) => {
    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("user", (q) => q.eq("user", args.userId))
      .first();

    if (!existingSubscription) {
      const subscriptionId = await ctx.db.insert("subscriptions", {
        user: args.userId,
        expiresAt: Date.now() + args.extraTime * 1000,
        receiptUrl: args.receiptUrl,
      });
      return subscriptionId;
    } else {
      const subscriptionId = await ctx.db.patch(existingSubscription._id, {
        receiptUrl: args.receiptUrl,
        expiresAt:
          Math.max(existingSubscription.expiresAt, Date.now()) +
          args.extraTime * 1000,
      });
      return subscriptionId;
    }
  },
});
