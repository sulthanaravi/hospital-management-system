import { useMemo } from "react";

import {
    BarChart3,
    CheckCircle2,
    Building2,
    Stethoscope,
    CalendarDays,
    Users,
} from "lucide-react";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    useAppointments,
} from "@/hooks/useAppointment";

export default function Analytics() {
    const {
        data: appointments = [],
        isLoading,
        isError,
    } = useAppointments();

    const analytics = useMemo(() => {
        const total =
            appointments.length;

        const completed =
            appointments.filter(
                (appointment) =>
                    appointment.status ===
                    "Completed"
            ).length;

        const waiting =
            appointments.filter(
                (appointment) =>
                    appointment.status ===
                    "Waiting"
            ).length;

        const inProgress =
            appointments.filter(
                (appointment) =>
                    appointment.status ===
                    "Confirmed"
            ).length;

        const completionRate =
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                );

        const departmentCount =
            appointments.reduce(
                (
                    result,
                    appointment
                ) => {
                    const department =
                        appointment.department;

                    result[department] =
                        (
                            result[
                            department
                            ] || 0
                        ) + 1;

                    return result;
                },
                {} as Record<
                    string,
                    number
                >
            );

        const doctorCount =
            appointments.reduce(
                (
                    result,
                    appointment
                ) => {
                    const doctor =
                        appointment.doctor;

                    result[doctor] =
                        (
                            result[
                            doctor
                            ] || 0
                        ) + 1;

                    return result;
                },
                {} as Record<
                    string,
                    number
                >
            );

        const departmentData =
            Object.entries(
                departmentCount
            )
                .map(
                    ([
                        department,
                        count,
                    ]) => ({
                        department,
                        count,
                    })
                )
                .sort(
                    (a, b) =>
                        b.count -
                        a.count
                );

        const doctorData =
            Object.entries(
                doctorCount
            )
                .map(
                    ([
                        doctor,
                        count,
                    ]) => ({
                        doctor,
                        count,
                    })
                )
                .sort(
                    (a, b) =>
                        b.count -
                        a.count
                );

        const priorityData = [
            {
                name: "High",
                value:
                    appointments.filter(
                        (
                            appointment
                        ) =>
                            appointment.priority ===
                            "High"
                    ).length,
                color:
                    "#ef4444",
            },

            {
                name: "Medium",
                value:
                    appointments.filter(
                        (
                            appointment
                        ) =>
                            appointment.priority ===
                            "Medium"
                    ).length,
                color:
                    "#f59e0b",
            },

            {
                name: "Low",
                value:
                    appointments.filter(
                        (
                            appointment
                        ) =>
                            appointment.priority ===
                            "Low"
                    ).length,
                color:
                    "#22c55e",
            },
        ];

        const mostActiveDepartment =
            departmentData[0]
                ?.department ||
            "No data";

        const mostBookedDoctor =
            doctorData[0]
                ?.doctor ||
            "No data";

        return {
            total,
            completed,
            waiting,
            inProgress,
            completionRate,
            departmentData,
            doctorData,
            priorityData,
            mostActiveDepartment,
            mostBookedDoctor,
        };
    }, [
        appointments,
    ]);

    if (isLoading) {
        return (
            <div className="space-y-6">

                <div className="h-20 animate-pulse rounded-xl bg-slate-200" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {Array.from({
                        length: 4,
                    }).map(
                        (
                            _,
                            index
                        ) => (

                            <div
                                key={index}
                                className="h-36 animate-pulse rounded-xl bg-slate-200"
                            />

                        )
                    )}

                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    <div className="h-96 animate-pulse rounded-xl bg-slate-200" />

                    <div className="h-96 animate-pulse rounded-xl bg-slate-200" />

                </div>

            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 p-6">

                <BarChart3
                    size={40}
                    className="text-red-500"
                />

                <h2 className="mt-4 text-lg font-semibold text-red-700">

                    Failed to load analytics

                </h2>

                <p className="mt-1 text-center text-sm text-red-500">

                    Please check whether the
                    backend server is running.

                </p>

            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Page heading */}

            <section className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-5 shadow-sm sm:p-7">

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">

                            <BarChart3
                                size={24}
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">

                                Analytics

                            </h1>

                            <p className="mt-1 text-sm text-slate-600">

                                Detailed insights into
                                appointment activity,
                                departments, doctors,
                                and priorities.

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2 self-start rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm sm:self-auto">

                        <CalendarDays
                            size={16}
                            className="text-blue-600"
                        />

                        Live appointment data

                    </div>

                </div>

            </section>

            {/* Insight cards */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <InsightCard
                    title="Total Appointments"
                    value={
                        analytics.total
                    }
                    description="All appointments recorded"
                    icon={
                        <Users
                            size={21}
                        />
                    }
                    iconClassName="
                        bg-blue-50
                        text-blue-600
                    "
                />

                <InsightCard
                    title="Completion Rate"
                    value={`${analytics.completionRate}%`}
                    description={`${analytics.completed} consultations completed`}
                    icon={
                        <CheckCircle2
                            size={21}
                        />
                    }
                    iconClassName="
                        bg-emerald-50
                        text-emerald-600
                    "
                />

                <InsightCard
                    title="Top Department"
                    value={
                        analytics.mostActiveDepartment
                    }
                    description="Highest appointment volume"
                    icon={
                        <Building2
                            size={21}
                        />
                    }
                    iconClassName="
                        bg-violet-50
                        text-violet-600
                    "
                />

                <InsightCard
                    title="Most Booked Doctor"
                    value={
                        analytics.mostBookedDoctor
                    }
                    description="Highest appointment count"
                    icon={
                        <Stethoscope
                            size={21}
                        />
                    }
                    iconClassName="
                        bg-orange-50
                        text-orange-600
                    "
                />

            </div>

            {/* Status summary */}

            <section className="grid grid-cols-1 gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:grid-cols-3 sm:p-5">

                <StatusSummary
                    title="Waiting"
                    value={
                        analytics.waiting
                    }
                    className="
                        border-amber-100
                        bg-amber-50
                        text-amber-700
                    "
                />

                <StatusSummary
                    title="In Consultation"
                    value={
                        analytics.inProgress
                    }
                    className="
                        border-blue-100
                        bg-blue-50
                        text-blue-700
                    "
                />

                <StatusSummary
                    title="Completed"
                    value={
                        analytics.completed
                    }
                    className="
                        border-emerald-100
                        bg-emerald-50
                        text-emerald-700
                    "
                />

            </section>

            {/* Department and doctor charts */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <ChartCard
                    title="Appointments by Department"
                    description="Compare appointment volume across departments"
                >

                    <div className="h-80">

                        {analytics
                            .departmentData
                            .length === 0 ? (

                            <EmptyChart />

                        ) : (

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={
                                        analytics.departmentData
                                    }
                                    margin={{
                                        top: 25,
                                        right: 15,
                                        left: -15,
                                        bottom: 5,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="4 4"
                                        vertical={
                                            false
                                        }
                                        stroke="#e2e8f0"
                                    />

                                    <XAxis
                                        dataKey="department"
                                        tickLine={
                                            false
                                        }
                                        axisLine={
                                            false
                                        }
                                        tick={{
                                            fontSize:
                                                12,
                                            fill:
                                                "#64748b",
                                        }}
                                    />

                                    <YAxis
                                        allowDecimals={
                                            false
                                        }
                                        tickLine={
                                            false
                                        }
                                        axisLine={
                                            false
                                        }
                                        tick={{
                                            fontSize:
                                                12,
                                            fill:
                                                "#64748b",
                                        }}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "#eff6ff",
                                        }}
                                        contentStyle={{
                                            borderRadius:
                                                "12px",
                                            border:
                                                "1px solid #dbeafe",
                                            boxShadow:
                                                "0 8px 20px rgba(15, 23, 42, 0.10)",
                                        }}
                                    />

                                    <Bar
                                        dataKey="count"
                                        name="Appointments"
                                        radius={[
                                            8,
                                            8,
                                            0,
                                            0,
                                        ]}
                                        maxBarSize={
                                            55
                                        }
                                    >

                                        {analytics.departmentData.map(
                                            (
                                                _,
                                                index
                                            ) => (

                                                <Cell
                                                    key={
                                                        index
                                                    }
                                                    fill={
                                                        index %
                                                            2 ===
                                                            0
                                                            ? "#2563eb"
                                                            : "#60a5fa"
                                                    }
                                                />

                                            )
                                        )}

                                        <LabelList
                                            dataKey="count"
                                            position="top"
                                            fill="#334155"
                                            fontSize={
                                                12
                                            }
                                        />

                                    </Bar>

                                </BarChart>

                            </ResponsiveContainer>

                        )}

                    </div>

                </ChartCard>

                <ChartCard
                    title="Appointments by Doctor"
                    description="Compare appointment workload by doctor"
                >

                    <div className="h-80">

                        {analytics
                            .doctorData
                            .length === 0 ? (

                            <EmptyChart />

                        ) : (

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={
                                        analytics.doctorData
                                    }
                                    layout="vertical"
                                    margin={{
                                        top: 10,
                                        right: 40,
                                        left: 25,
                                        bottom: 5,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="4 4"
                                        horizontal={
                                            false
                                        }
                                        stroke="#e2e8f0"
                                    />

                                    <XAxis
                                        type="number"
                                        allowDecimals={
                                            false
                                        }
                                        tickLine={
                                            false
                                        }
                                        axisLine={
                                            false
                                        }
                                        tick={{
                                            fontSize:
                                                12,
                                            fill:
                                                "#64748b",
                                        }}
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="doctor"
                                        width={
                                            95
                                        }
                                        tickLine={
                                            false
                                        }
                                        axisLine={
                                            false
                                        }
                                        tick={{
                                            fontSize:
                                                12,
                                            fill:
                                                "#64748b",
                                        }}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "#f5f3ff",
                                        }}
                                        contentStyle={{
                                            borderRadius:
                                                "12px",
                                            border:
                                                "1px solid #ede9fe",
                                            boxShadow:
                                                "0 8px 20px rgba(15, 23, 42, 0.10)",
                                        }}
                                    />

                                    <Bar
                                        dataKey="count"
                                        name="Appointments"
                                        fill="#7c3aed"
                                        radius={[
                                            0,
                                            8,
                                            8,
                                            0,
                                        ]}
                                        maxBarSize={
                                            38
                                        }
                                    >

                                        <LabelList
                                            dataKey="count"
                                            position="right"
                                            fill="#475569"
                                            fontSize={
                                                12
                                            }
                                        />

                                    </Bar>

                                </BarChart>

                            </ResponsiveContainer>

                        )}

                    </div>

                </ChartCard>

            </div>

            {/* Priority chart */}

            <ChartCard
                title="Appointment Priority Distribution"
                description="View the distribution of high, medium, and low priority appointments"
            >

                <div className="relative h-96">

                    {analytics.total ===
                        0 ? (

                        <EmptyChart />

                    ) : (

                        <>

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={
                                            analytics.priorityData
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={
                                            82
                                        }
                                        outerRadius={
                                            130
                                        }
                                        paddingAngle={
                                            5
                                        }
                                        stroke="none"
                                    >

                                        {analytics.priorityData.map(
                                            (
                                                item
                                            ) => (

                                                <Cell
                                                    key={
                                                        item.name
                                                    }
                                                    fill={
                                                        item.color
                                                    }
                                                />

                                            )
                                        )}

                                    </Pie>

                                    <Tooltip
                                        contentStyle={{
                                            borderRadius:
                                                "12px",
                                            border:
                                                "1px solid #e2e8f0",
                                            boxShadow:
                                                "0 8px 20px rgba(15, 23, 42, 0.10)",
                                        }}
                                    />

                                </PieChart>

                            </ResponsiveContainer>

                            {/* Donut center */}

                            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">

                                <span className="text-3xl font-bold text-slate-900">

                                    {
                                        analytics.total
                                    }

                                </span>

                                <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">

                                    Total

                                </span>

                            </div>

                        </>

                    )}

                </div>

                {/* Priority legend */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                    {analytics.priorityData.map(
                        (
                            item
                        ) => (

                            <div
                                key={
                                    item.name
                                }
                                className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3"
                            >

                                <div className="flex items-center gap-2">

                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor:
                                                item.color,
                                        }}
                                    />

                                    <span className="text-sm font-medium text-slate-700">

                                        {
                                            item.name
                                        }

                                    </span>

                                </div>

                                <span className="text-sm font-bold text-slate-900">

                                    {
                                        item.value
                                    }

                                </span>

                            </div>

                        )
                    )}

                </div>

            </ChartCard>

        </div>
    );
}

interface InsightCardProps {

    title: string;

    value:
    | string
    | number;

    description: string;

    icon:
    React.ReactNode;

    iconClassName:
    string;

}

function InsightCard({

    title,

    value,

    description,

    icon,

    iconClassName,

}: InsightCardProps) {

    return (

        <section className="group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm font-medium text-slate-500">

                        {title}

                    </p>

                    <p className="mt-3 truncate text-2xl font-bold text-slate-900">

                        {value}

                    </p>

                    <p className="mt-2 text-xs text-slate-500">

                        {description}

                    </p>

                </div>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
                >

                    {icon}

                </div>

            </div>

        </section>

    );

}

interface StatusSummaryProps {

    title: string;

    value: number;

    className: string;

}

function StatusSummary({

    title,

    value,

    className,

}: StatusSummaryProps) {

    return (

        <div
            className={`flex items-center justify-between rounded-xl border px-5 py-4 ${className}`}
        >

            <span className="text-sm font-semibold">

                {title}

            </span>

            <span className="text-2xl font-bold">

                {value}

            </span>

        </div>

    );

}

interface ChartCardProps {

    title: string;

    description: string;

    children:
    React.ReactNode;

}

function ChartCard({

    title,

    description,

    children,

}: ChartCardProps) {

    return (

        <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">

                <h2 className="text-lg font-semibold text-slate-900">

                    {title}

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                    {description}

                </p>

            </div>

            {children}

        </section>

    );

}

function EmptyChart() {

    return (

        <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed bg-slate-50">

            <BarChart3
                size={32}
                className="text-slate-300"
            />

            <p className="mt-3 text-sm font-medium text-slate-500">

                No analytics data available

            </p>

            <p className="mt-1 text-xs text-slate-400">

                Add appointments to view
                analytics.

            </p>

        </div>

    );

}