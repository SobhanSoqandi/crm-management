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

        return (
          <div
            key={item.id}
            className={`rounded-2xl p-5 border ${
              isPrimary
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "bg-white border-gray-100 text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <span
                className={`text-sm ${
                  isPrimary ? "text-emerald-50" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              <div
                className="rounded-2xl flex items-center justify-center bg-emerald-50 p-2 "
                
            
              >
                <Icon
                  className="text-3xl md:text-4xl text-emerald-600"
                />
              </div>
            </div>

            <p className="text-xl ">
              {formatnumber.price(item.amount)}
            </p>
          </div>
        );
      })}
    </div>
  );
}