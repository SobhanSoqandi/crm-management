import React from 'react'
import Modal from '../../../components/UI/modal'
import Input from "../../../components/UI/Input"
import { useForm } from 'react-hook-form'
import { FaCheckCircle, FaCreditCard } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import  { formatnumber } from "../../../Utils/ToPersianNumber"

function Payappointment() {

    const { register } = useForm();

    const amount = 25000;
    const finalAmount = 25000;

    return (
        <div>
            <div className="max-w-sm mx-auto border-3 m-2 border-gray-300 border-dashed p-6 bg-white rounded-xl">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">مبلغ</p>
                    {/* <p className="text-lg font-bold text-gray-500">{formatnumber.price(amount)} </p> */}
                    <Input
                    register={register}
                    
                    name="price"
                    placeholder="مثلا 25000 تومان"
                    />
                </div>

                <div className="py-5 border-y border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <FaCreditCard className="text-blue-500" />
                        <span className="text-gray-700">آیا از اعتبار پرداخت می‌کنید؟</span>
                    </div>

                    <div className="flex gap-3">
                        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                            <MdPayment />
                            <span>پرداخت از اعتبار</span>
                        </button>
                    </div>
                </div>


                <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <FaCheckCircle />
                    <span>تخفیف ۵,۰۰۰ تومان اعمال شد</span>
                </div>


                <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-600">مبلغ نهایی</span>
                    <span className="text-lg font-bold text-blue-600">
                        {formatnumber.price(finalAmount)} 
                    </span>
                </div>


            </div>

            <div className="flex gap-3 my-2" >
                <button className="btn btn--primary w-full  bg-emerald-500" >
                    تایید پرداخت
                </button>
                <Modal.Close>
                    <button className="btn btn--light w-full">
                        انصراف
                    </button>
                </Modal.Close>
            </div>
        </div>
    )
}

export default Payappointment