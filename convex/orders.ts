import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const getAllByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .collect();
    return orders;
  },
});

export const getByProductId = query({
  args: {
    id: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    return order;
  },
});

export const create = mutation({
  args: {
    productId: v.id("products"),
    pricePaidInCents: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.insert("orders", {
      productId: args.productId,
      pricePaidInCents: args.pricePaidInCents,
      userId: userId,
      createdAt: Date.now(),
    });
  },
});
