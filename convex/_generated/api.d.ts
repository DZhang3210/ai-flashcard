/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as flashcard from "../flashcard.js";
import type * as http from "../http.js";
import type * as likes from "../likes.js";
import type * as orders from "../orders.js";
import type * as products from "../products.js";
import type * as prompts from "../prompts.js";
import type * as set from "../set.js";
import type * as subscription from "../subscription.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  flashcard: typeof flashcard;
  http: typeof http;
  likes: typeof likes;
  orders: typeof orders;
  products: typeof products;
  prompts: typeof prompts;
  set: typeof set;
  subscription: typeof subscription;
  upload: typeof upload;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
