import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { PatientFormData } from "@/schemas/patient.schema";
import type { UseFormReturn } from "react-hook-form";

interface BasicInformationProps {
    form: UseFormReturn<PatientFormData>;
}

export default function BasicInformation({
    form,
}: BasicInformationProps) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">
                    Basic Information
                </h2>

                <p className="text-muted-foreground mt-1">
                    Enter patient basic details.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* First Name */}

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Enter first name"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Last Name */}

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="Enter last name"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Mobile */}

                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="9876543210"
                                    maxLength={10}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Aadhaar */}

                <FormField
                    control={form.control}
                    name="aadhaar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Aadhaar Number</FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="123456789012"
                                    maxLength={12}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Date of Birth */}

                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>

                            <FormControl>
                                <Input
                                    type="date"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);

                                        const dob = new Date(e.target.value);

                                        if (!isNaN(dob.getTime())) {
                                            const today = new Date();

                                            let age =
                                                today.getFullYear() -
                                                dob.getFullYear();

                                            const month =
                                                today.getMonth() -
                                                dob.getMonth();

                                            if (
                                                month < 0 ||
                                                (month === 0 &&
                                                    today.getDate() <
                                                    dob.getDate())
                                            ) {
                                                age--;
                                            }

                                            form.setValue("age", age);
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Age */}

                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>

                            <FormControl>
                                <Input
                                    type="number"
                                    value={field.value}
                                    readOnly
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Gender */}

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="Male">
                                        Male
                                    </SelectItem>

                                    <SelectItem value="Female">
                                        Female
                                    </SelectItem>

                                    <SelectItem value="Other">
                                        Other
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Blood Group */}

                <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Group</FormLabel>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Blood Group" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
        </div>
    );
}