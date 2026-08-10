import { useState } from "react";
import DatePickerPackage from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlineXMark,
} from "react-icons/hi2";

import TimePickerCircle from "./TimePickerCircle";
import { getRoundedCurrentTime } from "./utils";

const DatePicker = DatePickerPackage.default || DatePickerPackage;

export default function AppointmentDateTimeSelect({
    name,
    register,
    errors,
    validationSchema,
}) {
    const currentTime = getRoundedCurrentTime();

    const today = new DateObject({
        calendar: persian,
        locale: persian_fa,
    });

    const [date, setDate] = useState(today);

    const [time, setTime] = useState({
        hour: currentTime.hour,
        minute: currentTime.minute,
    });

    const [dateOpen, setDateOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);

    const [tempDate, setTempDate] = useState(date);
    const [tempTime, setTempTime] = useState(time);

    const value = JSON.stringify({
        date: date?.format("YYYY/MM/DD") || "",
        time: `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`,
    });

    const openDatePicker = () => {
        setTempDate(date);
        setDateOpen((prev) => !prev);
        setTimeOpen(false);
    };

    const openTimePicker = () => {
        setTempTime(time);
        setTimeOpen(true);
        setDateOpen(false);
    };

    const confirmDate = () => {
        setDate(tempDate);
        setDateOpen(false);
    };

    const cancelDate = () => {
        setTempDate(date);
        setDateOpen(false);
    };

    const confirmTime = () => {
        setTime(tempTime);
        setTimeOpen(false);
    };

    const cancelTime = () => {
        setTempTime(time);
        setTimeOpen(false);
    };

    const handleDateChange = (value) => {
        if (!value) return;

        setTempDate(value);
    };

    const handleToday = () => {
        setTempDate(today);
    };

    return (
        <div>
            <input
                type="hidden"
                value={value}
                {...register(name, validationSchema)}
            />

            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <HiOutlineCalendarDays className="text-xl text-blue-600" />
                <span>زمان مراجعه</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* تاریخ مراجعه */}
                <div className="relative">

                    <div
                        className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 ${dateOpen ? "border-blue-400 shadow-md shadow-blue-100" : "border-slate-200 hover:border-blue-300 hover:shadow-md"}`}
                    >

                        <div className="flex items-center">

                            <button
                                type="button"
                                onClick={openDatePicker}
                                className="flex h-14 min-w-0 flex-1 items-center gap-3 p-3.5 text-right"
                            >
                                <div className={`flex h-10 shrink-0 items-center justify-center rounded-xl transition-colors ${dateOpen ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"}`}>
                                    <HiOutlineCalendarDays className="text-2xl w-10" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-slate-400">
                                        تاریخ مراجعه
                                    </p>

                                    <p className="mt-1 truncate text-sm font-bold text-slate-800">
                                        {date.format("dddd D MMMM YYYY")}
                                    </p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={handleToday}
                                className="ml-3 mr-1 shrink-0 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                            >
                                امروز
                            </button>

                        </div>

                    </div>

                    {dateOpen && (
                        <div className="mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/70">

                            <div className="overflow-hidden rounded-2xl bg-slate-50 p-2">

                                <DatePicker
                                    value={tempDate}
                                    onChange={handleDateChange}
                                    calendar={persian}
                                    locale={persian_fa}
                                    minDate={today}
                                    onlyCalendar
                                    format="D MMMM YYYY"
                                />

                            </div>

                            <div className="mt-3 flex gap-2">

                                <button
                                    type="button"
                                    onClick={cancelDate}
                                    className="btn btn--light flex-1"
                                >
                                    لغو
                                </button>

                                <button
                                    type="button"
                                    onClick={confirmDate}
                                    className="btn btn--primary flex-1 bg-blue-600"
                                >
                                    تأیید
                                </button>

                            </div>

                        </div>
                    )}

                </div>


                {/* ساعت مراجعه */}
                <div>

                    <button
                        type="button"
                        onClick={openTimePicker}
                        className={`flex h-14 w-full items-center gap-3 rounded-2xl border bg-white p-3.5 text-right shadow-sm transition-all duration-200 ${timeOpen ? "border-blue-400 shadow-md shadow-blue-100" : "border-slate-200 hover:border-blue-300 hover:shadow-md"}`}
                    >
                        <div className={`flex h-10 shrink-0 items-center justify-center rounded-xl transition-colors ${timeOpen ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"}`}>
                            <HiOutlineClock className="text-2xl w-10" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-400">
                                ساعت مراجعه
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-800">
                                {String(time.hour).padStart(2, "0")}:
                                {String(time.minute).padStart(2, "0")}
                            </p>
                        </div>
                    </button>

                </div>

            </div>


            {errors?.[name] && (
                <p className="mt-2 text-xs text-red-500">
                    {errors[name].message}
                </p>
            )}


            {/* انتخاب ساعت */}
            {timeOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">

                    <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">

                        <div className="mb-4 flex items-center justify-between">

                            <div>
                                <h3 className="text-base font-bold text-slate-800">
                                    انتخاب ساعت
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    ساعت مراجعه را انتخاب کنید
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={cancelTime}
                                className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
                            >
                                <HiOutlineXMark className="text-xl" />
                            </button>

                        </div>

                        <TimePickerCircle
                            date={tempDate}
                            time={tempTime}
                            setTime={setTempTime}
                        />

                        <div className="mt-5 flex gap-3">

                            <button
                                type="button"
                                onClick={cancelTime}
                                className="btn btn--light flex-1"
                            >
                                لغو
                            </button>

                            <button
                                type="button"
                                onClick={confirmTime}
                                className="btn btn--primary flex-1 bg-blue-600"
                            >
                                تأیید
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}