import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input"
import Loading from '../../components/UI/Loading';
import useMoveBack from "../../hooks/useMoveBack";
import { BiArrowBack } from "react-icons/bi";
import useMutationData from "../../services/useMutationData";
import Logo from "../../components/UI/logo";

function Login() {

  const moveBack = useMoveBack();

  const { handleSubmit, register } = useForm();

 

  const { mutate, isPending } = useMutationData("login", "POST", "login-toast");

  const onSubmit = async (data) => {
    await mutate(data);main
  }


  return (

    <div className="flex-1 lg:flex min-h-screen select-none pt-28 lg:pt-0" >

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="max-w-sm w-full md:shadow-md p-8 rounded-xl">
          <div className="flex justify-between text-center mb-4">
           <Logo className="w-[80px]" />

            <BiArrowBack
              onClick={moveBack}
              className="text-[#008080] text-2xl" />
          </div>
          <h2 className="text-lg uppercase font-semibold py-5">
            ورود
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              register={register}
              name="phone"
              type="text"
              label=" لطفا نام کاربری خود را وارد کنید"
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
          className=" mx-auto w-[700px]"
        />
      </div>

    </div>
  )
}

export default Login;