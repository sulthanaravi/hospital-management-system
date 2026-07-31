import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    arrayMove,
} from "@dnd-kit/sortable";

import {
    toast,
} from "sonner";

import {
    useQueue,
    useUpdateQueueStatus,
} from "@/hooks/useQueue";

import type {
    AppointmentStatus,
} from "@/types/appointment";

import QueueSummary
    from "@/components/queue/queueSummary";

import QueueFilters
    from "@/components/queue/QueueFilters";

import QueueTable
    from "@/components/queue/QueueTable";

import QueuePagination
    from "@/components/queue/QueuePagination";



export default function QueueManagement() {


    const {
        data: appointments = [],
        isLoading,
        isError,
    } = useQueue();



    const updateQueueStatus =
        useUpdateQueueStatus();



    const today =
        new Date()
            .toISOString()
            .split("T")[0];



    const [
        search,
        setSearch,
    ] = useState("");



    const [
        doctorFilter,
        setDoctorFilter,
    ] = useState("All");



    const [
        departmentFilter,
        setDepartmentFilter,
    ] = useState("All");



    const [
        dateFilter,
        setDateFilter,
    ] = useState(today);



    const [
        page,
        setPage,
    ] = useState(1);



    const pageSize = 5;



    const [
        queueOrder,
        setQueueOrder,
    ] = useState<number[]>([]);





    const doctors =
        useMemo(() => {

            return [
                "All",
                ...new Set(
                    appointments.map(
                        item => item.doctor
                    )
                ),
            ];

        }, [
            appointments,
        ]);






    const departments =
        useMemo(() => {

            return [
                "All",
                ...new Set(
                    appointments.map(
                        item => item.department
                    )
                ),
            ];

        }, [
            appointments,
        ]);







    const queueAppointments =
        useMemo(() => {


            return appointments

                .filter(
                    item =>
                        item.appointmentDate ===
                        dateFilter
                )

                .filter(
                    item =>
                        doctorFilter === "All" ||
                        item.doctor === doctorFilter
                )

                .filter(
                    item =>
                        departmentFilter === "All" ||
                        item.department === departmentFilter
                )

                .filter(
                    item =>
                        item.patientName
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                )

                .sort(
                    (a, b) =>
                        a.appointmentTime.localeCompare(
                            b.appointmentTime
                        )
                )

                .map(
                    (item, index) => ({

                        ...item,

                        tokenNumber:
                            index + 1,

                    })
                );


        }, [
            appointments,
            dateFilter,
            doctorFilter,
            departmentFilter,
            search,
        ]);







    useEffect(() => {


        setQueueOrder(

            queueAppointments.map(
                item => item.id
            )

        );


    }, [
        queueAppointments,
    ]);







    const finalQueue =
        useMemo(() => {


            if (
                queueOrder.length === 0
            ) {

                return queueAppointments;

            }



            return queueOrder

                .map(
                    id =>
                        queueAppointments.find(
                            item =>
                                item.id === id
                        )
                )

                .filter(
                    (
                        item
                    ): item is typeof queueAppointments[number] =>
                        Boolean(item)
                );


        }, [
            queueOrder,
            queueAppointments,
        ]);







    const paginatedQueue =
        finalQueue.slice(

            (page - 1) * pageSize,

            page * pageSize

        );




    const totalPages =
        Math.ceil(
            finalQueue.length /
            pageSize
        );







    const handleDragEnd =
        (event: any) => {


            const {
                active,
                over,
            } = event;



            if (
                !over ||
                active.id === over.id
            ) {

                return;

            }




            setQueueOrder(
                items => {


                    const oldIndex =
                        items.indexOf(
                            active.id
                        );



                    const newIndex =
                        items.indexOf(
                            over.id
                        );



                    return arrayMove(
                        items,
                        oldIndex,
                        newIndex
                    );

                }
            );


        };








    const updateStatus =
        async (

            appointment: {
                id: number;
            },

            status: AppointmentStatus

        ) => {


            try {


                await updateQueueStatus
                    .mutateAsync({

                        id:
                            appointment.id,

                        status,

                    });



                toast.success(

                    status === "Confirmed"

                        ? "Consultation started"

                        : "Consultation completed"

                );


            }
            catch {


                toast.error(
                    "Failed to update status"
                );


            }


        };








    if (isLoading) {

        return (

            <div className="p-8 text-center">

                Loading queue...

            </div>

        );

    }





    if (isError) {

        return (

            <div className="p-8 text-center text-red-500">

                Failed to load queue

            </div>

        );

    }







    return (

        <div className="space-y-6">


            <div>

                <h1 className="text-2xl font-bold">

                    Queue Management

                </h1>


                <p className="text-sm text-slate-500">

                    Manage today's patient queue

                </p>

            </div>





            <QueueSummary

                total={
                    queueAppointments.length
                }


                waiting={
                    queueAppointments.filter(
                        item =>
                            item.status === "Waiting"
                    ).length
                }


                inProgress={
                    queueAppointments.filter(
                        item =>
                            item.status === "Confirmed"
                    ).length
                }


                completed={
                    queueAppointments.filter(
                        item =>
                            item.status === "Completed"
                    ).length
                }

            />







            <QueueFilters

                search={search}

                setSearch={setSearch}

                doctor={doctorFilter}

                setDoctor={setDoctorFilter}

                department={departmentFilter}

                setDepartment={
                    setDepartmentFilter
                }

                date={dateFilter}

                setDate={setDateFilter}

                doctors={doctors}

                departments={departments}

            />







            <QueueTable

                appointments={
                    paginatedQueue
                }

                updateStatus={
                    updateStatus
                }

                onDragEnd={
                    handleDragEnd
                }

            />







            <QueuePagination

                page={page}

                totalPages={totalPages}

                setPage={setPage}

            />


        </div>

    );

}