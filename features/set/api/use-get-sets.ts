import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const BATCH_SIZE = 5;

interface GetSetsProps {
  keyword?: string;
  userId?: Id<"users">;
}
export const useGetSets = ({ keyword, userId }: GetSetsProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.set.get,
    { keyword, userId },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
