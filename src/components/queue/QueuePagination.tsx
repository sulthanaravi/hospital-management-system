import { Button } from "@/components/ui/button";


interface Props {

    page: number;

    totalPages: number;

    setPage: React.Dispatch<
        React.SetStateAction<number>
    >;

}



export default function QueuePagination({
    page,
    totalPages,
    setPage,
}: Props) {


    return (

        <div className="flex items-center justify-end gap-4">


            <Button
                className="cursor-pointer"
                disabled={page === 1}

                onClick={() =>
                    setPage(
                        previous => previous - 1
                    )
                }

            >

                Previous

            </Button>



            <span className="text-sm text-slate-600">

                Page {page} of {totalPages || 1}

            </span>




            <Button

                disabled={
                    page === totalPages ||
                    totalPages === 0
                }
                className="cursor-pointer"
                onClick={() =>
                    setPage(
                        previous => previous + 1
                    )
                }

            >

                Next

            </Button>



        </div>

    );

}