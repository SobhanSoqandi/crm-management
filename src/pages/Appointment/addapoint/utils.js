
/*
|--------------------------------------------------------------------------
| Generate hours
|--------------------------------------------------------------------------
*/

export function generateHours() {
    return Array.from(
        { length: 24 },
        (_, index) => index
    );
}

/*
|--------------------------------------------------------------------------
| Generate minutes
|--------------------------------------------------------------------------
*/

export function generateMinutes() {
    return Array.from(
        { length: 12 },
        (_, index) =>
            String(index * 5).padStart(2, "0")
    );
}

/*
|--------------------------------------------------------------------------
| Generate all times
|--------------------------------------------------------------------------
*/

export function generateTimes() {
    const times = [];

    for (let hour = 0; hour < 24; hour++) {
        for (
            let minute = 0;
            minute < 60;
            minute += 5
        ) {
            const formattedHour =
                String(hour).padStart(2, "0");

            const formattedMinute =
                String(minute).padStart(2, "0");

            times.push({
                hour,

                minute: formattedMinute,

                value: `${formattedHour}:${formattedMinute}`,
            });
        }
    }

    return times;
}

/*
|--------------------------------------------------------------------------
| Get rounded current time
|--------------------------------------------------------------------------
*/

export function getRoundedCurrentTime() {
    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();

    minute = Math.ceil(minute / 5) * 5;

    if (minute >= 60) {
        minute = 0;
        hour += 1;
    }

    if (hour >= 24) {
        hour = 23;
        minute = 55;
    }

    return {
        hour,
        minute: String(minute).padStart(2, "0"),
    };
}

/*
|--------------------------------------------------------------------------
| Is past time
|--------------------------------------------------------------------------
*/

export function isPastTime(date, hour, minute) {
    if (!date) {
        return false;
    }

    const selectedDate = date?.toDate
        ? date.toDate()
        : new Date(date);

    const now = new Date();

    const sameDay =
        selectedDate.getFullYear() ===
            now.getFullYear() &&
        selectedDate.getMonth() ===
            now.getMonth() &&
        selectedDate.getDate() ===
            now.getDate();

    /*
    | تاریخ آینده
    | همه ساعت‌ها آزاد هستند.
    */

    if (!sameDay) {
        return false;
    }

    const selectedHour = Number(hour);
    const selectedMinute = Number(minute);

    const selectedTotalMinutes =
        selectedHour * 60 + selectedMinute;

    const currentTotalMinutes =
        now.getHours() * 60 + now.getMinutes();

    return (
        selectedTotalMinutes <=
        currentTotalMinutes
    );
}

/*
|--------------------------------------------------------------------------
| Build start_time
|--------------------------------------------------------------------------
|
| مهم:
|
| اینجا عمداً از toISOString() استفاده نمی‌کنیم.
|
| چون toISOString() زمان را به UTC تبدیل می‌کند.
|
| مثال:
|
| انتخاب کاربر:
| 07:55
|
| خروجی:
| 2026-08-11T07:55:00
|
|--------------------------------------------------------------------------
*/

export function buildStartTime(date, time) {
    if (!date) {
        return null;
    }

    if (
        time?.hour === null ||
        time?.hour === undefined
    ) {
        return null;
    }

    if (
        time?.minute === null ||
        time?.minute === undefined
    ) {
        return null;
    }

    const jsDate = date?.toDate
        ? date.toDate()
        : new Date(date);

    /*
    |--------------------------------------------------------------------------
    | Set selected time
    |--------------------------------------------------------------------------
    */

    jsDate.setHours(Number(time.hour));
    jsDate.setMinutes(Number(time.minute));
    jsDate.setSeconds(0);
    jsDate.setMilliseconds(0);

    /*
    |--------------------------------------------------------------------------
    | IMPORTANT
    |--------------------------------------------------------------------------
    |
    | به جای toISOString()
    | اجزای زمان محلی را خودمان می‌سازیم.
    |
    */

    const year = jsDate.getFullYear();

    const month = String(
        jsDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        jsDate.getDate()
    ).padStart(2, "0");

    const hour = String(
        jsDate.getHours()
    ).padStart(2, "0");

    const minute = String(
        jsDate.getMinutes()
    ).padStart(2, "0");

    const second = String(
        jsDate.getSeconds()
    ).padStart(2, "0");

    /*
    |--------------------------------------------------------------------------
    | Final value
    |--------------------------------------------------------------------------
    */

    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}
