import { useMemo, useState } from "react";
import {
    Pencil,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    useAppointments,
    useDeleteAppointment,
    useUpdateAppointment,
} from "@/hooks/useAppointment";

import type { Appointment } from "@/types/appointment";
import type { AppointmentFormData } from "@/schemas/appointment.schema";

import EditAppointmentDialog from "./EditAppointmentDialog";

import { useGlobalSearch } from "@/store/useGlobalSearch";

export default function AppointmentTable() {
    const {
        data: appointments = [],
        isLoading,
        isError,
    } = useAppointments();

    const deleteAppointment =
        useDeleteAppointment();

    const updateAppointment =
        useUpdateAppointment();

    // Get search text from the Header
    const search = useGlobalSearch(
        (state) => state.search
    );

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [
        selectedAppointment,
        setSelectedAppointment,
    ] = useState<Appointment | null>(
        null
    );

    const [
        editDialogOpen,
        setEditDialogOpen,
    ] = useState(false);

    const filteredAppointments =
        useMemo(() => {
            return appointments.filter(
                (appointment: Appointment) => {
                    const searchValue =
                        search
                            .trim()
                            .toLowerCase();

                    const matchesSearch =
                        appointment.patientName
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        appointment.doctor
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        appointment.department
                            .toLowerCase()
                            .includes(
                                searchValue
                            );

                    const matchesStatus =
                        statusFilter === "all" ||
                        appointment.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );
        }, [
            appointments,
            search,
            statusFilter,
        ]);

    const handleEdit = (
        appointment: Appointment
    ) => {
        setSelectedAppointment(
            appointment
        );

        setEditDialogOpen(true);
    };

    const handleUpdate = async (
        id: number,
        data: AppointmentFormData
    ) => {
        try {
            await updateAppointment.mutateAsync({
                id,
                data,
            });

            toast.success(
                "Appointment updated successfully"
            );

            setEditDialogOpen(false);
        } catch {
            toast.error(
                "Failed to update appointment"
            );
        }
    };

    const handleDelete = (appointment: Appointment) => {
        toast(
            `Are you sure you want to delete the appointment for ${appointment.patientName}?`,
            {

                action: {
                    label: "Delete",

                    onClick: async () => {
                        try {
                            await deleteAppointment.mutateAsync(
                                appointment.id
                            );

                            toast.success(
                                "Appointment deleted successfully"
                            );
                        } catch {
                            toast.error(
                                "Failed to delete appointment"
                            );
                        }
                    },
                },

                cancel: {
                    label: "Cancel",
                    onClick: () => { },
                },
            }
        );
    };

    const getStatusVariant = (
        status: Appointment["status"]
    ) => {
        switch (status) {
            case "Confirmed":
                return "default";

            case "Completed":
                return "secondary";

            case "Waiting":
                return "outline";

            default:
                return "outline";
        }
    };

    const getPriorityClass = (
        priority: Appointment["priority"]
    ) => {
        switch (priority) {
            case "High":
                return (
                    "border-red-200 " +
                    "bg-red-50 " +
                    "text-red-700"
                );

            case "Medium":
                return (
                    "border-yellow-200 " +
                    "bg-yellow-50 " +
                    "text-yellow-700"
                );

            case "Low":
                return (
                    "border-green-200 " +
                    "bg-green-50 " +
                    "text-green-700"
                );

            default:
                return "";
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-xl bg-white p-8 shadow-sm">
                <p className="text-center text-slate-500">
                    Loading appointments...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl bg-white p-8 shadow-sm">
                <p className="text-center text-red-500">
                    Failed to load appointments.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
                {/* Heading */}

                <div className="mb-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                        Appointment List
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        View, search, edit, and manage
                        appointments.
                    </p>
                </div>

                {/* Status Filter */}

                <div className="mb-6 flex justify-end">
                    <Select
                        value={statusFilter}
                        onValueChange={
                            setStatusFilter
                        }
                    >
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                All Status
                            </SelectItem>

                            <SelectItem value="Waiting">
                                Waiting
                            </SelectItem>

                            <SelectItem value="Confirmed">
                                Confirmed
                            </SelectItem>

                            <SelectItem value="Completed">
                                Completed
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Total */}

                <p className="mb-4 text-sm text-slate-500">
                    Showing{" "}

                    <span className="font-semibold text-slate-700">
                        {
                            filteredAppointments.length
                        }
                    </span>{" "}

                    appointment
                    {filteredAppointments.length !==
                        1
                        ? "s"
                        : ""}
                </p>

                {/* Responsive Table */}

                <div className="overflow-x-auto rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Patient
                                </TableHead>

                                <TableHead>
                                    Doctor
                                </TableHead>

                                <TableHead>
                                    Department
                                </TableHead>

                                <TableHead>
                                    Date
                                </TableHead>

                                <TableHead>
                                    Time
                                </TableHead>

                                <TableHead>
                                    Priority
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredAppointments.length ===
                                0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="h-32 text-center text-slate-500"
                                    >
                                        No appointments found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredAppointments.map(
                                    (
                                        appointment: Appointment
                                    ) => (
                                        <TableRow
                                            key={
                                                appointment.id
                                            }
                                        >
                                            <TableCell className="min-w-40 font-medium">
                                                {
                                                    appointment.patientName
                                                }
                                            </TableCell>

                                            <TableCell className="min-w-36">
                                                {
                                                    appointment.doctor
                                                }
                                            </TableCell>

                                            <TableCell className="min-w-36">
                                                {
                                                    appointment.department
                                                }
                                            </TableCell>

                                            <TableCell className="min-w-32">
                                                {
                                                    appointment.appointmentDate
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    appointment.appointmentTime
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        getPriorityClass(
                                                            appointment.priority
                                                        )
                                                    }
                                                >
                                                    {
                                                        appointment.priority
                                                    }
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        getStatusVariant(
                                                            appointment.status
                                                        )
                                                    }
                                                >
                                                    {
                                                        appointment.status
                                                    }
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="cursor-pointer"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleEdit(
                                                                appointment
                                                            )
                                                        }
                                                        aria-label="Edit appointment"
                                                    >
                                                        <Pencil
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        className="cursor-pointer"
                                                        disabled={
                                                            deleteAppointment.isPending
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                appointment
                                                            )
                                                        }
                                                        aria-label="Delete appointment"
                                                    >
                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                            className="text-red-500"
                                                        />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Edit Appointment Dialog */}

            <EditAppointmentDialog
                appointment={
                    selectedAppointment
                }
                open={editDialogOpen}
                onOpenChange={
                    setEditDialogOpen
                }
                onUpdate={handleUpdate}
            />
        </>
    );
}