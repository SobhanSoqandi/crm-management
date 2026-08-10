import { Controller, useForm } from "react-hook-form";
import {
    HiOutlineUser,
    HiOutlinePhone,
    HiOutlineScissors,
    HiOutlineCurrencyDollar,
    HiOutlineClock,
} from "react-icons/hi2";

import Input from "../../../components/UI/Input";
import Select from "../../../components/UI/Select";
import Loading from "../../../components/UI/Loading";
import AppointmentDateTimeSelect from "./AppointmentDateTimeSelect";
import TagsInput from "../../../components/UI/TagsInput";

const serviceOptions = [
    {
        value: "",
        label: "انتخاب خدمت",
    },
    {
        value: "hair",
        label: "کوتاهی مو",
    },
    {
        value: "color",
        label: "رنگ مو",
    },
    {
        value: "laser",
        label: "لیزر",
    },
    {
        value: "nail",
        label: "ناخن",
    },
    {
        value: "facial",
        label: "فیشیال",
    },
];

function AddAppointmentForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            phone: "",
            service: "",
            price: "",
            time: "",
        },
    });

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-3xl  bg-white p-5"
        >
            {/* Header */}

            <div className="border-b border-gray-300 p-3">

                <h2 className="text-lg font-black text-blue-800">
                    ثبت نوبت جدید
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    اطلاعات مشتری را وارد کنید و نوبت را ثبت نمایید.
                </p>

            </div>

            <div className="py-5">

                <div >
                    <AppointmentDateTimeSelect
                        name="appointment"
                        register={register}
                        errors={errors}
                        validationSchema={{
                            required: "زمان مراجعه الزامی است"
                        }}

                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 pt-5">

                    {/* نام */}
                    {/* <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">

                            <HiOutlineUser className="text-lg text-blue-600" />

                            <span>نام مشتری</span>

                        </label>

                        <Input
                            name="name"
                            register={register}
                            errors={errors}
                            placeholder="مثلاً کبری کاریزی"
                            validationSchema={{
                                required: "نام مشتری الزامی است",
                                minLength: {
                                    value: 3,
                                    message: "حداقل ۳ کاراکتر وارد کنید",
                                },
                            }}
                        />

                    </div> */}

                    {/* شماره */}

                    <div>

                        <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <HiOutlinePhone className="text-lg text-blue-600" />
                            <span>شماره تلفن</span>
                        </label>

                        <Input
                            name="phone"
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

                    {/* خدمات */}

                    <div>

                        <label className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <HiOutlineScissors className="text-lg text-blue-600" />
                            <span>خدمات</span>
                        </label>

                        <Controller
                            control={control}
                            name="services"
                            rules={{
                                validate: (value) =>
                                    value?.length > 0 || "حداقل یک خدمت وارد کنید",
                            }}
                            render={({ field }) => (
                                <TagsInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="مثلاً کوتاهی مو"
                                />
                            )}
                        />

                        {errors.service && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.service.message}
                            </p>
                        )}

                    </div>

                    {/* مبلغ */}
                    {/* 
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <HiOutlineCurrencyDollar className="text-lg text-blue-600" />
                            <span>مبلغ</span>
                        </label>

                        <Input
                            name="price"
                            register={register}
                            errors={errors}
                            placeholder="مثلاً 750000"
                            validationSchema={{
                                required: "مبلغ را وارد کنید",

                                min: {
                                    value: 1000,
                                    message: "مبلغ وارد شده معتبر نیست",
                                },
                            }}
                        />
                    </div> */}



                </div>




                {/* <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <h3 className="font-bold text-slate-700">
                        نکته
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-500">

                        پس از ثبت نوبت، مشتری مستقیماً به لیست نوبت‌ها اضافه می‌شود.
                        وضعیت پرداخت در مرحله بعد توسط پذیرش ثبت خواهد شد.

                    </p>
                </div> */}

                <div className="mt-8 flex justify-end">

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn--primary bg-blue-600 w-full"

                    >

                        {isSubmitting
                            ? <Loading />
                            : "ثبت نوبت"}

                    </button>

                </div>

            </div>

        </form>
    );
}

export default AddAppointmentForm;