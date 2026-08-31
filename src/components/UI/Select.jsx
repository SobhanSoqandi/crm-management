import React from "react";
import { HiChevronDown } from "react-icons/hi2";

function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  errors,
}) {
  return (
    <div>

      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">

        <select
          id={name}
          value={value}
          onChange={onChange}
          className={`
            h-12
            w-full
            appearance-none
            rounded-xl
            border
            bg-white
            px-4
            pl-10
            text-sm
            text-slate-700
            outline-none
            transition-all
            duration-200

            ${
              errors?.[name]
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 focus:border-[#e4ab00]"
            }

            focus:ring-1
            focus:ring-[#e4ab00]
          `}
        >

          {options.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}

        </select>

        <HiChevronDown
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-xl
            text-slate-400
          "
        />

      </div>

      {errors?.[name] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}

    </div>
  );
}

export default Select;