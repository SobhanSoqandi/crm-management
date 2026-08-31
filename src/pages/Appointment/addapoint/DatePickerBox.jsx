
import DatePickerPackage from "react-multi-date-picker";
import DateObject from "react-date-object";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePicker =
    DatePickerPackage.default ||
    DatePickerPackage;

export default function DatePickerBox({
    date,
    setDate,
}) {
    /*
    |--------------------------------------------------------------------------
    | Today
    |--------------------------------------------------------------------------
    */

    const today = new DateObject({
        calendar: persian,
        locale: persian_fa,
    });

    /*
    |--------------------------------------------------------------------------
    | Today button
    |--------------------------------------------------------------------------
    */

    const handleToday = () => {
        /*
        یک DateObject جدید می‌سازیم تا
        reference قبلی استفاده نشود.
        */

        const todayDate = new DateObject({
            calendar: persian,
            locale: persian_fa,
        });

        setDate(todayDate);
    };

    return (
        <div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <DatePicker
                    value={date}
                    onChange={(value) => {
                        /*
                        اگر کاربر تاریخ را پاک کرد،
                        چیزی ثبت نکن.
                        */

                        if (!value) {
                            setDate(null);
                            return;
                        }

                        setDate(value);
                    }}
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
                className="
                    mt-3
                    rounded-xl
                    border
                    border-[#daa400]
                    bg-[#F6E9B2]
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-[#007c3a]
                    transition
                    hover:bg-[#7ABA78]
                "
            >
                امروز
            </button>

            {date && (
                <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    تاریخ انتخاب‌شده:
                    <span className="mr-2 font-bold text-slate-800">
                        {date.format(
                            "YYYY/MM/DD"
                        )}
                    </span>
                </div>
            )}
        </div>
    );
}
