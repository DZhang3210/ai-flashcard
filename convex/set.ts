import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";
export const createSet = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { name, description, image } = args;
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const setId = await ctx.db.insert("sets", {
      name,
      description,
      thumbnail: image || null,
      creator: userId,
      numFlashcards: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.patch(userId, {
      numOwned: user.numOwned ? user.numOwned + 1 : 1,
      ownedSets: user.ownedSets
        ? [...user.ownedSets, setId]
        : [setId as Id<"sets">],
    });
    return setId;
  },
});

export const editSet = mutation({
  args: {
    setId: v.id("sets"),
    name: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { name, description, image } = args;
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    let setId;
    if (image) {
      setId = await ctx.db.patch(args.setId, {
        name,
        description,
        thumbnail: image || null,
        updatedAt: Date.now(),
      });
    } else {
      setId = await ctx.db.patch(args.setId, {
        name,
        description,
        updatedAt: Date.now(),
      });
    }

    return setId;
  },
});

export const deleteSet = mutation({
  args: {
    setId: v.id("sets"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const setId = await ctx.db.delete(args.setId);
    await ctx.db.patch(userId, {
      numOwned: user.numOwned ? user.numOwned - 1 : 0,
      ownedSets: user.ownedSets?.filter((id) => id !== args.setId) || [],
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
            const [creator, thumbnail, isLiked] = await Promise.all([
              ctx.db.get(item.creator),
              item.thumbnail ? await ctx.storage.getUrl(item.thumbnail) : null,
              ctx.db
                .query("likes")
                .withIndex("user_set", (q) =>
                  q.eq("user", userId).eq("set", item._id)
                )
                .first(),
            ]);

            if (!creator) return null;
            return {
              ...item,
              creator,
              isLiked: isLiked !== null,
              thumbnail,
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
            const [creator, thumbnail, isLiked] = await Promise.all([
              ctx.db.get(item.creator),
              item.thumbnail ? await ctx.storage.getUrl(item.thumbnail) : null,
              ctx.db
                .query("likes")
                .withIndex("user_set", (q) =>
                  q.eq("user", userId).eq("set", item._id)
                )
                .first(),
            ]);
            if (!creator || item.creator === userId || item.numFlashcards <= 0)
              return null;
            return {
              ...item,
              creator,
              thumbnail,
              isLiked: isLiked !== null,
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

    const [user, thumbnail, isLiked] = await Promise.all([
      ctx.db.get(set?.creator as Id<"users">),
      set?.thumbnail ? await ctx.storage.getUrl(set.thumbnail) : null,
      ctx.db
        .query("likes")
        .withIndex("user_set", (q) =>
          q.eq("user", userId).eq("set", args.setId)
        )
        .first(),
    ]);

    return {
      ...set,
      creator: user,
      isLiked: isLiked !== null,
      thumbnail,
      flashcards,
    };
  },
});
