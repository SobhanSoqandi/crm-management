import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input"
import Loading from '../../components/UI/Loading';
import useMutationData from "../../services/useMutationData";
import Logo from "../../components/UI/Logo";
import { Link, useNavigate } from "react-router-dom";
import MoveBack from "../../components/UI/MoveBack";

function Login() {


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

    <div className="flex-1 lg:flex min-h-screen select-none pt-5 lg:pt-0" >

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
          <div className="flex justify-between text-center mb-4">
            <Logo className="w-[80px]" />
            <MoveBack />
          </div>
          <h2 className="text-lg text-[#172980] uppercase font-semibold py-5">
            ورود به پایدار
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
          <div className="flex text-zinc-500 gap-2" >
            <span> سالن زیبایی دارید؟  </span>
            <Link to="/register" className="text-gold font-bold" >
              ثبت نام کنید
            </Link>
          </div>
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