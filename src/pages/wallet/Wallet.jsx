// Wallet.jsx
import WalletCards from "./components/WalletCards";
import TransferForm from "./components/TransferForm";
import { walletSummary } from "./walletData";
import TransactionsList from "./components/TransactionsList";
import toast from "react-hot-toast";

export default function Wallet() {
  const handleTransfer = ({ recipient, amount }) => {
    toast.success(" انتفال یافت ")
  };

  const balanceItem = walletSummary.find((item) => item.id === "balance");

  return (
    <div dir="rtl" className="container md:max-w-7xl mx-auto p-5 space-y-6 ">
      <div  >
        <h2 className="text-lg font-semibold text-gray-900 mb-1">کیف پول</h2>
        <p className="text-sm text-gray-500">مدیریت موجودی و انتقال وجه</p>
      </div>

      <WalletCards items={walletSummary} />

      <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-6">

        <div className="col-span-1 md:col-span-4">
          <TransferForm
            balance={balanceItem.amount}
            onTransfer={handleTransfer}
          />
        </div>

        <div className="col-span-1 md:col-span-8">
          <TransactionsList />
        </div>

      </div>

    </div>
  );
}