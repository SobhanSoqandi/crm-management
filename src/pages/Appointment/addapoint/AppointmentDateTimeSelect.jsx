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

const DatePicker =
    DatePickerPackage.default || DatePickerPackage;

export default function AppointmentDateTimeSelect({
    name,
    register,
    setValue,
    errors,
    validationSchema,
}) {
    const today = new DateObject({
        calendar: persian,
        locale: persian_fa,
    });

    const currentTime = getRoundedCurrentTime();

    const [date, setDate] = useState(today);

    const [time, setTime] = useState({
        hour: currentTime.hour,
        minute: currentTime.minute,
    });

    const [dateOpen, setDateOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);

    const [tempDate, setTempDate] = useState(today);

    const [tempTime, setTempTime] = useState({
        hour: currentTime.hour,
        minute: currentTime.minute,
    });

    /*
    |--------------------------------------------------------------------------
    | مقدار اولیه فرم
    |--------------------------------------------------------------------------
    */

    const getDateValue = (selectedDate) => {
        if (!selectedDate) {
            return "";
        }

        return selectedDate.format("YYYY/MM/DD");
    };

    const getTimeValue = (selectedTime) => {
        if (
            selectedTime?.hour === null ||
            selectedTime?.hour === undefined ||
            selectedTime?.minute === null ||
            selectedTime?.minute === undefined
        ) {
            return "";
        }

        return `${String(selectedTime.hour).padStart(
            2,
            "0"
        )}:${String(selectedTime.minute).padStart(
            2,
            "0"
        )}`;
    };

    /*
    |--------------------------------------------------------------------------
    | تاریخ
    |--------------------------------------------------------------------------
    */

    const openDatePicker = () => {
        setTempDate(date);
        setDateOpen(true);
        setTimeOpen(false);
    };

    const handleDateChange = (value) => {
        if (!value) {
            return;
        }

        setTempDate(value);
    };

    const handleToday = () => {
        setTempDate(today);
    };

    const confirmDate = () => {
        setDate(tempDate);

        /*
        تاریخ نهایی را داخل React Hook Form قرار می‌دهیم.
        */

        setValue(
            name,
            JSON.stringify({
                date: getDateValue(tempDate),
                time: getTimeValue(time),
            }),
            {
                shouldValidate: true,
                shouldDirty: true,
            }
        );

        setDateOpen(false);
    };

    const cancelDate = () => {
        setTempDate(date);
        setDateOpen(false);
    };

    /*
    |--------------------------------------------------------------------------
    | ساعت
    |--------------------------------------------------------------------------
    */

    const openTimePicker = () => {
        setTempTime(time);
        setTimeOpen(true);
        setDateOpen(false);
    };

    const confirmTime = () => {
        /*
        اول state اصلی را آپدیت می‌کنیم.
        */

        setTime(tempTime);

        /*
        مقدار نهایی تاریخ + ساعت را مستقیماً
        داخل React Hook Form ذخیره می‌کنیم.
        */

        setValue(
            name,
            JSON.stringify({
                date: getDateValue(date),
                time: getTimeValue(tempTime),
            }),
            {
                shouldValidate: true,
                shouldDirty: true,
            }
        );

        setTimeOpen(false);
    };

    const cancelTime = () => {
        setTempTime(time);
        setTimeOpen(false);
    };

    /*
    |--------------------------------------------------------------------------
    | مقدار اولیه React Hook Form
    |--------------------------------------------------------------------------
    */

    const registeredField = register(
        name,
        validationSchema
    );

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div>
            {/* Hidden input فقط برای register شدن در RHF */}
            <input
                type="hidden"
                {...registeredField}
            />

            {/* عنوان */}
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <HiOutlineCalendarDays className="text-xl text-[#d6a100]" />

                <span>زمان مراجعه</span>
            </div>

            {/* تاریخ و ساعت */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* =========================
                    DATE
                ========================= */}
                <div className="relative">
                    <div
                        className={`
                            overflow-hidden
                            rounded-2xl
                            border
                            bg-white
                            shadow-sm
                            transition-all
                            duration-200
                            ${
                                dateOpen
                                    ? "border-yellow-400 shadow-md shadow-yellow-100"
                                    : "border-slate-200 hover:border-yellow-300 hover:shadow-md"
                            }
                        `}
                    >
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={openDatePicker}
                                className="
                                    flex
                                    h-14
                                    min-w-0
                                    flex-1
                                    items-center
                                    gap-3
                                    p-3.5
                                    text-right
                                "
                            >
                                <div
                                    className={`
                                        flex
                                        h-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${
                                            dateOpen
                                                ? "bg-yellow-500 text-white"
                                                : "bg-yellow-50 text-yellow-600"
                                        }
                                    `}
                                >
                                    <HiOutlineCalendarDays className="text-2xl" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-slate-400">
                                        تاریخ مراجعه
                                    </p>

                                    <p className="mt-1 truncate text-sm font-bold text-slate-800">
                                        {date.format(
                                            "dddd D MMMM YYYY"
                                        )}
                                    </p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={handleToday}
                                className="
                                    ml-3
                                    mr-1
                                    shrink-0
                                    rounded-lg
                                    bg-yellow-50
                                    px-2.5
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-yellow-600
                                    transition
                                    hover:bg-yellow-100
                                "
                            >
                                امروز
                            </button>
                        </div>
                    </div>

                    {dateOpen && (
                        <div className="mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-lg">
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
                                    className="btn btn--primary flex-1 bg-yellow-600"
                                >
                                    تأیید
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* =========================
                    TIME
                ========================= */}
                <div>
                    <button
                        type="button"
                        onClick={openTimePicker}
                        className={`
                            flex
                            h-14
                            w-full
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            bg-white
                            p-3.5
                            text-right
                            shadow-sm
                            transition-all
                            duration-200
                            ${
                                timeOpen
                                    ? "border-yellow-400 shadow-md shadow-yellow-100"
                                    : "border-slate-200 hover:border-yellow-300 hover:shadow-md"
                            }
                        `}
                    >
                        <div
                            className={`
                                flex
                                h-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                ${
                                    timeOpen
                                        ? "bg-yellow-500 text-white"
                                        : "bg-yellow-50 text-yellow-600"
                                }
                            `}
                        >
                            <HiOutlineClock className="text-2xl" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-400">
                                ساعت مراجعه
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-800">
                                {String(time.hour).padStart(
                                    2,
                                    "0"
                                )}
                                :
                                {String(time.minute).padStart(
                                    2,
                                    "0"
                                )}
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            {/* خطای فرم */}
            {errors?.[name] && (
                <p className="mt-2 text-xs text-red-500">
                    {errors[name].message}
                </p>
            )}

            {/* =========================
                TIME MODAL
            ========================= */}
            {timeOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
                        {/* Header */}
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
                                className="
                                    rounded-full
                                    bg-slate-100
                                    p-2
                                    text-slate-500
                                    transition
                                    hover:bg-slate-200
                                "
                            >
                                <HiOutlineXMark className="text-xl" />
                            </button>
                        </div>

                        {/* Clock */}
                        <TimePickerCircle
                            date={date}
                            time={tempTime}
                            setTime={setTempTime}
                        />

                        {/* Buttons */}
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
                                className="btn btn--primary flex-1 bg-yellow-600"
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