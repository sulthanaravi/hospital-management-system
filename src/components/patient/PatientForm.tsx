import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { patientSchema, type PatientFormData } from "@/schemas/patient.schema";

import Stepper from "./Stepper";
import BasicInformation from "./BasicInformation";
import ContactInformation from "./ContactInformation";
import PhotoUpload from "./PhotoUpload";
import ReviewSubmit from "./ReviewSubmit";
import { useCreatePatient } from "@/hooks/usePatient";
import { toast } from "sonner";

export default function PatientForm() {
    const createPatient = useCreatePatient();
    const form = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            patientId: `PAT-${Date.now()}`,
            firstName: "",
            lastName: "",
            mobile: "",
            aadhaar: "",
            dob: "",
            age: 0,
            gender: "",
            bloodGroup: "",
            emergencyContact: "",
            address: "",
        },
        mode: "onTouched",
    });

    const [currentStep, setCurrentStep] = useState(1);

    const stepFields = [
        [
            "firstName",
            "lastName",
            "mobile",
            "aadhaar",
            "dob",
            "age",
            "gender",
            "bloodGroup",
        ],
        ["emergencyContact", "address"],
        [],
        [],
    ] as const;

    const steps = [
        <BasicInformation key="basic" form={form} />,
        <ContactInformation key="contact" form={form} />,
        <PhotoUpload key="photo" form={form} />,
        <ReviewSubmit key="review" form={form} />,
    ];

    const nextStep = async () => {
        const valid = await form.trigger(stepFields[currentStep - 1]);

        if (!valid) return;

        setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const previousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data: PatientFormData) => {
        try {
            await createPatient.mutateAsync(data);

            toast.success("Patient Registered Successfully");

            form.reset();

            setCurrentStep(1);
        } catch (error) {
            toast.error("Registration Failed");
        }
    };

    return (
        <div className="rounded-xl bg-white p-8 shadow-lg">
            {/* Stepper */}
            <Stepper currentStep={currentStep} />

            {/* Form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-8 space-y-8"
                >
                    {steps[currentStep - 1]}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between border-t pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={previousStep}
                            disabled={currentStep === 1}
                            className="cursor-pointer"
                        >
                            Previous
                        </Button>

                        {currentStep < 4 ? (
                            <Button type="button" onClick={nextStep} className="cursor-pointer">
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={createPatient.isPending}
                                className="cursor-pointer"
                            >
                                {createPatient.isPending
                                    ? "Registering..."
                                    : "Register Patient"}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}