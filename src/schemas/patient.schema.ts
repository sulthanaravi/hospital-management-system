import { z } from "zod";

export const patientSchema = z.object({
  patientId: z.string(),

  firstName: z.string().min(3, "First name must be at least 3 characters"),

  lastName: z.string().min(3, "Last name must be at least 3 characters"),

  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

  aadhaar: z.string().regex(/^\d{12}$/, "Invalid Aadhaar number"),

  dob: z.string(),

  age: z.number(),

  gender: z.string().min(1, "Select gender"),

  bloodGroup: z.string().min(1, "Select blood group"),

  emergencyContact: z
    .string()
    .length(10, "Emergency contact must be 10 digits"),

  address: z.string().min(10, "Address is required"),

  photo: z.any().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
