
import {
    generateHours,
    generateMinutes,
    isPastTime,
} from "./utils";

export default function ClockCircle({
    mode,
    date,
    time,
    onSelect,
}) {
    /*
    |--------------------------------------------------------------------------
    | Clock values
    |--------------------------------------------------------------------------
    */

    const values =
        mode === "hour"
            ? generateHours().map((hour) =>
                  String(hour).padStart(
                      2,
                      "0"
                  )
              )
            : generateMinutes();

    return (
        <div
            className="
                relative
                h-72
                w-72
                rounded-full
                border
                border-slate-200
                bg-slate-50
            "
        >
            {values.map(
                (item, index) => {
                    const angle =
                        (360 /
                            values.length) *
                        index;

                    const x =
                        50 +
                        42 *
                            Math.sin(
                                (angle *
                                    Math.PI) /
                                    180
                            );

                    const y =
                        50 -
                        42 *
                            Math.cos(
                                (angle *
                                    Math.PI) /
                                    180
                            );

                    /*
                    |--------------------------------------------------------------------------
                    | Past time
                    |--------------------------------------------------------------------------
                    */

                    const disabled =
                        mode === "hour"
                            ? isPastTime(
                                  date,
                                  Number(item),
                                  0
                              )
                            : isPastTime(
                                  date,
                                  time.hour,
                                  Number(item)
                              );

                    /*
                    |--------------------------------------------------------------------------
                    | Selected
                    |--------------------------------------------------------------------------
                    */

                    const selected =
                        mode === "hour"
                            ? Number(
                                  time.hour
                              ) ===
                              Number(item)
                            : Number(
                                  time.minute
                              ) ===
                              Number(item);

                    return (
                        <button
                            key={item}
                            type="button"
                            disabled={
                                disabled
                            }
                            onClick={() =>
                                onSelect(
                                    item
                                )
                            }
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                            }}
                            className={`
                                cursor-pointer
                                absolute
                                flex
                                h-10
                                w-10
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                text-sm
                                transition

                                ${
                                    selected
                                        ? "scale-110 bg-[#dba400] text-white shadow-lg"
                                        : "bg-white hover:bg-[#F6E9B2]"
                                }

                                ${
                                    disabled
                                        ? "cursor-not-allowed opacity-30"
                                        : ""
                                }
                            `}
                        >
                            {item}
                        </button>
                    );
                }
            )}

            {/* Center */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    h-16
                    w-16
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-[#dba400]
                    font-bold
                    text-white
                "
            >
                {time.hour !== null &&
                time.hour !== undefined
                    ? String(
                          time.hour
                      ).padStart(2, "0")
                    : "--"}

                :

                {time.minute !== null &&
                time.minute !== undefined
                    ? String(
                          time.minute
                      ).padStart(2, "0")
                    : "--"}
            </div>
        </div>
    );
}
