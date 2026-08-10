import { useState } from "react";
import SearchInput from "../../components/UI/SearchInput";
import AppointmentDateSelector from "./calendar/AppointmentDateSelector";
import { formatLongJalali, getToday } from "./calendar/dateUtils";
import { PlusIcon } from "lucide-react";
import Modal from "../../components/UI/modal";
import AddAppointmentForm from "./addapoint/AddAppointmentForm";

function HeaderAppoint() {
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState(getToday()); // به‌جای null

    return (
        <div className="md:flex justify-between space-y-5 md:space-y-0 mx-3">
            <div className="flex gap-2 items-center" >
                <AppointmentDateSelector value={selectedDate} onChange={setSelectedDate} />

                {selectedDate && (
                    <span className="text-lg text-blue-600" > {formatLongJalali(selectedDate)} </span>
                )}
            </div>

            <div className="flex justify-between items-center sm:w-[450px] md:w-[350px] lg:w-[450px] gap-2">
                <div className="w-full" >
                    <SearchInput value={search} onChange={setSearch} />
                </div>
                <div >
                    <Modal>
                        <Modal.Open>
                            <button className="btn flex items-center sm:gap-2 text-sm sm:text-base md:text-lg py-3 sm:py-2 text-nowrap text-white bg-blue-600">
                                <PlusIcon className="w-4 sm:w-6 shrink-0" />
                                افزودن نوبت
                            </button>
                        </Modal.Open>
                        <Modal.Window>
                            <AddAppointmentForm />
                        </Modal.Window>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default HeaderAppoint;