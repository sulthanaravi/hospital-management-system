import axios from "axios";

import type { Appointment } from "@/types/appointment";

import type { AppointmentFormData } from "@/schemas/appointment.schema";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get<Appointment[]>("/appointments");

  return response.data;
};

export const createAppointment = async (
  data: AppointmentFormData,
): Promise<Appointment> => {
  const response = await api.post<Appointment>("/appointments", data);

  return response.data;
};

export const updateAppointment = async (
  id: number,
  data: AppointmentFormData,
): Promise<Appointment> => {
  const response = await api.put<Appointment>(`/appointments/${id}`, data);

  return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
  await api.delete(`/appointments/${id}`);
};
