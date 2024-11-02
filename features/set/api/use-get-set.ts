import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const useGetSet = (setId: Id<"sets">) => {
  console.log(setId);
  const data = useQuery(api.set.getById, { setId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
