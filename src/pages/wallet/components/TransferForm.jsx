// TransferForm.jsx
import { useForm } from "react-hook-form";
import { FiUser, FiDollarSign, FiSend } from "react-icons/fi";

export default function TransferForm({ balance, onTransfer }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      recipient: "",
      amount: "",
    },
  });

  const onSubmit = (data) => {
    onTransfer({
      recipient: data.recipient,
      amount: Number(data.amount),
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          انتقال موجودی
        </h3>
        <span className="text-xs text-gray-400">
          موجودی قابل انتقال: {new Intl.NumberFormat("fa-IR").format(balance)} تومان
        </span>
      </div>

      <div className="space-y-4">
        {/* گیرنده */}
        <div>
          <div className="relative">
            <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="نام کاربری یا شماره موبایل گیرنده"
              className={`input--style pr-10
                         ${errors.recipient ? "border-red-400" : "border-gray-200 focus:border-emerald-500"}`}
              {...register("recipient", {
                required: "نام یا شماره گیرنده رو وارد کن",
                minLength: {
                  value: 3,
                  message: "حداقل ۳ کاراکتر وارد کن",
                },
              })}
            />
          </div>
          {errors.recipient && (
            <p className="text-xs text-red-500 mt-1">{errors.recipient.message}</p>
          )}
        </div>

        {/* مبلغ */}
        <div>
          <div className="relative">
            <FiDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              placeholder="مبلغ به تومان"
              className={`input--style pr-10
                         ${errors.amount ? "border-red-400" : "border-gray-200 focus:border-emerald-500"}`}
              {...register("amount", {
                required: "مبلغ معتبر وارد کن",
                min: {
                  value: 1,
                  message: "مبلغ باید بیشتر از صفر باشه",
                },
                max: {
                  value: balance,
                  message: "مبلغ بیشتر از موجودی توئه",
                },
              })}
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700
                     text-white text-sm font-medium rounded-xl py-2.5 transition-colors"
        >
          <FiSend size={16} />
          انتقال وجه
        </button>
      </div>
    </form>
  );
}