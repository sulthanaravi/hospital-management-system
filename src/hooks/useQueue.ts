import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getQueuePatients, updateQueueStatus } from "@/api/queueApi";

import type { QueuePatient } from "@/types/queue";

import type { AppointmentStatus } from "@/types/appointment";

export function useQueue() {
  return useQuery<QueuePatient[], Error>({
    queryKey: ["queue"],

    queryFn: getQueuePatients,
  });
}

interface UpdateQueueStatusData {
  id: number;

  status: AppointmentStatus;
}

export function useUpdateQueueStatus() {
  const queryClient = useQueryClient();

  return useMutation<QueuePatient, Error, UpdateQueueStatusData>({
    mutationFn: ({ id, status }) => updateQueueStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queue"],
      });

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}
