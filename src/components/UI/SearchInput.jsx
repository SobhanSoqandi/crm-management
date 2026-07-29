import { HiOutlineSearch } from "react-icons/hi";

function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <HiOutlineSearch
        size={22}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جستجوی نام مشتری، شماره موبایل..."
        className="
          w-full
          h-12
          rounded-2xl
          border
          border-zinc-200
          bg-white
          pr-12
          pl-4
          text-sm
          outline-none
          transition-all
          duration-200
          placeholder:text-zinc-400
          focus:border-blue-500
          focus:ring-1
          focus:ring-blue-500
        "
      />
    </div>
  );
}

export default SearchInput;