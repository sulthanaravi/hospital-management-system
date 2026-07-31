import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";

import { Trash2 } from "lucide-react";

import {
    useDeletePatient,
    usePatients,
} from "@/hooks/usePatient";

import { toast } from "sonner";

export default function PatientTable() {
    const { data, isLoading } = usePatients();

    const deletePatient = useDeletePatient();

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Patients</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (!data?.length) {
        return (
            <Card>
                <CardContent className="py-20 text-center">
                    <h2 className="text-xl font-semibold">
                        No Patients Found
                    </h2>

                    <p className="text-muted-foreground mt-2">
                        Register your first patient.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Registered Patients
                </CardTitle>

            </CardHeader>

            <CardContent>

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>ID</TableHead>

                            <TableHead>Name</TableHead>

                            <TableHead>Mobile</TableHead>

                            <TableHead>Gender</TableHead>

                            <TableHead>Blood</TableHead>

                            <TableHead>Action</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {data.map((patient: any) => (

                            <TableRow key={patient.id}>

                                <TableCell>
                                    {patient.patientId}
                                </TableCell>

                                <TableCell>
                                    {patient.firstName} {patient.lastName}
                                </TableCell>

                                <TableCell>
                                    {patient.mobile}
                                </TableCell>

                                <TableCell>

                                    <Badge>
                                        {patient.gender}
                                    </Badge>

                                </TableCell>

                                <TableCell>
                                    {patient.bloodGroup}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={async () => {
                                            await deletePatient.mutateAsync(
                                                patient.id
                                            );

                                            toast.success(
                                                "Patient Deleted"
                                            );
                                        }}
                                    >

                                        <Trash2 size={18} />

                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>
    );
}