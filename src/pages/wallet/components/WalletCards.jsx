// WalletCards.jsx
import { FiCreditCard, FiUsers, FiRefreshCw } from "react-icons/fi";
import { formatnumber } from "../../../Utils/ToPersianNumber";

const ICONS = {
  FiCreditCard: FiCreditCard,
  FiUsers: FiUsers,
  FiRefreshCw: FiRefreshCw,
};


export default function WalletCards({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        const isPrimary = item.tone === "primary";
        const disabled = !isPrimary;

        return (
          <div
  key={item.id}
  className={`
    relative rounded-2xl p-5 border transition-all
    ${
      isPrimary
        ? "bg-emerald-600 border-emerald-600 text-white"
        : "bg-gray-100 border-gray-200 text-gray-400 opacity-70 pointer-events-none select-none"
    }
  `}
>
  {!isPrimary && (
    <span className="absolute top-3 left-3 rounded-full bg-blue-400 px-3 py-1 text-xs font-medium text-white">
      به‌زودی
    </span>
  )}

  <div className="flex items-center justify-between mb-6">
    <span
      className={`text-sm ${
        isPrimary ? "text-emerald-50" : "text-gray-500"
      }`}
    >
      {item.label}
    </span>

    <div
      className={`rounded-2xl flex items-center justify-center p-2 ${
        isPrimary ? "bg-emerald-50" : "bg-gray-200"
      }`}
    >
      <Icon
        className={`text-3xl md:text-4xl ${
          isPrimary ? "text-emerald-600" : "text-gray-400"
        }`}
      />
    </div>
  </div>

  <p className="text-xl">
    {formatnumber.price(item.amount)}
  </p>
</div>
        );
      })}
    </div>
  );
}