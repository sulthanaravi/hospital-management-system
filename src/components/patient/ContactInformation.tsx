
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PatientFormData } from "@/schemas/patient.schema";
import type { UseFormReturn } from "react-hook-form";


interface ContactInformationProps {
    form: UseFormReturn<PatientFormData>;
}

export default function ContactInformation({
    form,
}: ContactInformationProps) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold">
                    Contact Information
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                    Enter emergency contact details and address.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Emergency Contact */}

                <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Emergency Contact</FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Emergency Mobile Number"
                                    maxLength={10}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Address */}

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Address</FormLabel>

                            <FormControl>
                                <Textarea
                                    placeholder="Enter Full Address"
                                    rows={5}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}