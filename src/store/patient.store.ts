import type { Patient } from "@/types/patient";
import { create } from "zustand";

interface PatientStore {
  patients: Patient[];

  addPatient: (patient: Patient) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],

  addPatient: (patient) =>
    set((state) => ({
      patients: [...state.patients, patient],
    })),
}));
