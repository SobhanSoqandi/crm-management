// TransactionsList.jsx
import DynamicTable from "../../../components/UI/DynamicTable";
import { formatnumber } from "../../../Utils/ToPersianNumber";
import { transactions } from "../transactionsData";

const TYPE_LABELS = {
    withdraw: { text: "انتقال", tone: "text-red-600 bg-red-50" },
    deposit: { text: "واریز", tone: "text-green-600 bg-green-50" },
    cashback: { text: "بازگشت وجه", tone: "text-emerald-600 bg-emerald-50" },
    referral: { text: "دعوت دوستان", tone: "text-blue-600 bg-blue-50" },
};

const isOutgoing = (type) => type === "withdraw";

const columns = [
    {
        field: "date",
        label: "تاریخ",
        width: "120px",
        render: (value) => (
            <span className="text-sm text-gray-600">
                {formatnumber.digits(value)}
            </span>
        ),
    },
    {
        field: "description",
        label: "توضیحات",
    },
    {
        field: "type",
        label: "نوع تراکنش",
        width: "140px",
        render: (value) => {
            const { text, tone } = TYPE_LABELS[value] ?? { text: value, tone: "text-gray-600 bg-gray-50" };
            return (
                <span className={`text-xs md:text-sm px-2 py-1 rounded-full ${tone}`}>
                    {text}
                </span>
            );
        },
    },
    {
        field: "amount",
        label: "مبلغ",
        width: "140px",
        render: (value, row) => (
            <span
                className={`text-sm font-medium ${isOutgoing(row.type) ? "text-red-600" : "text-emerald-600"
                    }`}
            >
                {isOutgoing(row.type) ? "-" : "+"}
                {formatnumber.price(value)}
            </span>
        ),
    },
];

export default function TransactionsList() {
    return (
        <div className="bg-white">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
                تراکنش‌های اخیر
            </h3>
            <DynamicTable columns={columns} data={transactions} keyField="id" />
        </div>
    );
}