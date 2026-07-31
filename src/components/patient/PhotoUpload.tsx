import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";

;

import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import type { PatientFormData } from "@/schemas/patient.schema";

interface PhotoUploadProps {
    form: UseFormReturn<PatientFormData>;
}

export default function PhotoUpload({
    form,
}: PhotoUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png"
        ) {
            alert("Only JPG and PNG images are allowed.");
            return;
        }

        form.setValue("photo", file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setPreview(null);
        form.setValue("photo", undefined);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold">
                    Upload Patient Photo
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                    Upload a recent passport-size photograph.
                </p>
            </div>

            <FormField
                control={form.control}
                name="photo"
                render={() => (
                    <FormItem>
                        <FormLabel>Patient Photo</FormLabel>

                        <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
                            {preview ? (
                                <div className="space-y-4">
                                    <img
                                        src={preview}
                                        alt="Patient"
                                        className="mx-auto h-40 w-40 rounded-lg object-cover border"
                                    />

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={removeImage}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove Photo
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="mx-auto h-12 w-12 text-slate-400" />

                                    <p className="mt-4 text-sm text-slate-600">
                                        Upload JPG or PNG image
                                    </p>

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg"
                                        className="mt-4"
                                        onChange={handleImageUpload}
                                    />
                                </>
                            )}
                        </div>

                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}