
import { formatnumber } from "../../Utils/ToPersianNumber";
import { FiSearch } from "react-icons/fi";


const toEnglishDigits = (str) =>
  String(str)
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/\D/g, "");

function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <FiSearch size={22} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b78900]" />

      <input
        type="text"
        inputMode="numeric"
        value={formatnumber.digits(value)}
        onChange={(e) => onChange(toEnglishDigits(e.target.value))}
        placeholder="جستجوی شماره موبایل مشتری ..."
        className="w-full h-12 rounded-2xl border border-cyan-500 text-teal-500 bg-white pr-12 pl-4 text-sm outline-none transition-all duration-200 placeholder:text-cyan-500 focus:border-[#f6b800] focus:ring-1 focus:ring-[#edb200]"
      />
    </div>
  );
}

export default SearchInput;