
import { useForm } from "react-hook-form";

import useMutationData from "../../services/useMutationData";
import Input from "../../components/UI/Input";
import Loading from "../../components/UI/Loading";
import useSalon from "../../hooks/useSalon";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

function OwnerProfileForm() {
  const queryClient = useQueryClient();

  const { salon, isLoading: isSalonLoading } = useSalon();

  const OWNER_ID = salon?.data?.owner_id;

  console.log("this is owner id : " , OWNER_ID);
  

  const { mutate: createSalon, isPending: isCreating } =
  useMutationData(
    "salon",
    "post",
    "create-salon",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["salon"],
        });
      },
    }
  );

  
  const { mutate: updateSalon, isPending: isUpdating } = useMutationData(
    "salon",
    "put",
    "update-salon"
  );

  const { register, handleSubmit } = useForm({
    values: salon
      ? {
          name: salon.data.name || "",
          location: salon.data.location || "",
          back_percent: salon.data.back_percent ?? "",
        }
      : undefined,
  });

  const onSubmit = ({ name, location, back_percent }) => {
    updateSalon({
      name,
      location,
      back_percent: Number(back_percent),
    });
  };

  // ایجاد سالن اولیه
  const handleCreateSalon = () => {
    createSalon({
      name: "",
      location: "",
      back_percent: 0,
      owner_id: OWNER_ID,
    });
  };

 
  

  if (isSalonLoading) {
    return (
      <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl flex items-center justify-center">
        <Loading size="Medium" />
      </div>
    );
  }


  if (!salon?.data) {
    return (
      <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
        <h2 className="text-lg font-semibold mb-3">
          ایجاد سالن
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          برای تکمیل اطلاعات پروفایل، ابتدا باید سالن خود را ایجاد کنید.
        </p>

        {isCreating ? (
          <div className="flex justify-center py-3">
            <Loading size="Medium" />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleCreateSalon}
            className="btn btn--primary bg-[#e7ad00] w-full my-2"
          >
            افزودن سالن
          </button>
        )}
      </div>
    );
  }

  // اگر سالن وجود دارد، فرم تکمیل اطلاعات نمایش داده شود
  return (
    <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
      <h2 className="text-lg font-semibold mb-6">
        تکمیل اطلاعات سالن
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

export default OwnerProfileForm;
