import DatePickerPackage from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePicker = DatePickerPackage.default || DatePickerPackage;

export default function DatePickerBox({ date, setDate }) {
    const today = new DateObject({
        calendar: persian,
        locale: persian_fa,
    });

    const handleToday = () => {
        setDate(today);
    };

    return (
        <div className="bg-red-500">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <DatePicker
                    value={date}
                    onChange={setDate}
                    calendar={persian}
                    locale={persian_fa}
                    minDate={today}
                    onlyCalendar
                    format="D MMMM YYYY"
                />
            </div>

            <button
                type="button"
                onClick={handleToday}
                className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
            >
                امروز
            </button>

        </div>
    );
}