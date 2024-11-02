import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const useGetUser = (userId: Id<"users">) => {
  const data = useQuery(api.users.getById, { userId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
