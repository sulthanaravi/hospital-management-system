import { usePatients } from "@/hooks/usePatient";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export default function Patients() {
    const { data: patients, isLoading } = usePatients();

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                Loading Patients...
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patients List</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Mobile</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Blood Group</TableHead>
                            <TableHead>Age</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {patients?.map((patient: any) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.patientId}</TableCell>

                                <TableCell>
                                    {patient.firstName} {patient.lastName}
                                </TableCell>

                                <TableCell>{patient.mobile}</TableCell>

                                <TableCell>
                                    <Badge variant="secondary">
                                        {patient.gender}
                                    </Badge>
                                </TableCell>

                                <TableCell>{patient.bloodGroup}</TableCell>

                                <TableCell>{patient.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}