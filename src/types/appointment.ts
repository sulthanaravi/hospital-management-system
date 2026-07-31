export type AppointmentStatus = "Waiting" | "Confirmed" | "Completed";

export type AppointmentPriority = "Low" | "Medium" | "High";

export interface Appointment {
  id: number;

  patientName: string;

  doctor: string;

  department: string;

  appointmentDate: string;

  appointmentTime: string;

  reason: string;

  priority: AppointmentPriority;

  status: AppointmentStatus;
}
