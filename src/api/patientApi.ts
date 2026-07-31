import axios from "axios";
import type { PatientFormData } from "@/schemas/patient.schema";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getPatients = async () => {
  const { data } = await api.get("/patients");
  return data;
};

export const createPatient = async (patient: PatientFormData) => {
  const { data } = await api.post("/patients", patient);
  return data;
};

export const deletePatient = async (id: number) => {
  await api.delete(`/patients/${id}`);
};

export default api;
