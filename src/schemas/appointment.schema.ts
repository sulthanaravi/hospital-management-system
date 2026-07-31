import { z } from "zod";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const getCurrentTime = () => {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;
};

export const appointmentSchema = z
  .object({
    patientName: z
      .string()
      .min(2, "Patient name must contain at least 2 characters"),

    doctor: z.string().min(2, "Doctor name is required"),

    department: z.string().min(2, "Department is required"),

    appointmentDate: z.string().min(1, "Appointment date is required"),

    appointmentTime: z.string().min(1, "Appointment time is required"),

    reason: z.string().min(5, "Reason must contain at least 5 characters"),

    priority: z.enum(["Low", "Medium", "High"]),

    status: z.enum(["Waiting", "Confirmed", "Completed"]),
  })
  .superRefine((data, context) => {
    const today = getToday();

    if (data.appointmentDate && data.appointmentDate < today) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["appointmentDate"],
        message: "Appointment date cannot be in the past",
      });
    }

    if (
      data.appointmentDate === today &&
      data.appointmentTime &&
      data.appointmentTime <= getCurrentTime()
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["appointmentTime"],
        message: "Appointment time must be later than the current time",
      });
    }
  });

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
