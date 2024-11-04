import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const useGetUrl = (storageId: Id<"_storage">) => {
  const data = useQuery(api.upload.getURL, { storageId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
