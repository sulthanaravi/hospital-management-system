import type { AppointmentStatus, AppointmentPriority } from "./appointment";

export interface QueuePatient {
  id: number;

  tokenNumber: number;

  patientName: string;

  doctor: string;

  department: string;

  appointmentDate: string;

  appointmentTime: string;

  reason: string;

  priority: AppointmentPriority;

  status: AppointmentStatus;
}
