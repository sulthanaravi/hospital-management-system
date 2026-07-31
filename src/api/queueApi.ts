import axios from "axios";

import type { QueuePatient } from "@/types/queue";

import type { AppointmentStatus } from "@/types/appointment";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getQueuePatients = async (): Promise<QueuePatient[]> => {
  const response = await api.get<QueuePatient[]>("/appointments");

  return response.data;
};

export const updateQueueStatus = async (
  id: number,
  status: AppointmentStatus,
): Promise<QueuePatient> => {
  const response = await api.patch<QueuePatient>(
    `/appointments/${id}`,

    {
      status,
    },
  );

  return response.data;
};
