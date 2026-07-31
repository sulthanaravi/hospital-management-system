import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AppointmentFiltersProps {
    search: string;
    setSearch: (value: string) => void;

    department: string;
    setDepartment: (value: string) => void;

    status: string;
    setStatus: (value: string) => void;
}

export default function AppointmentFilters({
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
}: AppointmentFiltersProps) {
    return (
        <div className="mb-6 grid gap-4 md:grid-cols-3">
            {/* Search */}
            <Input
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Department */}
            <Select
                value={department}
                onValueChange={setDepartment}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Department" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All Departments
                    </SelectItem>

                    <SelectItem value="Cardiology">
                        Cardiology
                    </SelectItem>

                    <SelectItem value="Orthopedic">
                        Orthopedic
                    </SelectItem>

                    <SelectItem value="Neurology">
                        Neurology
                    </SelectItem>

                    <SelectItem value="Dermatology">
                        Dermatology
                    </SelectItem>
                </SelectContent>
            </Select>

            {/* Status */}
            <Select
                value={status}
                onValueChange={setStatus}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All Status
                    </SelectItem>

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
        </div>
    );
}