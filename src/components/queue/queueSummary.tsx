import {
    CheckCircle2,
    Clock3,
    Play,
    Users,
} from "lucide-react";


interface Props {

    total: number;

    waiting: number;

    inProgress: number;

    completed: number;

}


export default function QueueSummary({
    total,
    waiting,
    inProgress,
    completed
}: Props) {


    const cards = [

        {
            title: "Total Queue",
            value: total,
            icon: <Users size={22} />
        },

        {
            title: "Waiting",
            value: waiting,
            icon: <Clock3 size={22} />,
            color: "text-yellow-600"
        },

        {
            title: "In Consultation",
            value: inProgress,
            icon: <Play size={22} />,
            color: "text-blue-600"
        },

        {
            title: "Completed",
            value: completed,
            icon: <CheckCircle2 size={22} />,
            color: "text-green-600"
        }

    ];


    return (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">


            {
                cards.map(card => (

                    <div
                        key={card.title}
                        className="rounded-xl bg-white p-5 shadow-sm"
                    >


                        <div className="flex justify-between">


                            <div>

                                <p className="text-sm text-slate-500">

                                    {card.title}

                                </p>


                                <p
                                    className={`mt-2 text-3xl font-bold ${card.color ?? ""}`}
                                >

                                    {card.value}

                                </p>


                            </div>


                            <div className="rounded-xl bg-slate-100 p-3">

                                {card.icon}

                            </div>


                        </div>


                    </div>


                ))

            }


        </div>

    );


}