import {
  LayoutDashboard,
  UserPlus,
  Users,
  CalendarDays,
  BarChart3,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patient Registration",
    path: "/patients",
    icon: UserPlus,
  },
  {
    title: "Patients",
    path: "/patient-list",
    icon: Users,
  },
  {
    title: "Appointments",
    path: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Queue Management",
    path: "/queue",
    icon: Users,
  },
];
