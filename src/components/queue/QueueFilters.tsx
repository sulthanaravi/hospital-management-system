import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
}
    from "@/components/ui/select";


interface Props {

    search: string;

    setSearch: (value: string) => void;

    doctor: string;

    setDoctor: (value: string) => void;

    department: string;

    setDepartment: (value: string) => void;

    date: string;

    setDate: (value: string) => void;

    doctors: string[];

    departments: string[];

}



export default function QueueFilters({
    search,
    setSearch,
    doctor,
    setDoctor,
    department,
    setDepartment,
    date,
    setDate,
    doctors,
    departments
}: Props) {


    return (

        <div className="flex flex-wrap gap-3">


            <Input

                placeholder="Search patient..."

                value={search}

                onChange={
                    e => setSearch(e.target.value)
                }

            />




            <Select
                value={doctor}
                onValueChange={setDoctor}
            >

                <SelectTrigger className="w-[180px]">

                    <SelectValue placeholder="Doctor" />

                </SelectTrigger>


                <SelectContent>

                    {
                        doctors.map(item => (

                            <SelectItem
                                key={item}
                                value={item}
                            >

                                {item}

                            </SelectItem>

                        ))
                    }

                </SelectContent>

            </Select>





            <Select
                value={department}
                onValueChange={setDepartment}
            >


                <SelectTrigger className="w-[180px]">

                    <SelectValue placeholder="Department" />

                </SelectTrigger>


                <SelectContent>

                    {
                        departments.map(item => (

                            <SelectItem
                                key={item}
                                value={item}
                            >

                                {item}

                            </SelectItem>

                        ))
                    }


                </SelectContent>


            </Select>





            <Input

                type="date"

                value={date}

                onChange={
                    e => setDate(e.target.value)
                }

            />


        </div>

    );

}