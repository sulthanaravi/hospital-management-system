import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import SortableQueueRow
    from "@/components/queue/SortableQueueRow";


import type {
    Appointment,
    AppointmentStatus,
} from "@/types/appointment";



type QueueAppointment =
    Appointment & {
        tokenNumber: number;
    };



interface Props {


    appointments:
    QueueAppointment[];


    updateStatus:
    (
        appointment: Appointment,
        status: AppointmentStatus
    ) => void;



    onDragEnd:
    (event: any) => void;


}



export default function QueueTable({

    appointments,

    updateStatus,

    onDragEnd,

}: Props) {



    return (

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">


            <div className="border-b px-5 py-5">


                <h2 className="text-lg font-semibold">

                    Today's Queue

                </h2>


                <p className="text-sm text-slate-500">

                    Drag patients to reorder queue

                </p>


            </div>





            <div className="overflow-x-auto">


                <Table>


                    <TableHeader>


                        <TableRow>


                            <TableHead>
                                Token
                            </TableHead>


                            <TableHead>
                                Patient
                            </TableHead>


                            <TableHead>
                                Doctor
                            </TableHead>


                            <TableHead>
                                Department
                            </TableHead>


                            <TableHead>
                                Time
                            </TableHead>


                            <TableHead>
                                Status
                            </TableHead>


                            <TableHead>
                                Action
                            </TableHead>


                        </TableRow>


                    </TableHeader>





                    <TableBody>


                        {
                            appointments.length === 0 ?


                                <TableRow>


                                    <TableCell

                                        colSpan={7}

                                        className="h-32 text-center"

                                    >


                                        No appointments found


                                    </TableCell>


                                </TableRow>



                                :


                                <DndContext

                                    collisionDetection={
                                        closestCenter
                                    }

                                    onDragEnd={
                                        onDragEnd
                                    }

                                >


                                    <SortableContext

                                        items={
                                            appointments.map(
                                                item => item.id
                                            )
                                        }

                                        strategy={
                                            verticalListSortingStrategy
                                        }

                                    >


                                        {
                                            appointments.map(
                                                appointment => (


                                                    <SortableQueueRow

                                                        key={
                                                            appointment.id
                                                        }


                                                        appointment={
                                                            appointment
                                                        }


                                                        updateStatus={
                                                            updateStatus
                                                        }


                                                    />


                                                )

                                            )

                                        }


                                    </SortableContext>


                                </DndContext>


                        }


                    </TableBody>


                </Table>


            </div>


        </div>


    );


}