import {
    useSortable
} from "@dnd-kit/sortable";


import {
    CSS
} from "@dnd-kit/utilities";


import {
    Button
} from "@/components/ui/button";


import {
    Badge
} from "@/components/ui/badge";


import {
    Play,
    CheckCircle2,
    GripVertical
} from "lucide-react";


import type {
    Appointment,
    AppointmentStatus
} from "@/types/appointment";



type QueueAppointment =
    Appointment & {
        tokenNumber: number;
    };



interface Props {


    appointment:
    QueueAppointment;



    updateStatus:
    (
        appointment: Appointment,
        status: AppointmentStatus
    ) => void;


}



export default function SortableQueueRow({

    appointment,

    updateStatus,

}: Props) {



    const {

        attributes,

        listeners,

        setNodeRef,

        transform,

        transition,

    } = useSortable({

        id:
            appointment.id

    });




    const style = {

        transform:
            CSS.Transform.toString(
                transform
            ),

        transition,

    };





    return (

        <tr

            ref={setNodeRef}

            style={style}

        >


            <td className="p-3">


                <div className="flex items-center gap-2">


                    <button

                        {...attributes}

                        {...listeners}

                    >

                        <GripVertical
                            size={16}
                        />

                    </button>



                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">

                        {appointment.tokenNumber}

                    </span>


                </div>


            </td>




            <td className="p-3 font-medium">

                {appointment.patientName}

            </td>




            <td className="p-3">

                {appointment.doctor}

            </td>




            <td className="p-3">

                {appointment.department}

            </td>




            <td className="p-3">

                {appointment.appointmentTime}

            </td>




            <td className="p-3">


                <Badge variant="outline">

                    {
                        appointment.status === "Confirmed"
                            ?
                            "In Consultation"
                            :
                            appointment.status
                    }

                </Badge>


            </td>




            <td className="p-3">


                {

                    appointment.status === "Waiting" &&

                    <Button

                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                            updateStatus(
                                appointment,
                                "Confirmed"
                            )
                        }

                    >

                        <Play
                            size={15}
                            className="mr-2 cursor-pointer"
                        />

                        Start

                    </Button>


                }



                {

                    appointment.status === "Confirmed" &&

                    <Button

                        size="sm"

                        onClick={() =>
                            updateStatus(
                                appointment,
                                "Completed"
                            )
                        }

                    >

                        <CheckCircle2

                            size={15}

                            className="mr-2"

                        />

                        Complete

                    </Button>


                }



                {

                    appointment.status === "Completed" &&

                    <span className="text-sm text-green-600">

                        Completed

                    </span>


                }


            </td>


        </tr>


    );


}