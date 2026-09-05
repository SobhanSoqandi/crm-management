import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "../../../components/UI/modal";
import Input from "../../../components/UI/Input";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { formatnumber } from "../../../Utils/ToPersianNumber";
import useMutationData from "../../../services/useMutationData";
import useWallet from "../../../hooks/useWallet";
import useSalon from "../../../hooks/useSalon";
import Loading from "../../../components/UI/Loading";


const TRANSACTION_TYPE = {
  SPEND: "spend",
  CASHBACK: "cashback",
};

function extractWalletId(wallet) {
  return wallet?.id ?? wallet?.data?.id ?? null;
}

export default function Payappointment({ appointmentId, customerId }) {

    const { salon, isSalonLoading } = useSalon();

  const CASHBACK_PERCENT = Number(salon?.data?.back_percent ?? 0) / 100;

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { price: "" } });

  const [useWalletPayment, setUseWalletPayment] = useState(false);

  const { wallet, balance: walletBalance, isLoading: isWalletLoading } =
    useWallet(customerId);

  const walletId = extractWalletId(wallet);

  const { mutateAsync: payAppointment, isPending: isPaying } = useMutationData(
    "appointments/pay",
    "POST",
    "pay-appointment"
  );

  const { mutateAsync: createWalletTransaction } = useMutationData(
    "wallet-transactions/",
    "POST",
    "wallet-transaction"
  );

  const { mutateAsync: updateWalletBalance } = useMutationData(
    walletId ? `wallets/${walletId}` : null,
    "PUT",
    "update-wallet-balance"
  );

  const enteredAmount = Number(watch("price")) || 0;

  const walletDeduction = useWalletPayment ? walletBalance : 0;
  const finalAmount = Math.max(enteredAmount - walletDeduction, 0);
  const cashbackAmount = Math.round(enteredAmount * CASHBACK_PERCENT);

  const newWalletBalance = useWalletPayment
    ? cashbackAmount
    : walletBalance + cashbackAmount;

  const onSubmit = async () => {
    if (!walletId) {
      toast.error("کیف پول مشتری یافت نشد");
      return;
    }

    try {
      await payAppointment({
        pay_price: finalAmount,
        appointment_id: appointmentId,
        customer_id: customerId,
      });

      if (walletDeduction > 0) {
        await createWalletTransaction({
          wallet_id: walletId,
          appointment_id: appointmentId,
          amount: walletDeduction,
          type: TRANSACTION_TYPE.SPEND,
          description: `پرداخت از کیف پول برای نوبت #${appointmentId}`,
        });
      }

      if (cashbackAmount > 0) {
        await createWalletTransaction({
          wallet_id: walletId,
          appointment_id: appointmentId,
          amount: cashbackAmount,
          type: TRANSACTION_TYPE.CASHBACK,
          description: `بازگشت وجه بابت نوبت #${appointmentId}`,
        });
      }

      if (walletDeduction > 0 || cashbackAmount > 0) {
        await updateWalletBalance({
          customer_id: customerId,
          balance: newWalletBalance,
        });
        if (cashbackAmount > 0) {
          toast.success("این مبلغ به عنوان تخفیف بازگشت وجه وارد کیف پول شما شد");
        }
      }

      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    } catch (err) {
     
    }
  };

  return (
    <div>
      <div className="max-w-sm mx-auto border-3 m-2 border-gray-300 border-dashed p-6 bg-white rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">مبلغ</p>
          <Input
            register={register}
            name="price"
            type="number"
            placeholder="مثلا 25000 تومان"
            validationSchema={{
              required: "مبلغ الزامی است",
              min: { value: 1, message: "مبلغ باید بزرگ‌تر از صفر باشد" },
            }}
            error={errors.price}
          />
        </div>

        <div className="py-5 border-y border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <FaCreditCard className="text-[#cd9a00]" />
            <span className="text-gray-700">پرداخت از کیف پول؟</span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={isWalletLoading || walletBalance <= 0}
              onClick={() => setUseWalletPayment((prev) => !prev)}
              className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                useWalletPayment
                  ? "bg-[#e7ad00] text-white"
                  : "bg-[#e7ad00] text-white hover:bg-[#e7ad00]"
              }`}
            >
              <MdPayment />
              <span>
                {useWalletPayment
                  ? "لغو پرداخت از کیف پول"
                  : `پرداخت از کیف پول (موجودی: ${formatnumber.price(walletBalance)})`}
              </span>
            </button>
          </div>
        </div>

        {useWalletPayment && walletDeduction > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
            <FaCheckCircle />
            <span>{formatnumber.price(walletDeduction)} تومان از کیف پول کسر شد</span>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-600">مبلغ نهایی</span>
          <span className="text-lg font-bold text-emerald-700">
            {formatnumber.price(finalAmount)}
          </span>
        </div>
      </div>

      <div className="flex gap-3 my-2 px-10">
        <button
          type="button"
          disabled={isPaying || enteredAmount <= 0}
          onClick={handleSubmit(onSubmit)}
          className="btn btn--primary w-full bg-emerald-500 disabled:opacity-50"
        >
          {isPaying ? "در حال ثبت..." : "تایید پرداخت"}
        </button>
        <Modal.Close>
          <button type="button" className="btn btn--light w-full">
            انصراف
          </button>
        </Modal.Close>
      </div>
    </div>
  );
}