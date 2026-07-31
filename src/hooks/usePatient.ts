import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getPatients, createPatient, deletePatient } from "@/api/patientApi";

import type { PatientFormData } from "@/schemas/patient.schema";

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patient: PatientFormData) => createPatient(patient),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePatient(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
};
