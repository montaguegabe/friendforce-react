import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { remindersApi } from "@/lib/api";
import type { ReminderFormData } from "@/types/friendforce";

export function useReminders() {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: remindersApi.list,
  });
}

export function useUpcomingReminders() {
  return useQuery({
    queryKey: ["reminders", "upcoming"],
    queryFn: remindersApi.upcoming,
  });
}

export function useReminder(id: string) {
  return useQuery({
    queryKey: ["reminders", id],
    queryFn: () => remindersApi.get(id),
    enabled: !!id,
  });
}

export function useCreateReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReminderFormData) => remindersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ReminderFormData> }) =>
      remindersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}

export function useDeleteReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => remindersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useCompleteReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => remindersApi.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
