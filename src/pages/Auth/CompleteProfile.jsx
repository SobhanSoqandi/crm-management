import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";

import useMoveBack from "../../hooks/useMoveBack";
import Input from "../../components/UI/Input";
import Loading from "../../components/UI/Loading";
import { JALALI_CONFIG } from "../Appointment/calendar/dateUtils";
// مسیر بالا را متناسب با پروژه خودت تغییر بده


function CompleteProfile() {
    const moveBack = useMoveBack();

    // =========================================
    // User - موقت
    // =========================================

    const user = {
        name: "فاطمه دیزنی بند",
        phoneNumber: "09151540715",
        role: "customer", // business | customer
    };

    const isBusiness = user.role === "business";
    const isCustomer = user.role === "customer";

    // =========================================
    // Form
    // =========================================

    const {
        register,
        handleSubmit,
        control,
    } = useForm({
        defaultValues: {
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: "",
            customerPercent: "10",
            birthDate: null,
        },
    });

    const isSendingOtp = false;

    // =========================================
    // Submit
    // =========================================

    const onSubmit = (data) => {
        const formattedData = {
            ...data,

            // تبدیل DateObject به تاریخ شمسی
            birthDate: data.birthDate
                ? data.birthDate.format("YYYY/MM/DD")
                : null,
        };

        console.log("Profile data:", formattedData);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4">
            <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">

                {/* Header */}
                <div className="flex justify-between items-center text-center mb-6">
                    <h2 className="text-lg font-semibold">
                        تکمیل پروفایل
                    </h2>

                    <BiArrowBack
                        onClick={moveBack}
                        className="text-blue-500 text-2xl cursor-pointer"
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Name */}
                    <Input
                        register={register}
                        name="name"
                        type="text"
                        label="نام"
                    />

                    {/* Phone */}
                    <Input
                        register={register}
                        name="phoneNumber"
                        type="text"
                        label="شماره تلفن"
                    />

                    {/* ================================= */}
                    {/* Business Fields */}
                    {/* ================================= */}

                    {isBusiness && (
                        <>
                            <Input
                                register={register}
                                name="address"
                                type="text"
                                label="آدرس"
                            />

                            <Input
                                register={register}
                                name="customerPercent"
                                type="number"
                                label="درصد تخفیف تراکنش %"
                            />
                        </>
                    )}


                    {isCustomer && (
                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                                <PersianBirthDatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    )}

                    {/* Submit */}
                    {isSendingOtp ? (
                        <Loading size="Medium" />
                    ) : (
                        <button
                            type="submit"
                            className="btn btn--primary bg-blue-600 w-full my-6"
                        >
                            تایید
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}


// =====================================================
// Persian Birth Date Picker
// =====================================================

function PersianBirthDatePicker({ value, onChange }) {
    const wrapperRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    // بستن تقویم با کلیک بیرون
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener(
                "mousedown",
                handleClickOutside
            );
        }

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [isOpen]);

    // مقدار نمایشی تاریخ
    const formattedDate = value
        ? value.format("YYYY/MM/DD")
        : "";

    function handleSelectDate(date) {
        onChange(date);
        setIsOpen(false);
    }

    return (
        <div
            ref={wrapperRef}
            className="relative mb-4"
        >
            <label className="block mb-2 text-sm">
                تاریخ تولد
            </label>

            {/* Input */}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="
                    w-full
                    border
                    rounded-lg
                    px-3
                    py-2
                    flex
                    items-center
                    justify-between
                    text-right
                    bg-white
                "
            >
                <span
                    className={
                        formattedDate
                            ? "text-gray-800"
                            : "text-gray-400"
                    }
                >
                    {formattedDate || "انتخاب تاریخ تولد"}
                </span>

                <HiOutlineCalendarDays className="text-xl text-gray-500" />
            </button>

            {/* Calendar */}
            {isOpen && (
                <div
                    className="
                        absolute
                        z-50
                        right-0
                        mt-2
                        bg-white
                        rounded-xl
                        shadow-lg
                        border
                        p-2
                    "
                >
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

export default CompleteProfile;