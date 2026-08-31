const numberFormatter = new Intl.NumberFormat("fa-IR");

export const formatnumber = {
  // تبدیل عدد به فارسی با جداکننده هزارگان
  number(value) {
    if (value === null || value === undefined || value === "") return "";
    return numberFormatter.format(Number(value));
  },

  // فقط تبدیل اعداد انگلیسی به فارسی
  digits(value) {
    if (value === null || value === undefined) return "";

    return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  },

  // قیمت
  price(value, currency = "تومان") {
    if (value === null || value === undefined || value === "")
      return `۰ ${currency}`;

    return `${numberFormatter.format(Number(value))} ${currency}`;
  },

  // تاریخ کامل (روز، ماه، سال - راست‌به‌چپ)
  date(value) {
    if (!value) return "";

    const parts = new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).formatToParts(new Date(value));

    const get = (type) => parts.find((p) => p.type === type)?.value || "";

    return `${get("weekday")}، ${get("day")} ${get("month")} ${get("year")}`;
  },

  // تاریخ کوتاه (روز، ماه - راست‌به‌چپ)
  shortDate(value) {
    if (!value) return "";

    const parts = new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      day: "numeric",
    }).formatToParts(new Date(value));

    const get = (type) => parts.find((p) => p.type === type)?.value || "";

    return `${get("day")} ${get("month")}`;
  },

  // ساعت
  time(value) {
    if (!value) return "";

    if (typeof value === "string") {
      return value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
    }

    return new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  },
};