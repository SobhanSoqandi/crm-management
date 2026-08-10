import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

// تنظیمات تقویم شمسی + زبان فارسی، یک بار تعریف می‌شود و همه‌جا استفاده می‌شود
export const JALALI_CONFIG = { calendar: persian, locale: persian_fa };

export function getToday() {
  return new DateObject(JALALI_CONFIG);
}

export function getTomorrow() {
  return new DateObject(JALALI_CONFIG).add(1, "day");
}

export function isSameDay(dateA, dateB) {
  if (!dateA || !dateB) return false;
  return dateA.format("YYYY/MM/DD") === dateB.format("YYYY/MM/DD");
}

// تبدیل ارقام لاتین به فارسی، برای اطمینان از نمایش صحیح (حتی اگر locale آن‌ها را ست نکند)
const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
export function toPersianDigits(input) {
  if (input == null) return "";
  return String(input).replace(/\d/g, (d) => PERSIAN_DIGITS[d]);
}

// مثال خروجی: "شنبه ۱۲ مرداد ۱۴۰۵"
export function formatLongJalali(dateObject) {
  if (!dateObject) return "";
  // return toPersianDigits(dateObject.format("dddd D MMMM YYYY"));
  return toPersianDigits(dateObject.format("dddd D MMMM "));
}

// مثال خروجی: "۱۲ مرداد ۱۴۰۵" (بدون نام روز هفته، برای جاهای فشرده‌تر)
export function formatShortJalali(dateObject) {
  if (!dateObject) return "";
  return toPersianDigits(dateObject.format("D MMMM YYYY"));
}

// مثال خروجی: "۱۴۰۵/۰۵/۱۲" (فرمت عددی شمسی، برای نمایش فشرده)
export function formatNumericJalali(dateObject) {
  if (!dateObject) return "";
  return toPersianDigits(dateObject.format("YYYY/MM/DD"));
}

// این فقط برای ارتباط با بک‌اند است — هرگز برای نمایش به کاربر استفاده نشود
export function toGregorianISO(dateObject) {
  if (!dateObject) return null;
  return dateObject.convert(gregorian, gregorian_en).format("YYYY-MM-DD");
}