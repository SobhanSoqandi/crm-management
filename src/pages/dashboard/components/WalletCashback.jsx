import { Wallet, Coins } from "lucide-react";
import { formatMoney } from "./formatters";

function WalletCashback({ wallet, cashback }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* کیف پول */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-md">
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute left-8 -bottom-16 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex items-start justify-between">
          <p className="text-sm font-medium text-violet-100">موجودی کیف پول مشتریان</p>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Wallet size={20} />
          </span>
        </div>

        <p className="relative mt-5 text-3xl font-extrabold md:text-4xl">
          {formatMoney(wallet?.total_balance)}
        </p>
        <span className="relative text-xs text-violet-100">تومان</span>
      </div>

      {/* Cashback */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-rose-500 p-6 text-white shadow-md">
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute left-8 -bottom-16 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex items-start justify-between">
          <p className="text-sm font-medium text-amber-50"> بازگشت وجه این ماه</p>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Coins size={20} />
          </span>
        </div>

        <p className="relative mt-5 text-3xl font-extrabold md:text-4xl">
          {formatMoney(cashback?.current_month?.amount)}
        </p>

        <p className="relative mt-1 text-xs text-amber-50">
          {formatMoney(cashback?.current_month?.count)} تراکنش
        </p>
      </div>
    </div>
  );
}

export default WalletCashback;
