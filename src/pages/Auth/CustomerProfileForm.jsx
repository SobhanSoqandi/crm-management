import React, { useMemo, useEffect, useRef, useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import DateObject from "react-date-object";

import useCustomer from "../../hooks/useCustomer";
import useMutationData from "../../services/useMutationData";
import Input from "../../components/UI/Input";
import Loading from "../../components/UI/Loading";
import { JALALI_CONFIG } from "../Appointment/calendar/dateUtils";
// مسیر بالا را متناسب با پروژه خودت تغییر بده
// مسیر useCustomer را هم متناسب با پروژه خودت تغییر بده


function CustomerProfileForm() {
    const { customer, isLoading: isCustomerLoading } = useCustomer();

    const { mutate: updateCustomer, isPending: isUpdating } = useMutationData(
        "customer",
        "put",
        "update-customer"
    );

    const formValues = useMemo(() => {
        if (!customer) return undefined;

        return {
            first_name: customer.first_name || "",
            last_name: customer.last_name || "",
            birthday: customer.birthday
                ? new DateObject(new Date(customer.birthday)).convert(
                      JALALI_CONFIG.calendar,
                      JALALI_CONFIG.locale
                  )
                : null,
        };
    }, [customer]);

    const { register, handleSubmit, control } = useForm({
        values: formValues,
    });

    const onSubmit = ({ first_name, last_name, birthday }) => {
        updateCustomer({
            first_name,
            last_name,
            profile_image: customer?.profile_image || "",
            birthday: birthday ? birthday.toDate().toISOString() : null,
        });
    };

    if (isCustomerLoading) {
        return (
            <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl flex items-center justify-center">
                <Loading size="Medium" />
            </div>
        );
    }

    return (
        <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
            <h2 className="text-lg font-semibold mb-6">تکمیل اطلاعات مشتری</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input register={register} name="first_name" type="text" label="نام" />
                <Input register={register} name="last_name" type="text" label="نام خانوادگی" />

                <Controller
                    name="birthday"
                    control={control}
                    render={({ field }) => (
                        <PersianBirthDatePicker
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                {isUpdating ? (
                    <Loading size="Medium" />
                ) : (
                    <button
                        type="submit"
                        className="btn btn--primary bg-[#e7ad00] w-full my-6"
                    >
                        تایید
                    </button>
                )}
            </form>
        </div>
    );
}


// =====================================================
// Persian Birth Date Picker
// =====================================================

function PersianBirthDatePicker({ value, onChange }) {
    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const formattedDate = value ? value.format("YYYY/MM/DD") : "";

    function handleSelectDate(date) {
        onChange(date);
        setIsOpen(false);
    }

    return (
        <div ref={wrapperRef} className="relative mb-4">
            <label className="block mb-2 text-sm">تاریخ تولد</label>

            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="w-full border rounded-lg px-3 py-2 flex items-center justify-between text-right bg-white"
            >
                <span className={formattedDate ? "text-gray-800" : "text-gray-400"}>
                    {formattedDate || "انتخاب تاریخ تولد"}
                </span>
                <HiOutlineCalendarDays className="text-xl text-gray-500" />
            </button>

            {isOpen && (
                <div className="absolute z-50 right-0 mt-2 bg-white rounded-xl shadow-lg border p-2">
                    <Calendar
                        value={value}
                        onChange={handleSelectDate}
                        calendar={JALALI_CONFIG.calendar}
                        locale={JALALI_CONFIG.locale}
                    />
                </div>
            )}
        </div>
    );
}

export default CustomerProfileForm;
