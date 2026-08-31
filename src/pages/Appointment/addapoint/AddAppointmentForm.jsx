import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePhone } from "react-icons/hi2";

import Input from "../../../components/UI/Input";
import Loading from "../../../components/UI/Loading";
import useMutationData from "../../../services/useMutationData";

import DatePickerBox from "./DatePickerBox";
import TimePickerCircle from "./TimePickerCircle";
import { buildStartTime, getRoundedCurrentTime } from "./utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSalon from "../../../hooks/useSalon";



function AddAppointmentForm({ onCloseModal }) {

    const { isSalonLoading , salon } = useSalon();


const TEMP_SALON_ID = salon.data.id ;
    

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: { phone_number: "" },
    });

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(() => getRoundedCurrentTime());
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
    setAppointmentError("");

    toast.success("نوبت با موفقیت ثبت شد.");

    onCloseModal?.();
},
        }
    );

    const onSubmit = (data) => {
        setAppointmentError("");

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

        const payload = {
            phone_number: data.phone_number,
            service_id: [1], // فعلاً ثابت
            start_time: startTime,
            description: "",
            salon_id: TEMP_SALON_ID,
            paid_price: 0,
        };

        createAppointment(payload);
    };

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
                    شماره تلفن مشتری را وارد کنید و نوبت را ثبت نمایید.
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
                                value: /^09\d{9}$/,
                                message: "شماره موبایل معتبر نیست",
                            },
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
                        disabled={isPending || isSubmitting}
                        className="btn btn--gold w-full "
                    >
                        {isPending || isSubmitting ? <Loading /> : "ثبت نوبت"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddAppointmentForm;