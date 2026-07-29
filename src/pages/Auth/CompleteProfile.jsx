import React from 'react'
import { BiArrowBack } from 'react-icons/bi';
import useMoveBack from '../../hooks/useMoveBack';
import Input from '../../components/UI/Input';
import Loading from '../../components/UI/Loading';
import { useForm } from 'react-hook-form';
import Logo from '../../components/UI/Logo';

function CompleteProfile() {

    const moveBack = useMoveBack();

    const { register } = useForm();

    const isSendingOtp = false;

    return (

        <div className="w-full min-h-screen items-center flex justify-center px-4">
            <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
                <div className="flex justify-between text-center mb-4">
                    <h2 className="text-lg uppercase font-semibold">
                        تکمیل پروفایل
                    </h2>
                    <BiArrowBack
                        onClick={moveBack}
                        className="text-blue-500 text-2xl" />
                </div>
            
                <form  >
                    <Input
                        register={register}
                        name="phoneNumber"
                        type="text"
                        label=" آدرس "
                    />

                    <Input
                        register={register}
                        name="customer-precent"
                        label=" درصد تخفیف تراکنش %"
                    />

                    <Input
                        register={register}
                        name="invitation-precent"
                        label=" درصد تخفیف دعوت %"
                    />

                    {
                        isSendingOtp ? <Loading size='Medium' />
                            : <button
                                type='submit'
                                className="btn btn--primary w-full my-6"> تایید </button>
                    }

                </form>
            </div>
        </div>


    )
}

export default CompleteProfile;