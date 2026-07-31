

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import type { UseFormReturn } from "react-hook-form";
import type { PatientFormData } from "@/schemas/patient.schema";

interface ReviewSubmitProps {
    form: UseFormReturn<PatientFormData>;
}

export default function ReviewSubmit({
    form,
}: ReviewSubmitProps) {
    const data = form.getValues();

    const image =
        data.photo instanceof File
            ? URL.createObjectURL(data.photo)
            : null;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold">
                    Review Patient Details
                </h2>

                <p className="text-muted-foreground mt-1">
                    Verify all information before registering the patient.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Patient Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Photo */}

                    <div className="flex justify-center">
                        {image ? (
                            <img
                                src={image}
                                alt="Patient"
                                className="h-36 w-36 rounded-xl border object-cover"
                            />
                        ) : (
                            <div className="flex h-36 w-36 items-center justify-center rounded-xl border bg-slate-100 text-sm text-gray-500">
                                No Photo
                            </div>
                        )}
                    </div>

                    {/* Details */}

                    <div className="grid gap-5 md:grid-cols-2">

                        <ReviewItem
                            label="Patient ID"
                            value={data.patientId}
                        />

                        <ReviewItem
                            label="First Name"
                            value={data.firstName}
                        />

                        <ReviewItem
                            label="Last Name"
                            value={data.lastName}
                        />

                        <ReviewItem
                            label="Mobile"
                            value={data.mobile}
                        />

                        <ReviewItem
                            label="Aadhaar"
                            value={data.aadhaar}
                        />

                        <ReviewItem
                            label="Date of Birth"
                            value={data.dob}
                        />

                        <ReviewItem
                            label="Age"
                            value={String(data.age)}
                        />

                        <ReviewItem
                            label="Gender"
                            value={data.gender}
                        />

                        <ReviewItem
                            label="Blood Group"
                            value={data.bloodGroup}
                        />

                        <ReviewItem
                            label="Emergency Contact"
                            value={data.emergencyContact}
                        />

                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold">
                            Address
                        </h3>

                        <div className="rounded-lg border bg-slate-50 p-4">
                            {data.address}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Badge className="px-4 py-2 text-base">
                            Ready to Register
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

interface ReviewItemProps {
    label: string;
    value?: string;
}

function ReviewItem({
    label,
    value,
}: ReviewItemProps) {
    return (
        <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="mt-1 font-semibold">
                {value || "-"}
            </p>
        </div>
    );
}