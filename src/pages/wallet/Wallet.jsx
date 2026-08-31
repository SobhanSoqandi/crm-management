// Wallet.jsx
import WalletCards from "./components/WalletCards";

import Loading from "../../components/UI/Loading";
import toast from "react-hot-toast";
import useWallet from "../../hooks/useWallet";
import TransferForm from "./components/TransferForm";
import TransactionsList from "./components/TransactionsList";


const COMING_SOON_CARDS = [
  { id: "referral", label: "دعوت دوستان", icon: "FiUsers", amount: 0, tone: "disabled" },
  { id: "cashback", label: "بازگشت وجه", icon: "FiRefreshCw", amount: 0, tone: "disabled" },
];

export default function Wallet() {
  const { balance, isLoading, isError } = useWallet();

  const handleTransfer = ({ recipient, amount }) => {
    toast.success("انتقال یافت");
  };

  const walletSummary = [
    { id: "balance", label: "موجودی کیف پول", icon: "FiCreditCard", amount: balance, tone: "primary" },
    ...COMING_SOON_CARDS,
  ];

  return (
    <div dir="rtl" className="container md:max-w-7xl mx-auto p-5 space-y-6 ">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">کیف پول</h2>
        <p className="text-sm text-gray-500">مدیریت موجودی و انتقال وجه</p>
      </div>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p className="text-center text-red-500 py-6">
          دریافت اطلاعات کیف پول با خطا مواجه شد
        </p>
      ) : (
        <>
          <WalletCards items={walletSummary} />

          <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-6">
            <div className="col-span-1 md:col-span-4">
              <TransferForm balance={balance} onTransfer={handleTransfer} />
            </div>

            <div className="col-span-1 md:col-span-8">
              <TransactionsList />
            </div>
          </div>
        </>
      )}
    </div>
  );
}