import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
    appointmentSchema,
    type AppointmentFormData,
} from "@/schemas/appointment.schema";

import type { Appointment } from "@/types/appointment";

interface EditAppointmentDialogProps {
    appointment: Appointment | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: (
        id: number,
        data: AppointmentFormData
    ) => Promise<void>;
}

export default function EditAppointmentDialog({
    appointment,
    open,
    onOpenChange,
    onUpdate,
}: EditAppointmentDialogProps) {
    const form = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            patientName: "",
            doctor: "",
            department: "",
            appointmentDate: "",
            appointmentTime: "",
            reason: "",
            priority: "Low",
            status: "Waiting",
        },
    });

    useEffect(() => {
        if (appointment) {
            form.reset({
                patientName: appointment.patientName,
                doctor: appointment.doctor,
                department: appointment.department,
                appointmentDate:
                    appointment.appointmentDate,
                appointmentTime:
                    appointment.appointmentTime,
                reason: appointment.reason,
                priority: appointment.priority,
                status: appointment.status,
            });
        }
    }, [appointment, form]);

    const onSubmit = async (
        data: AppointmentFormData
    ) => {
        if (!appointment) return;

        try {
            await onUpdate(
                appointment.id,
                data
            );

            onOpenChange(false);
        } catch (error) {
            console.error(
                "Failed to update appointment:",
                error
            );
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Appointment
                    </DialogTitle>

                    <DialogDescription>
                        Update the appointment details
                        and save the changes.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit
                        )}
                        className="space-y-5"
                    >
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Patient Name */}

                            <FormField
                                control={
                                    form.control
                                }
                                name="patientName"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Patient Name
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter patient name"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Doctor */}

                            <FormField
                                control={
                                    form.control
                                }
                                name="doctor"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Doctor
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter doctor name"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Department */}

                            <FormField
                                control={
                                    form.control
                                }
                                name="department"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Department
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter department"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Appointment Date */}

                            <FormField
                                control={
                                    form.control
                                }
                                name="appointmentDate"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Appointment Date
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Appointment Time */}

                            <FormField
                                control={
                                    form.control
                                }
                                name="appointmentTime"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Appointment Time
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Priority */}

                            <FormField
                                control={
                                    form.control
                                }
                                name="priority"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Priority
                                        </FormLabel>

                                        <Select
                                            value={
                                                field.value
                                            }
                                            onValueChange={
                                                field.onChange
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value="Low">
                                                    Low
                                                </SelectItem>

                                                <SelectItem value="Medium">
                                                    Medium
                                                </SelectItem>

                                                <SelectItem value="High">
                                                    High
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Status */}

                            <FormField
                                control={
                                    form.control
                                }
                                name="status"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Status
                                        </FormLabel>

                                        <Select
                                            value={
                                                field.value
                                            }
                                            onValueChange={
                                                field.onChange
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
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

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Reason */}

                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Reason
                                    </FormLabel>

                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter the reason for the appointment"
                                            className="min-h-24 resize-none"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Buttons */}

                        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    onOpenChange(
                                        false
                                    )
                                }
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                            >
                                Save Changes
                            </Button>

                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
