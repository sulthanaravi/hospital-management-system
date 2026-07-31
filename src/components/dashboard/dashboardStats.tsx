import {
    CalendarDays,
    Clock3,
    Stethoscope,
    CheckCircle2,
} from "lucide-react";

interface DashboardStatsProps {
    total: number;
    waiting: number;
    inProgress: number;
    completed: number;
}

export default function DashboardStats({
    total,
    waiting,
    inProgress,
    completed,
}: DashboardStatsProps) {
    const stats = [
        {
            title: "Total Appointments",
            value: total,
            description: "All appointments",
            icon: CalendarDays,
        },
        {
            title: "Waiting",
            value: waiting,
            description: "Patients waiting",
            icon: Clock3,
        },
        {
            title: "In Consultation",
            value: inProgress,
            description: "Currently consulting",
            icon: Stethoscope,
        },
        {
            title: "Completed",
            value: completed,
            description: "Consultations completed",
            icon: CheckCircle2,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    {stat.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                    {stat.value}
                                </h2>

                                <p className="mt-2 text-xs text-slate-400">
                                    {stat.description}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <Icon size={22} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}