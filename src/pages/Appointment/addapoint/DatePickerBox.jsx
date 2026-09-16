
import DatePickerPackage from "react-multi-date-picker";
import DateObject from "react-date-object";
import { FaCalendarAlt } from "react-icons/fa";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePicker = DatePickerPackage.default || DatePickerPackage;

export default function DatePickerBox({ date, setDate }) {
    const today = new DateObject({ calendar: persian, locale: persian_fa });

    const handleToday = () => {
        setDate(new DateObject({ calendar: persian, locale: persian_fa }));
    };

    return (
      
<div className="flex flex-wrap items-center gap-3">
    <button type="button" onClick={handleToday} className="group flex h-12 items-center gap-2 rounded-2xl bg-[#daa400] px-5 text-sm font-bold text-white shadow-[0_5px_18px_rgba(218,164,0,0.22)] hover:bg-[#007c3a] ">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition group-hover:bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
            </svg>
        </span>
        امروز
    </button>

    <DatePicker
        value={date}
        onChange={(value) => setDate(value || null)}
        calendar={persian}
        locale={persian_fa}
        minDate={today}
        onlyCalendar
        format="D MMMM YYYY"
        render={(value, openCalendar) => (
            <button type="button" onClick={openCalendar} className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-[#daa400]/40 bg-white text-[#daa400] hover:border-[#daa400] hover:bg-[#daa400] hover:text-white ">
                <FaCalendarAlt className="text-[20px]" />
            </button>
        )}
    />

    {date && (
        <div className="flex h-12 items-center gap-2 rounded-2xl border border-[#daa400]/20 bg-[#fffdf5] px-4 shadow-[0_4px_16px_rgba(0,0,0,0.035)]">
            <span className="text-xs font-medium text-slate-400">تاریخ انتخاب‌شده</span>
            <span className="h-5 w-px bg-[#daa400]/20"></span>
            <span className="text-sm font-bold tracking-wide text-[#007c3a]">{date.format("YYYY/MM/DD")}</span>
        </div>
    )}
</div>

    );
}
