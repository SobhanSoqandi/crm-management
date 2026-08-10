import { useMemo, useState } from "react";
import { getToday, getTomorrow, isSameDay, formatLongJalali } from "./dateUtils";

// state و منطق تاریخ رو از کامپوننت جدا نگه می‌داره تا کامپوننت فقط UI باشه
export default function useAppointmentDate(initialDate) {
  const [selectedDate, setSelectedDate] = useState(initialDate || getToday());

  const label = useMemo(() => {
    if (isSameDay(selectedDate, getToday())) return "امروز";
    if (isSameDay(selectedDate, getTomorrow())) return "فردا";
    return formatLongJalali(selectedDate);
  }, [selectedDate]);

  const isToday = isSameDay(selectedDate, getToday());
  const isTomorrow = isSameDay(selectedDate, getTomorrow());

  return { selectedDate, setSelectedDate, label, isToday, isTomorrow };
}
