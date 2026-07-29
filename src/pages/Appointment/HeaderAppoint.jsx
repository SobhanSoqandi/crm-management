import { useState } from "react";
import { days } from "./day-data";
import SearchInput from "../../components/UI/SearchInput";
import DayTimeline from "./DayTimeline";

function HeaderAppoint() {
    const [search, setSearch] = useState("");
    const [selectedDay, setSelectedDay] = useState(2);

    return (
        <div className="md:flex justify-between space-y-5 mx-2">

            <div className="flex justify-center" >
                <DayTimeline
                    days={days}
                    selectedDay={selectedDay}
                    onSelect={setSelectedDay}
                />
            </div>

            <div className="sm:w-[500px] mx-auto px-10" >
                <SearchInput
                    value={search}
                    onChange={setSearch}
                />
            </div>


        </div>
    );
}

export default HeaderAppoint;