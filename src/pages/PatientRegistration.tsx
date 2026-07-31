import PatientForm from "@/components/patient/PatientForm";

export default function PatientRegistrationPage() {
    return (
        <div className="mx-auto max-w-7xl">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Patient Registration
                </h1>

                <p className="text-gray-500 mt-2">
                    Register a new patient into the hospital management system.
                </p>

            </div>

            <PatientForm />

        </div>
    );
}