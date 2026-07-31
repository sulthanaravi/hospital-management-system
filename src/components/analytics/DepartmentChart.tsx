import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type {
    Appointment,
} from "@/types/appointment";

interface DepartmentChartProps {
    appointments: Appointment[];
}

export default function DepartmentChart({
    appointments,
}: DepartmentChartProps) {
    const departmentCounts =
        appointments.reduce(
            (
                result,
                appointment
            ) => {
                const department =
                    appointment.department;

                result[department] =
                    (result[department] || 0) +
                    1;

                return result;
            },
            {} as Record<string, number>
        );

    const chartData =
        Object.entries(
            departmentCounts
        ).map(
            ([
                department,
                count,
            ]) => ({
                department,
                count,
            })
        );

    return (
        <section className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">

            {/* Chart heading */}

            <div className="mb-6">

                <h2 className="text-lg font-semibold text-slate-900">
                    Appointments by Department
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Number of appointments in
                    each department
                </p>

            </div>

            {/* Chart */}

            <div className="h-80 w-full">

                {chartData.length === 0 ? (

                    <div className="flex h-full items-center justify-center">

                        <p className="text-sm text-slate-500">
                            No department data
                            available.
                        </p>

                    </div>

                ) : (

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 15,
                                left: -15,
                                bottom: 5,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="department"
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#64748b",
                                }}
                            />

                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#64748b",
                                }}
                            />

                            <Tooltip
                                cursor={{
                                    fill: "#f8fafc",
                                }}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border:
                                        "1px solid #e2e8f0",
                                    boxShadow:
                                        "0 4px 12px rgba(0, 0, 0, 0.08)",
                                }}
                            />

                            <Bar
                                dataKey="count"
                                name="Appointments"
                                radius={[
                                    7,
                                    7,
                                    0,
                                    0,
                                ]}
                            >

                                {chartData.map(
                                    (
                                        _item,
                                        index
                                    ) => (

                                        <Cell
                                            key={
                                                index
                                            }
                                            fill={
                                                [
                                                    "#2563eb",
                                                    "#7c3aed",
                                                    "#0891b2",
                                                    "#059669",
                                                    "#ea580c",
                                                    "#db2777",
                                                ][
                                                index %
                                                6
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Bar>

                        </BarChart>

                    </ResponsiveContainer>

                )}

            </div>

        </section>
    );
}