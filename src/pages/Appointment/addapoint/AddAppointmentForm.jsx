import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePhone, HiCheckCircle, HiOutlineUserPlus } from "react-icons/hi2";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../../components/UI/Input";
import Loading from "../../../components/UI/Loading";
import ServiceMultiSelect from "../../../components/UI/ServiceMultiSelect";
import useMutationData from "../../../services/useMutationData";
import useFetchData from "../../../hooks/useFetchData";
import useSalon from "../../../hooks/useSalon";

import DatePickerBox from "./DatePickerBox";
import TimePickerCircle from "./TimePickerCircle";
import { buildStartTime, getRoundedCurrentTime } from "./utils";

const PHONE_REGEX = /^09\d{9}$/;

function AddAppointmentForm({ onCloseModal }) {
    const { salon, isSalonLoading } = useSalon();
    const salonId = salon?.data?.id;
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            phone_number: "",
        },
    });

    const phoneNumber = watch("phone_number");
    const [debouncedPhone, setDebouncedPhone] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedPhone(phoneNumber || ""), 400);
        return () => clearTimeout(timeout);
    }, [phoneNumber]);

    const isPhoneComplete = PHONE_REGEX.test(debouncedPhone);

    // فقط وقتی شماره کامل و معتبره جستجو انجام میشه
    const { data: customerSearchRaw, isLoading: isSearchingCustomer } = useFetchData(
        ["customer-search", debouncedPhone],
        `salon/search?phone=${debouncedPhone}`,
        { enabled: isPhoneComplete }
    );

    const matchedCustomer = isPhoneComplete
        ? (customerSearchRaw?.data ?? []).find(
              (item) =>
                  item.customer?.user?.phone === debouncedPhone ||
                  item.phone === debouncedPhone
          )
        : null;

    const matchedCustomerName = matchedCustomer
        ? `${matchedCustomer.customer?.first_name ?? matchedCustomer.first_name ?? ""} ${
              matchedCustomer.customer?.last_name ?? matchedCustomer.last_name ?? ""
          }`.trim()
        : "";

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(() => getRoundedCurrentTime());
    const [serviceIds, setServiceIds] = useState([]);
    const [appointmentError, setAppointmentError] = useState("");

    const { mutate: createAppointment, isPending } = useMutationData(
        "appointments/",
        "POST",
        "create-appointment",
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["appointments"],
                });

                reset();
                setDate(null);
                setTime(getRoundedCurrentTime());
                setServiceIds([]);
                setAppointmentError("");

                toast.success("نوبت با موفقیت ثبت شد.");
                onCloseModal?.();
            },
        }
    );

    const onSubmit = (data) => {
        setAppointmentError("");

        if (!serviceIds.length) {
            setAppointmentError("لطفاً حداقل یک خدمت انتخاب کنید.");
            return;
        }

        if (!date) {
            setAppointmentError("لطفاً تاریخ نوبت را انتخاب کنید.");
            return;
        }

        const hasTime =
            time?.hour !== null &&
            time?.hour !== undefined &&
            time?.minute !== null &&
            time?.minute !== undefined;

        if (!hasTime) {
            setAppointmentError("لطفاً ساعت نوبت را انتخاب کنید.");
            return;
        }

        const startTime = buildStartTime(date, time);

        if (!startTime) {
            setAppointmentError("تاریخ یا ساعت نوبت معتبر نیست.");
            return;
        }

        createAppointment({
            phone_number: data.phone_number,
            service_id: serviceIds,
            start_time: startTime,
            description: "",
            salon_id: salonId,
            paid_price: 0,
        });
    };

    if (isSalonLoading) {
        return <Loading />;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-3xl bg-white p-5"
        >
            <div className="border-b border-gray-300 p-3">
                <h2 className="text-lg font-black text-[#0A6847]">
                    ثبت نوبت جدید
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    شماره تلفن مشتری و خدمات موردنظر را وارد کنید.
                </p>
            </div>

            <div className="py-5">
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <HiOutlinePhone className="text-lg text-[#0A6847]" />
                        <span>شماره تلفن</span>
                    </label>

                    <Input
                        name="phone_number"
                        register={register}
                        errors={errors}
                        placeholder="09151234567"
                        validationSchema={{
                            required: "شماره تلفن الزامی است",
                            pattern: {
                                value: PHONE_REGEX,
                                message: "شماره موبایل معتبر نیست",
                            },
                        }}
                    />

                    {isPhoneComplete && (
                        <div className="mt-2">
                            {isSearchingCustomer ? (
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500" />
                                    در حال بررسی شماره...
                                </div>
                            ) : matchedCustomer ? (
                                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600">
                                    <HiCheckCircle className="text-base" />
                                    مشتری: {matchedCustomerName || "بدون نام"}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-600">
                                    <HiOutlineUserPlus className="text-base" />
                                    این شماره جدید است و به‌عنوان مشتری جدید ثبت می‌شود
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <ServiceMultiSelect
                        value={serviceIds}
                        onChange={(value) => {
                            setServiceIds(value);
                            setAppointmentError("");
                        }}
                    />
                </div>

                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        تاریخ نوبت
                    </label>

                    <DatePickerBox
                        date={date}
                        setDate={(value) => {
                            setDate(value);
                            setAppointmentError("");
                        }}
                    />
                </div>

                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        ساعت نوبت
                    </label>

                    <TimePickerCircle
                        date={date}
                        time={time}
                        setTime={(value) => {
                            setTime(value);
                            setAppointmentError("");
                        }}
                    />
                </div>

                {appointmentError && (
                    <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {appointmentError}
                    </div>
                )}

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={isPending || isSubmitting || !salonId}
                        className="btn btn--gold w-full"
                    >
                        {isPending || isSubmitting ? (
                            <Loading />
                        ) : (
                            "ثبت نوبت"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddAppointmentForm;