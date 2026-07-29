import clsx from "clsx";

function DayTimeline({ days, selectedDay, onSelect }) {
  return (
    <div
      className="
        flex
        gap-2
        overflow-x-auto
        pb-2
        scrollbar-none
        snap-x
        snap-mandatory
      "
    >
      {days.map((day) => {
        const active = selectedDay === day.id;

        return (
          <button
            key={day.id}
            onClick={() => onSelect(day.id)}
            className={clsx(
              `
              m-1
              min-w-[110px]
              rounded-3xl
              border
              p-1.5
              text-center
              transition-all
              duration-300
              snap-center
              flex-shrink-0
              `,
              active
                ? `
                  bg-blue-500
                  border-blue-500
                  text-white
                  shadow-xl
                  scale-105
                `
                : `
                  bg-white
                  border-zinc-200
                  hover:bg-zinc-50
                  hover:border-zinc-300
                `
            )}
          >
            <p
              className={clsx(
                "text-xs mb-2",
                active ? "text-zinc-300" : "text-zinc-500"
              )}
            >
              {day.title}
            </p>

            <h3 className="font-bold text-base">
              {day.weekDay}
            </h3>

            <p
              className={clsx(
                "text-sm mt-1",
                active ? "text-zinc-300" : "text-zinc-500"
              )}
            >
              {day.date}
            </p>

            <div
              className={clsx(
                `
                mt-4
                rounded-full
                px-3
                py-1
                text-xs
                inline-flex
                items-center
                gap-1
                `,
                active
                  ? "bg-white/15 text-white"
                  : "bg-zinc-100 text-zinc-600"
              )}
            >
              <span
                className={clsx(
                  `
                  h-2
                  w-2
                  rounded-full
                  `,
                  active ? "bg-green-400" : "bg-green-700"
                )}
              />

              {day.appointments} نوبت
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default DayTimeline;