import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "@/api/appointmentApi";

import type { Appointment } from "@/types/appointment";

import type { AppointmentFormData } from "@/schemas/appointment.schema";

export function useAppointments() {
  return useQuery<Appointment[], Error>({
    queryKey: ["appointments"],

    queryFn: getAppointments,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<Appointment, Error, AppointmentFormData>({
    mutationFn: createAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}

interface UpdateAppointmentData {
  id: number;

  data: AppointmentFormData;
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<Appointment, Error, UpdateAppointmentData>({
    mutationFn: ({ id, data }) => updateAppointment(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}
