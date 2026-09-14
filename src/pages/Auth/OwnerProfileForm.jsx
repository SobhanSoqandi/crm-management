
import { useState } from "react";
import { useForm } from "react-hook-form";

import useMutationData from "../../services/useMutationData";
import Input from "../../components/UI/Input";
import Loading from "../../components/UI/Loading";
import useSalon from "../../hooks/useSalon";
import { useQueryClient } from "@tanstack/react-query";

function OwnerProfileForm() {
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { salon, isLoading: isSalonLoading } = useSalon();

  const { mutate: createSalon, isPending: isCreating } =
    useMutationData("salon", "POST", "create-salon", {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["salon"],
        });
      },
    });

  const { mutate: updateSalon, isPending: isUpdating } =
    useMutationData("salon", "PUT", "update-salon");

  const { register, handleSubmit } = useForm({
    values: salon?.data
      ? {
          name: salon.data.name || "",
          location: salon.data.location || "",
          back_percent: salon.data.back_percent ?? "",
        }
      : undefined,
  });

  const onSubmit = ({ name, location, back_percent }) => {
    if (salon?.data) {
      updateSalon({
        name,
        location,
        back_percent: Number(back_percent),
      });

      return;
    }

    createSalon({
      name,
      location,
      back_percent: Number(back_percent),
    });
  };

  if (isSalonLoading) {
    return (
      <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl flex items-center justify-center">
        <Loading size="Medium" />
      </div>
    );
  }

  
  if (!salon?.data && !showCreateForm) {
    return (
      <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
        <h2 className="text-lg font-semibold mb-3">
          ایجاد سالن
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          برای تکمیل اطلاعات پروفایل، ابتدا باید سالن خود را ایجاد کنید.
        </p>

        <button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="btn btn--primary bg-[#e7ad00] w-full my-2"
        >
          افزودن سالن
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
      <h2 className="text-lg font-semibold mb-6">
        {salon?.data ? "تکمیل اطلاعات سالن" : "ایجاد سالن"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="name"
          type="text"
          label="نام سالن"
          validationSchema={{
            required: "نام سالن الزامی است",
          }}
        />

        <Input
          register={register}
          name="location"
          type="text"
          label="آدرس سالن"
          validationSchema={{
            required: "آدرس سالن الزامی است",
          }}
        />

        <Input
          register={register}
          name="back_percent"
          type="number"
          label="درصد بازگشت وجه"
          validationSchema={{
            required: "درصد بازگشت وجه الزامی است",
            min: {
              value: 0,
              message: "درصد نمی‌تواند منفی باشد",
            },
            max: {
              value: 100,
              message: "درصد نمی‌تواند بیشتر از ۱۰۰ باشد",
            },
          }}
        />

        {isCreating || isUpdating ? (
          <div className="flex justify-center py-3">
            <Loading size="Medium" />
          </div>
        ) : (
          <button
            type="submit"
            className="btn btn--primary bg-[#e7ad00] w-full my-6"
          >
            {salon?.data ? "تایید" : "ایجاد سالن"}
          </button>
        )}
      </form>
    </div>
  );
}

export default OwnerProfileForm;
