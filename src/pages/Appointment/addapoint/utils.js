export function generateHours() {
    return Array.from({ length: 24 }, (_, index) => index);
}

export function generateMinutes() {
    return Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, "0"));
}

export function generateTimes() {
    const times = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 5) {
            times.push({
                hour,
                minute: String(minute).padStart(2, "0"),
                value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
            });
        }
    }

    return times;
}

export function getRoundedCurrentTime() {
    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();

    minute = Math.ceil(minute / 5) * 5;

    if (minute === 60) {
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

export function isPastTime(date, hour, minute) {
    if (!date) return false;

    const selectedDate = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();

    const sameDay =
        selectedDate.getFullYear() === now.getFullYear() &&
        selectedDate.getMonth() === now.getMonth() &&
        selectedDate.getDate() === now.getDate();

    if (!sameDay) return false;

    const selectedHour = Number(hour);
    const selectedMinute = Number(minute);

    return (
        selectedHour < now.getHours() ||
        (selectedHour === now.getHours() && selectedMinute < now.getMinutes())
    );
}