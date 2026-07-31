interface StepperProps {
    currentStep: number;
}

const steps = [
    "Basic Information",
    "Personal Information",
    "Contact Information",
];

export default function Stepper({ currentStep }: StepperProps) {
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const active = currentStep >= index + 1;

                    return (
                        <div
                            key={step}
                            className="flex flex-1 items-center"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${active
                                        ? "bg-blue-600 border-blue-600 text-white"
                                        : "border-gray-300 text-gray-500"
                                        }`}
                                >
                                    {index + 1}
                                </div>

                                <span
                                    className={`mt-2 text-sm ${active
                                        ? "font-semibold text-blue-600"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>

                            {index !== steps.length - 1 && (
                                <div
                                    className={`mx-3 h-1 flex-1 rounded ${currentStep > index + 1
                                        ? "bg-blue-600"
                                        : "bg-gray-300"
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}