import { HiOutlineSearch } from "react-icons/hi";

function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <HiOutlineSearch
        size={22}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e4ab00]"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جستجوی   شماره موبایل مشتری ..."
        className="
          w-full
          h-12
          rounded-2xl
          border
          border-[#e4ab00]
          bg-white
          pr-12
          pl-4
          text-sm
          outline-none
          transition-all
          duration-200
          placeholder:text-zinc-400
          focus:border-[#ffbf00]
          focus:ring-1
          focus:ring-[#ffbf00]
        "
      />
    </div>
  );
}

export default SearchInput;


// import { TbSearch } from 'react-icons/tb';
// import { useSearchParams } from 'react-router-dom';

// function SearchInput({ paramName = "search", placeholder = "جستجوی شماره تلفن مشتری" }) {

//   const [searchParams, setSearchParams] = useSearchParams();

//   const searchValue = searchParams.get(paramName) || "";

//   function handleChange(e) {
//     const value = e.target.value.trim();

//     if (value) {
//       searchParams.set(paramName, value);
//     } else {
//       searchParams.delete(paramName);
//     }

//     setSearchParams(searchParams);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   return (
//     <form onSubmit={handleSubmit} className="w-full">
//       <div className="relative w-full">
//         <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-400">
//           <TbSearch className='text-2xl' />
//         </div>

//         <input
//           type="text"
//           value={searchValue}
//           onChange={handleChange}
//           placeholder={placeholder}
//           className="  w-full
//            h-12
//            rounded-2xl
//            border
//            border-zinc-200
//            bg-white
//            pr-12
//            pl-4
//            text-sm
//            outline-none
//            transition-all
//            duration-200
//            placeholder:text-zinc-400
//            focus:border-emberland-700
//            focus:ring-1
//            focus:ring-emberland-700"
//         />
//       </div>
//     </form>
//   )
// }

// export default SearchInput