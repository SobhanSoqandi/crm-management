import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { JALALI_CONFIG, getToday, getTomorrow, isSameDay } from "./dateUtils";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import "./calendar.css";

export default function AppointmentDateSelector({ value, onChange }) {
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [calendarAnchor] = useState(getToday());

  const isAll = value === null;
  const isToday = value ? isSameDay(value, getToday()) : false;
  const isTomorrow = value ? isSameDay(value, getTomorrow()) : false;

  const activeDate = value ?? calendarAnchor;

  function selectDateAndClose(date) {
    onChange?.(date);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="apt-date-selector" ref={wrapperRef}>
      <button
        type="button"
        className={`apt-chip ${isToday ? "is-active" : ""}`}
        onClick={() => selectDateAndClose(getToday())}
      >
        امروز
      </button>

      <button
        type="button"
        className={`apt-chip ${isTomorrow ? "is-active" : ""}`}
        onClick={() => selectDateAndClose(getTomorrow())}
      >
        فردا
      </button>

      <button
        type="button"
        className={`apt-chip ${isAll ? "is-active" : ""}`}
        onClick={() => selectDateAndClose(null)}
      >
        همه‌ی نوبت‌ها
      </button>

      <div className="apt-calendar-wrapper">
        <button
          type="button"
          className={`apt-chip flex gap-1 ${!isToday && !isTomorrow && !isAll ? "is-active" : ""}`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <HiOutlineCalendarDays className="text-xl md:text-2xl" />
          تقویم
        </button>

        {isOpen && (
          <div className="apt-calendar-popover">
            <Calendar
              value={activeDate}
              onChange={selectDateAndClose}
              calendar={JALALI_CONFIG.calendar}
              locale={JALALI_CONFIG.locale}
            />
          </div>
        )}
      </div>
    </div>
  );
}