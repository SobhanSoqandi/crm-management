import { useForm, Controller } from "react-hook-form";
import Input from "../../components/UI/Input";
import Select from "../../components/UI/Select";
import Loading from '../../components/UI/Loading';
import { BiArrowBack } from "react-icons/bi";
import useMoveBack from "../../hooks/useMoveBack";

import Logo from "../../components/UI/Logo";
import useMutationData from "../../services/useMutationData";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

const HIDDEN_ROLES = ["admin"];

const ROLE_LABELS = {
  customer: "مشتری",
  owner: "سالن",
};

function Register() {
  const moveBack = useMoveBack();

const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const { mutate, isPending: isRegistering } = useMutationData("user", "POST", "register-toast",
       {
      onSuccess: () => { navigate("/login"); },
    }
  );
  const { data: rolesData, isLoading: isRolesLoading } = useFetchData("roles", "roles");

  const roleOptions =
    rolesData?.data
      ?.filter((role) => !HIDDEN_ROLES.includes(role.name))
      .map((role) => ({
        value: role.id,
        label: ROLE_LABELS[role.name] ?? role.name,
      })) ?? [];

  const onSubmit = async (formData) => {
    const payload = {
      phone: formData.phone,
      password_hash: formData.password,
      role_id: Number(formData.role_id),
    };

    await mutate(payload);
  };

  return (
    <div className="flex-1 lg:flex min-h-screen select-none pt-28 lg:pt-0">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
          <div className="flex justify-between text-center mb-4">
            <Logo className="w-20" />
            <BiArrowBack onClick={moveBack} className="text-emerald-700 text-2xl" />
          </div>

          <h2 className="text-lg uppercase font-semibold py-5">ثبت نام</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name="phone"
              type="text"
              label="شماره تلفن خود را وارد کنید :"
              validationSchema={{ required: "شماره تلفن الزامی است" }}
              error={errors.phone}
            />

            <Input
              register={register}
              name="password"
              label="یک رمز عبور برای خود ثبت کنید :"
              isPassword={true}
              validationSchema={{ required: "رمز عبور الزامی است" }}
              error={errors.password}
            />

            <Controller
              name="role_id"
              control={control}
              rules={{ required: "انتخاب نقش الزامی است" }}
              defaultValue=""
              render={({ field }) => (
                <Select
                  name="role_id"
                  label="نقش کاربری:"
                  options={roleOptions}
                  value={field.value}
                  onChange={field.onChange}
                  errors={errors}
                />
              )}
            />

            {isRegistering ? (
              <Loading size="Medium" />
            ) : (
              <button type="submit" className="btn btn--gold w-full my-6">
                ثبت نام
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="lg:flex w-1/2 items-center justify-center mx-auto">
        <img
          src="/images/register-image.svg"
          alt="ورود"
          className="mx-auto w-[650px]"
        />
      </div>
    </div>
  );
}

export default Register;