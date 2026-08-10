// TransferForm.jsx
import { useForm } from "react-hook-form";
import { FiUser, FiDollarSign, FiSend } from "react-icons/fi";
import { formatnumber } from "../../../Utils/ToPersianNumber";

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
  className="relative bg-white rounded-2xl border border-gray-100 p-6 overflow-hidden"
>
  {/* Overlay */}
  <div className="absolute inset-0 z-20 bg-white/10 backdrop-blur-[1px] flex items-center justify-center">
    <span className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow">
      🚧 به‌زودی
    </span>
  </div>

  <fieldset disabled className="space-y-4 opacity-50">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-base font-semibold text-gray-900">
        انتقال موجودی
      </h3>
      <span className="text-xs text-gray-400">
        موجودی قابل انتقال: {formatnumber.price(balance)} تومان
      </span>
    </div>

    {/* گیرنده */}
    <div>
      <div className="relative">
        <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="نام کاربری یا شماره موبایل گیرنده"
          className="input--style pr-10"
          {...register("recipient")}
        />
      </div>
    </div>

    {/* مبلغ */}
    <div>
      <div className="relative">
        <FiDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="number"
          placeholder="مبلغ به تومان"
          className="input--style pr-10"
          {...register("amount")}
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white rounded-xl py-2.5"
    >
      <FiSend size={16} />
      انتقال وجه
    </button>
  </fieldset>
</form>
  );
}