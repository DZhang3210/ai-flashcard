import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getURL = query(async (ctx, { storageId }) => {
  return await ctx.storage.getUrl(storageId as Id<"_storage">);
});
