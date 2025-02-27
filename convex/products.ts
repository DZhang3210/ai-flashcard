import { v } from "convex/values";
import { query } from "./_generated/server";

export const getById = query({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    return product;
  },
});

export const getByProductName = query({
  args: {
    productName: v.string(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("name", (q) => q.eq("name", args.productName))
      .first();
    return product;
  },
});
