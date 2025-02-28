import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    prompt: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const promptId = await ctx.db.insert("prompts", {
      prompt: args.prompt,
      userId: args.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return promptId;
  },
});

export const getByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const prompts = await ctx.db
      .query("prompts")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .collect();
    return prompts;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx, args) => {
    const prompts = await ctx.db.query("prompts").collect();
    return prompts;
  },
});
