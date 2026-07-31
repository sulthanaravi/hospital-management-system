import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface AppointmentStatusChartProps {
    waiting: number;
    inProgress: number;
    completed: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: {
            name: string;
            color: string;
        };
    }>;
}

const CustomTooltip = ({
    active,
    payload,
}: CustomTooltipProps) => {
    if (!active || !payload?.length) {
        return null;
    }

    const data = payload[0];

    return (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
            <p className="text-sm font-semibold text-slate-800">
                {data.payload.name}
            </p>

            <div className="mt-2 flex items-center gap-2">
                <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                        backgroundColor:
                            data.payload.color,
                    }}
                />

                <span className="text-sm text-slate-500">
                    Appointments:
                </span>

                <span className="text-sm font-bold text-slate-900">
                    {data.value}
                </span>
            </div>
        </div>
    );
};

export default function AppointmentStatusChart({
    waiting,
    inProgress,
    completed,
}: AppointmentStatusChartProps) {
    const chartData = [
        {
            name: "Waiting",
            count: waiting,
            color: "#f59e0b",
        },
        {
            name: "In Consultation",
            count: inProgress,
            color: "#2563eb",
        },
        {
            name: "Completed",
            count: completed,
            color: "#16a34a",
        },
    ];

    const totalAppointments =
        waiting +
        inProgress +
        completed;

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Chart Header */}

            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-blue-600"
                            >
                                <path d="M3 3v18h18" />

                                <path d="M7 16v-5" />

                                <path d="M12 16V8" />

                                <path d="M17 16v-9" />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Appointment Status
                            </h2>

                            <p className="mt-0.5 text-sm text-slate-500">
                                Current appointment
                                distribution
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Total
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-slate-900">
                        {totalAppointments}
                    </p>
                </div>
            </div>

            {/* Status Legend */}

            <div className="flex flex-wrap gap-x-6 gap-y-3 px-5 pt-5 sm:px-6">
                {chartData.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-2"
                    >
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                                backgroundColor:
                                    item.color,
                            }}
                        />

                        <span className="text-sm text-slate-500">
                            {item.name}
                        </span>

                        <span className="text-sm font-semibold text-slate-800">
                            {item.count}
                        </span>
                    </div>
                ))}
            </div>

            {/* Chart */}

            <div className="h-[340px] w-full px-3 pb-5 pt-4 sm:px-6">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 30,
                            right: 10,
                            left: -15,
                            bottom: 5,
                        }}
                        barCategoryGap="35%"
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="#e2e8f0"
                            strokeDasharray="4 4"
                        />

                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            allowDecimals={false}
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            cursor={{
                                fill: "#f8fafc",
                            }}
                            content={
                                <CustomTooltip />
                            }
                        />

                        <Bar
                            dataKey="count"
                            name="Appointments"
                            radius={[
                                10,
                                10,
                                3,
                                3,
                            ]}
                            maxBarSize={70}
                        >
                            {chartData.map(
                                (item) => (
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

                            <LabelList
                                dataKey="count"
                                position="top"
                                fill="#334155"
                                fontSize={13}
                                fontWeight={700}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}