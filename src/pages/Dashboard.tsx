import AppointmentStatusChart from "@/components/dashboard/AppointmentStatusChart";
import DashboardStats from "@/components/dashboard/dashboardStats";
import RecentAppointments from "@/components/dashboard/RecentAppointments";

import { useAppointments } from "@/hooks/useAppointment";

export default function Dashboard() {
    const {
        data: appointments = [],
        isLoading,
        isError,
    } = useAppointments();

    const total =
        appointments.length;

    const waiting =
        appointments.filter(
            (appointment) =>
                appointment.status ===
                "Waiting"
        ).length;

    const inProgress =
        appointments.filter(
            (appointment) =>
                appointment.status ===
                "Confirmed"
        ).length;

    const completed =
        appointments.filter(
            (appointment) =>
                appointment.status ===
                "Completed"
        ).length;

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                Loading dashboard...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center text-red-500">
                Failed to load dashboard data.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Overview of appointments and
                    patient queue.
                </p>
            </div>

            <DashboardStats
                total={total}
                waiting={waiting}
                inProgress={inProgress}
                completed={completed}
            />
            <AppointmentStatusChart
                waiting={waiting}
                inProgress={inProgress}
                completed={completed}
            />
            <RecentAppointments
                appointments={appointments}
            />
        </div>
    );
}