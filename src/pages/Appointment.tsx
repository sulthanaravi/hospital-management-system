import AppointmentForm from "@/components/appointment/AppointmentForm";
import AppointmentTable from "@/components/appointment/AppointmentTable";

export default function AppointmentPage() {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Appointment Management
                </h1>

                <p className="mt-1 text-sm text-slate-500 sm:text-base">
                    Create, view, edit, and manage patient appointments.
                </p>
            </div>


            <AppointmentForm />


            <AppointmentTable />
        </div>
    );
}
