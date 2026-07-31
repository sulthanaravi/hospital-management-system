import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

import { useCreateAppointment } from "@/hooks/useAppointment";

export default function AppointmentForm() {
    const createAppointment =
        useCreateAppointment();

    // Current date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // Current time in HH:mm format
    const getCurrentTime = () => {
        const now = new Date();

        const hours = String(
            now.getHours()
        ).padStart(2, "0");

        const minutes = String(
            now.getMinutes()
        ).padStart(2, "0");

        return `${hours}:${minutes}`;
    };

    const todayDate = getTodayDate();

    const form = useForm<AppointmentFormData>({
        resolver: zodResolver(
            appointmentSchema
        ),

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

    // Watch selected appointment date
    const selectedDate =
        form.watch("appointmentDate");

    // If today is selected, minimum time is current time
    // If future date is selected, all times are allowed
    const minimumTime =
        selectedDate === todayDate
            ? getCurrentTime()
            : undefined;

    const onSubmit = async (
        data: AppointmentFormData
    ) => {
        try {
            const selectedDateTime =
                new Date(
                    `${data.appointmentDate}T${data.appointmentTime}`
                );

            const currentDateTime =
                new Date();

            // Prevent past date and time
            if (
                selectedDateTime <=
                currentDateTime
            ) {
                toast.error(
                    "Please select a future appointment date and time"
                );

                return;
            }

            await createAppointment.mutateAsync(
                data
            );

            toast.success(
                "Appointment created successfully"
            );

            form.reset({
                patientName: "",
                doctor: "",
                department: "",
                appointmentDate: "",
                appointmentTime: "",
                reason: "",
                priority: "Low",
                status: "Waiting",
            });
        } catch (error) {
            console.error(
                "Failed to create appointment:",
                error
            );

            toast.error(
                "Failed to create appointment"
            );
        }
    };

    return (
        <section className="w-full min-w-0 overflow-hidden rounded-xl bg-white shadow-sm">
            {/* Header */}

            <div className="border-b px-4 py-5 sm:px-6">
                <h2 className="break-words text-xl font-semibold text-slate-900 sm:text-2xl">
                    Book Appointment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Enter the appointment details
                    below.
                </p>
            </div>

            {/* Form */}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(
                        onSubmit
                    )}
                    className="w-full space-y-6 p-4 sm:p-6"
                >
                    {/* Form Fields */}

                    <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">

                        {/* Patient Name */}

                        <FormField
                            control={
                                form.control
                            }
                            name="patientName"
                            render={({
                                field,
                            }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel>
                                        Patient Name
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            className="w-full"
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
                                <FormItem className="min-w-0">
                                    <FormLabel>
                                        Doctor
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            className="w-full"
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
                                <FormItem className="min-w-0">
                                    <FormLabel>
                                        Department
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            className="w-full"
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
                                <FormItem className="min-w-0 cursor-pointer">
                                    <FormLabel>
                                        Appointment Date
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            type="date"
                                            className="w-full"
                                            min={
                                                todayDate
                                            }
                                            {...field}
                                            onChange={(
                                                event
                                            ) => {
                                                field.onChange(
                                                    event
                                                        .target
                                                        .value
                                                );
                                                form.setValue(
                                                    "appointmentTime",
                                                    ""
                                                );
                                            }}
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
                                <FormItem className="min-w-0">
                                    <FormLabel>
                                        Appointment Time
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            type="time"
                                            className="w-full"
                                            min={
                                                minimumTime
                                            }
                                            disabled={
                                                !selectedDate
                                            }
                                            {...field}
                                        />
                                    </FormControl>

                                    {!selectedDate && (
                                        <p className="text-xs text-slate-500">
                                            Select an appointment date first.
                                        </p>
                                    )}

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
                                <FormItem className="min-w-0">
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
                                            <SelectTrigger className="w-full">
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
                                <FormItem className="min-w-0">
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
                                            <SelectTrigger className="w-full">
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
                        control={
                            form.control
                        }
                        name="reason"
                        render={({
                            field,
                        }) => (
                            <FormItem className="w-full min-w-0">
                                <FormLabel>
                                    Reason for Appointment
                                </FormLabel>

                                <FormControl>
                                    <Textarea
                                        className="min-h-28 w-full resize-none"
                                        placeholder="Enter the reason for the appointment"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Buttons */}

                    <div className="flex w-full flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end">

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto cursor-pointer"
                            onClick={() =>
                                form.reset()
                            }
                        >
                            Clear
                        </Button>

                        <Button
                            type="submit"
                            className="w-full sm:w-auto cursor-pointer"
                            disabled={
                                createAppointment.isPending
                            }
                        >
                            {createAppointment.isPending
                                ? "Creating..."
                                : "Create Appointment"}
                        </Button>

                    </div>

                </form>
            </Form>
        </section>
    );
}