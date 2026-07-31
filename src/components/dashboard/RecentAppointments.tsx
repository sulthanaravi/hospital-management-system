import { Badge } from "@/components/ui/badge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import type {
    Appointment,
} from "@/types/appointment";

interface RecentAppointmentsProps {
    appointments: Appointment[];
}

export default function RecentAppointments({
    appointments,
}: RecentAppointmentsProps) {
    const recentAppointments =
        [...appointments]
            .sort(
                (a, b) =>
                    new Date(
                        `${b.appointmentDate}T${b.appointmentTime}`
                    ).getTime() -
                    new Date(
                        `${a.appointmentDate}T${a.appointmentTime}`
                    ).getTime()
            )
            .slice(0, 5);

    const getStatusClass = (
        status: Appointment["status"]
    ) => {
        switch (status) {
            case "Waiting":
                return (
                    "border-amber-200 " +
                    "bg-amber-50 " +
                    "text-amber-700"
                );

            case "Confirmed":
                return (
                    "border-blue-200 " +
                    "bg-blue-50 " +
                    "text-blue-700"
                );

            case "Completed":
                return (
                    "border-emerald-200 " +
                    "bg-emerald-50 " +
                    "text-emerald-700"
                );

            default:
                return "";
        }
    };

    const getStatusText = (
        status: Appointment["status"]
    ) => {
        if (status === "Confirmed") {
            return "In Consultation";
        }

        return status;
    };

    return (
        <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="flex flex-col gap-1 border-b px-5 py-5 sm:px-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Recent Appointments
                </h2>

                <p className="text-sm text-slate-500">
                    Latest appointment activity
                </p>
            </div>

            <div className="overflow-x-auto flex items-center justify-center">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                Patient
                            </TableHead>

                            <TableHead className="text-center">
                                Doctor
                            </TableHead>

                            <TableHead className="text-center">
                                Department
                            </TableHead>

                            <TableHead className="text-center">
                                Date & Time
                            </TableHead>

                            <TableHead className="text-center">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {recentAppointments.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-32 text-center text-slate-500"
                                >
                                    No appointments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            recentAppointments.map(
                                (appointment) => (
                                    <TableRow
                                        key={appointment.id}
                                    >
                                        <TableCell className="text-center font-medium text-slate-900">
                                            {appointment.patientName}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {appointment.doctor}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {appointment.department}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center">
                                                <span>
                                                    {
                                                        appointment.appointmentDate
                                                    }
                                                </span>

                                                <span className="text-xs text-slate-500">
                                                    {
                                                        appointment.appointmentTime
                                                    }
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    getStatusClass(
                                                        appointment.status
                                                    )
                                                }
                                            >
                                                {
                                                    getStatusText(
                                                        appointment.status
                                                    )
                                                }
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}