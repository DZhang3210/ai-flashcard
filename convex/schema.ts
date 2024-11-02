import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    numOwned: v.optional(v.number()),
    numLiked: v.optional(v.number()),
    numLikedByOthers: v.optional(v.number()),
    ownedSets: v.optional(v.array(v.id("sets"))),
    likedSets: v.optional(v.array(v.id("sets"))),
  }).index("email", ["email"]),
  sets: defineTable({
    name: v.string(),
    description: v.string(),
    thumbnail: v.union(v.string(), v.null()),
    creator: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
    numFlashcards: v.number(),
  })
    .index("creator", ["creator"])
    .searchIndex("name_creator", {
      searchField: "name",
      filterFields: ["creator"],
    }),
  flashcards: defineTable({
    front: v.string(),
    back: v.string(),
    set: v.id("sets"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});

export default schema;
