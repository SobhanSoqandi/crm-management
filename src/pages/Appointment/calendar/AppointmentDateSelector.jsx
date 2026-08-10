import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { JALALI_CONFIG, getToday, getTomorrow } from "./dateUtils";
import useAppointmentDate from "./useAppointmentDate";
import { FaCalendarDay } from "react-icons/fa";
import { HiOutlineCalendarDays } from "react-icons/hi2";

export default function AppointmentDateSelector({ value, onChange }) {
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedDate, setSelectedDate, isToday, isTomorrow, label } =
    useAppointmentDate(value);

  const activeDate = value ?? selectedDate;

  function selectDate(date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  function selectDateAndClose(date) {
    selectDate(date);
    setIsOpen(false);
  }

  // بستن تقویم با کلیک بیرون از آن
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

      <div className="apt-calendar-wrapper">
        <button
          type="button"
          className={`apt-chip flex gap-2 ${!isToday && !isTomorrow ? "is-active" : ""}`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <HiOutlineCalendarDays className="text-xl md:text-2xl" />
          تقویم
          {/* {!isToday && !isTomorrow ? label : "  "} */}
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
