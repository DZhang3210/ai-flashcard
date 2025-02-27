import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useIsAdmin = () => {
  const data = useQuery(api.users.isAdmin);
  const isLoading = data === undefined;

  return { data, isLoading };
};
