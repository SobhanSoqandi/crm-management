import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { JALALI_CONFIG, getToday, getTomorrow, isSameDay } from "./dateUtils";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import "./calendar.css";

export default function AppointmentDateSelector({ value, onChange }) {
  const wrapperRef = useRef(null);
  const calendarButtonRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, right: 0 });

  const [calendarAnchor] = useState(getToday());

  const isAll = value === null;
  const isToday = value ? isSameDay(value, getToday()) : false;
  const isTomorrow = value ? isSameDay(value, getTomorrow()) : false;

  const activeDate = value ?? calendarAnchor;


  function openCalendar() {
  if (!isOpen && calendarButtonRef.current) {
    const rect = calendarButtonRef.current.getBoundingClientRect();

    const isMobile = window.innerWidth <= 640;

    if (isMobile) {
      setCalendarPosition({
        top: rect.bottom + 8,
        right: 12,
      });
    } else {
      setCalendarPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }

  setIsOpen((open) => !open);
}
  function selectDateAndClose(date) {
    onChange?.(date);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !event.target.closest(".apt-calendar-popover")
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleResize() {
      if (isOpen && calendarButtonRef.current) {
        const rect = calendarButtonRef.current.getBoundingClientRect();

        setCalendarPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
          ref={calendarButtonRef}
          type="button"
          className={`apt-chip flex gap-1 ${
            !isToday && !isTomorrow && !isAll ? "is-active" : ""
          }`}
          onClick={openCalendar}
        >
          <HiOutlineCalendarDays className="text-xl md:text-2xl" />
          تقویم
        </button>

       {isOpen && (
  <div
    className="apt-calendar-popover"
    style={{
      top: `${calendarPosition.top}px`,
      right: `${calendarPosition.right}px`,
    }}
  >
    <div className="apt-calendar-inner">
      <Calendar
        value={activeDate}
        onChange={selectDateAndClose}
        calendar={JALALI_CONFIG.calendar}
        locale={JALALI_CONFIG.locale}
      />
    </div>
  </div>
)}
      </div>
    </div>
  );
}