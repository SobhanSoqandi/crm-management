import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";

import useMoveBack from "../../hooks/useMoveBack";
import useUser from "../../hooks/useUser";
import useMutationData from "../../services/useMutationData";
import Input from "../../components/UI/Input";
import Loading from "../../components/UI/Loading";
import CustomerProfileForm from "./CustomerProfileForm";
import OwnerProfileForm from "./OwnerProfileForm";


function CompleteProfile() {
    const moveBack = useMoveBack();

    const { user, isLoading: isUserLoading } = useUser();

    const { mutate: updateUser, isPending: isUpdating } = useMutationData(
        "user/update/me",
        "patch",
        "update-user"
    );

    const { register, handleSubmit } = useForm({
        values: user
            ? {
                  user_name: user.user_name,
                  phone: user.phone,
                  email: user.email,
              }
            : undefined,
    });

  const onSubmit = (data) => {
  updateUser({
    ...data,
    role_id: user.role_id,
    is_active: user.is_active,
  });

};
    if (isUserLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <Loading size="Medium" />
            </div>
        );
    }

    const isOwner = user.role_id === 2;

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 px-4 py-10">

            <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
                <div className="flex justify-between items-center text-center mb-6">
                    <h2 className="text-lg font-semibold">تکمیل پروفایل</h2>

                    <BiArrowBack
                        onClick={moveBack}
                        className="text-blue-500 text-2xl cursor-pointer"
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        register={register}
                        name="user_name"
                        type="text"
                        label="نام کاربری"
                    />
                    <Input register={register} name="phone" type="text" label="شماره تلفن" />
                    <Input register={register} name="email" type="email" label="ایمیل" />

                    {isUpdating ? (
                        <Loading size="Medium" />
                    ) : (
                        <button
                            type="submit"
                            className="btn btn--primary w-full my-6"
                        >
                            تایید
                        </button>
                    )}
                </form>
            </div>

            {isOwner ? (
                <OwnerProfileForm />
            ) : (
                <CustomerProfileForm />
            )}
        </div>
    );
}

export default CompleteProfile;
