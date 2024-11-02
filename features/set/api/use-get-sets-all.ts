import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const BATCH_SIZE = 5;

interface GetSetsProps {
  keyword?: string;
}
export const useGetSetsAll = ({ keyword }: GetSetsProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.set.getAll,
    { keyword },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
