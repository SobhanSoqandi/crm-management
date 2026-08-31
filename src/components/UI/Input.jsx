

// function Input({ type, label, placeholder, name, register, validationSchema = {}, errors }) {
//     return (
//         <div>
//             <label htmlFor={label} className="block my-2 text-sm text-[#00000]">{label}</label>
//             <input
//                 {...register(name, validationSchema)}
//                 id={label}
//                 type={type}
//                 placeholder={placeholder}
//                 className="input--style"
//             />
//             {errors && errors[name] && (
//                 <span className="text-error block text-sm mt-2">
//                     {errors[name]?.message}
//                 </span>
//             )}
//         </div>

//     )
// }

// export default Input;

import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

function Input({ 
  type = "text", 
  label, 
  placeholder, 
  name, 
  register, 
  validationSchema = {}, 
  errors,
  isPassword = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword 
    ? (showPassword ? "text" : "password")
    : type;

  return (
    <div>
      <label htmlFor={label} className="block my-2 text-sm text-[#000000]">
        {label}
      </label>
      <div className="relative">
        <input
          {...register(name, validationSchema)}
          id={label}
          type={inputType}
          placeholder={placeholder}
          className={`input--style ${isPassword ? "pl-10" : ""}`} 
        />
        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-emerald-800"
          >
            {showPassword ? <FaEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
      {errors && errors[name] && (
        <span className="text-rose-500 block text-sm mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default Input;