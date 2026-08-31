import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input"
import Loading from '../../components/UI/Loading';
import useMoveBack from "../../hooks/useMoveBack";
import { BiArrowBack } from "react-icons/bi";
import useMutationData from "../../services/useMutationData";
import Logo from "../../components/UI/Logo";
import { useNavigate } from "react-router-dom";

function Login() {

  const moveBack = useMoveBack();

  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();

  const { mutate, isPending } = useMutationData("auth/login", "POST", "login-toast",
    {
      onSuccess: () => { navigate("/panel/appointments"); },
    }
  );

  const onSubmit = (data) => {
    mutate(data);
  };


  return (

    <div className="flex-1 lg:flex min-h-screen select-none pt-28 lg:pt-0" >

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
          <div className="flex justify-between text-center mb-4">
            <Logo className="w-[80px]" />

            <BiArrowBack
              onClick={moveBack}
              className="text-emerald-700 text-2xl" />
          </div>
          <h2 className="text-lg uppercase font-semibold py-5">
            ورود
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              register={register}
              name="phone_number"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              label="لطفا شماره خود را وارد کنید"
              validationSchema={{ required: "شماره موبایل الزامی است" }}
            />

            <Input
              register={register}
              name="password"
              label="لطفاً رمز عبور خود را وارد کنید"
              isPassword={true}
              validationSchema={{ required: "رمز عبور الزامی است" }}
            />

            {
              isPending ? <Loading size='Medium' />
                : <button
                  type='submit'
                  className="btn btn--primary w-full my-6"> ورود </button>
            }

          </form>
        </div>
      </div>

      <div className=" lg:flex w-1/2 items-center justify-center mx-auto">
        <img
          src="images\login-image.svg"
          alt="ورود"
          className=" mx-auto w-[480px]"
        />
      </div>

    </div>
  )
}

export default Login;