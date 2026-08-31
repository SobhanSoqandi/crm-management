
import { useState } from "react";

import ClockCircle from "./ClockCircle";

export default function TimePickerCircle({
    date,
    time,
    setTime,
}) {
    const [mode, setMode] =
        useState("hour");

    /*
    |--------------------------------------------------------------------------
    | Select hour / minute
    |--------------------------------------------------------------------------
    */

    const selectValue = (value) => {
        if (mode === "hour") {
            setTime((prev) => ({
                ...prev,
                hour: Number(value),
            }));

            setMode("minute");

            return;
        }

        setTime((prev) => ({
            ...prev,
            minute: String(value).padStart(
                2,
                "0"
            ),
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Change hour
    |--------------------------------------------------------------------------
    */

    const selectHourMode = () => {
        setMode("hour");
    };

    /*
    |--------------------------------------------------------------------------
    | Change minute
    |--------------------------------------------------------------------------
    */

    const selectMinuteMode = () => {
        if (
            time.hour === null ||
            time.hour === undefined
        ) {
            return;
        }

        setMode("minute");
    };

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Mode title */}

            <div className="text-sm font-semibold text-[#0A6847]">
                {mode === "hour"
                    ? "انتخاب ساعت"
                    : "انتخاب دقیقه"}
            </div>

            {/* Clock */}

            <ClockCircle
                mode={mode}
                date={date}
                time={time}
                onSelect={selectValue}
            />

            {/* Selected time */}

            <div className="flex flex-row-reverse items-center gap-3">
                {/* Hour */}

                <button
                    type="button"
                    onClick={selectHourMode}
                    className={`
                        rounded-xl
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        transition
                        ${mode === "hour"
                            ? "bg-[#dba400] text-white"
                            : "bg-[#F6E9B2] text-[#0a6874]"
                        }
                    `}
                >
                    {time.hour !== null &&
                        time.hour !== undefined
                        ? String(
                            time.hour
                        ).padStart(2, "0")
                        : "--"}
                </button>

                <span className="text-xl">
                    :
                </span>

                {/* Minute */}

                <button
                    type="button"
                    disabled={
                        time.hour === null ||
                        time.hour === undefined
                    }
                    onClick={
                        selectMinuteMode
                    }
                    className={`
                        rounded-xl
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        transition
                        ${mode === "minute"
                            ? "bg-[#dba400] text-white"
                            : "bg-[#F6E9B2] text-[#0a6874]"}

                        ${time.hour ===
                            null ||
                            time.hour ===
                            undefined
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }
                    `}
                >
                    {time.minute !== null &&
                        time.minute !== undefined
                        ? String(
                            time.minute
                        ).padStart(2, "0")
                        : "--"}
                </button>
            </div>
        </div>
    );
}
