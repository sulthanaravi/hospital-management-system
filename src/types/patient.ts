export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  mobile: string;
  aadhaar: string;
  dob: string;
  age: number;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  address: string;
  photo?: File | null;
}
