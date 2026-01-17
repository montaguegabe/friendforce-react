import { useQuery } from "@tanstack/react-query";

import { dashboardApi } from "@/lib/api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardApi.stats,
  });
}

export function useStaleContacts() {
  return useQuery({
    queryKey: ["dashboard", "stale"],
    queryFn: dashboardApi.stale,
  });
}

export function useRecentContacts() {
  return useQuery({
    queryKey: ["dashboard", "recent"],
    queryFn: dashboardApi.recent,
  });
}
