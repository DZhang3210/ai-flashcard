import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";
export const createSet = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { name, description } = args;
    const setId = await ctx.db.insert("sets", {
      name,
      description,
      thumbnail: null,
      creator: userId,
      numFlashcards: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return setId;
  },
});

export const get = query({
  args: {
    userId: v.optional(v.id("users")),
    keyword: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const user = await ctx.db.get(userId);

    const keyword = args.keyword ? args.keyword?.trim()?.length > 0 : false;

    const data = args.userId
      ? keyword
        ? //Keyword + UserId
          await ctx.db
            .query("sets")
            .withSearchIndex("name_creator", (q) =>
              q
                .search("name", args.keyword as string)
                .eq("creator", args.userId as Id<"users">)
            )
            .paginate(args.paginationOpts)
        : //No Keyword + UserId
          await ctx.db
            .query("sets")
            .withIndex("creator", (q) =>
              q.eq("creator", args.userId as Id<"users">)
            )
            .paginate(args.paginationOpts)
      : keyword
        ? //Keyword + No UserId
          await ctx.db
            .query("sets")
            .withSearchIndex("name_creator", (q) =>
              q.search("name", args.keyword as string).eq("creator", userId)
            )
            .paginate(args.paginationOpts)
        : //No Keyword + No UserId
          await ctx.db
            .query("sets")
            .withIndex("creator", (q) => q.eq("creator", userId))
            .paginate(args.paginationOpts);

    const results = {
      ...data,
      page: (
        await Promise.all(
          data.page.map(async (item) => {
            const creator = await ctx.db.get(item.creator);
            if (!creator) return null;
            return {
              ...item,
              creator,
              isLiked: user?.likedSets
                ? user?.likedSets.includes(item._id)
                : false,
            };
          })
        )
      ).filter((item) => item !== null),
    };

    return results;
  },
});

export const getAll = query({
  args: {
    keyword: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const user = await ctx.db.get(userId);

    const keyword = args.keyword ? args.keyword?.trim()?.length > 0 : false;

    const data = keyword
      ? //Keyword + UserId
        await ctx.db
          .query("sets")
          .withSearchIndex("name_creator", (q) =>
            q.search("name", args.keyword as string)
          )
          .paginate(args.paginationOpts)
      : //No Keyword + UserId
        await ctx.db.query("sets").paginate(args.paginationOpts);

    const results = {
      ...data,
      page: (
        await Promise.all(
          data.page.map(async (item) => {
            const creator = await ctx.db.get(item.creator);
            if (!creator) return null;
            return {
              ...item,
              creator,
              isLiked: user?.likedSets
                ? user?.likedSets.includes(item._id)
                : false,
            };
          })
        )
      ).filter((item) => item !== null),
    };

    return results;
  },
});

export const getById = query({
  args: {
    setId: v.id("sets"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    const [flashcards, set] = await Promise.all([
      ctx.db
        .query("flashcards")
        .withIndex("set", (q) => q.eq("set", args.setId))
        .collect(),
      ctx.db.get(args.setId),
    ]);

    const user = await ctx.db.get(set?.creator as Id<"users">);

    return {
      ...set,
      creator: user,
      isLiked: false,
      flashcards,
    };
  },
});
