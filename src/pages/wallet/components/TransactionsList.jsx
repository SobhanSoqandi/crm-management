import DynamicTable from "../../../components/UI/DynamicTable";
import { formatnumber } from "../../../Utils/ToPersianNumber";
import Loading from "../../../components/UI/Loading";
import useTransactions from "../../../hooks/useTransactions";

const TYPE_LABELS = {
    withdraw: {
        text: "انتقال",
        tone: "text-red-600 bg-red-50",
    },
    deposit: {
        text: "واریز",
        tone: "text-green-600 bg-green-50",
    },
    cashback: {
        text: "بازگشت وجه",
        tone: "text-emerald-600 bg-emerald-50",
    },
    spend: {
        text: "پرداخت از کیف پول",
        tone: "text-red-600 bg-red-50",
    },
    paid: {
        text: "پرداخت شده",
        tone: "text-blue-600 bg-blue-50",
    },
};

const DEFAULT_DESCRIPTION = {
    cashback: "بازگشت وجه",
    spend: "پرداخت از کیف پول",
    paid: "پرداخت بابت نوبت",
    withdraw: "برداشت از حساب",
    deposit: "واریز به کیف پول",
};

const normalizeType = (type) => String(type ?? "").toLowerCase();

const isOutgoing = (type) => {
    const normalizedType = normalizeType(type);

    return (
        normalizedType === "withdraw" ||
        normalizedType === "spend"
    );
};

const isIncoming = (type) => {
    const normalizedType = normalizeType(type);

    return (
        normalizedType === "deposit" ||
        normalizedType === "cashback"
    );
};

function resolveDescription(row) {
    if (row.description && row.description !== "NULL") {
        return row.description;
    }

    return DEFAULT_DESCRIPTION[normalizeType(row.type)] ?? "-";
}

const columns = [
    {
        field: "created_at",
        label: "تاریخ",
        width: "120px",
        render: (value) => (
            <span className="text-sm text-gray-600">
                {formatnumber.date(new Date(value))}
            </span>
        ),
    },
    {
        field: "description",
        label: "توضیحات",
        render: (value, row) => (
            <span className="text-sm text-gray-600">
                {resolveDescription(row)}
            </span>
        ),
    },
    {
        field: "type",
        label: "نوع تراکنش",
        width: "190px",
        render: (value) => {
            const normalizedType = normalizeType(value);

            const {
                text,
                tone,
            } = TYPE_LABELS[normalizedType] ?? {
                text: value ?? "-",
                tone: "text-gray-600 bg-gray-50",
            };

            return (
                <span
                    className={`text-xs md:text-sm px-2 py-1 rounded-full ${tone}`}
                >
                    {text}
                </span>
            );
        },
    },
    {
        field: "amount",
        label: "مبلغ",
        width: "140px",
        render: (value, row) => {
            const normalizedType = normalizeType(row.type);
            const amount = Number(value) || 0;

            return (
                <span
                    className={`text-sm font-medium ${
                        isOutgoing(normalizedType)
                            ? "text-red-600"
                            : isIncoming(normalizedType)
                                ? "text-emerald-600"
                                : "text-gray-700"
                    }`}
                >
                    {isOutgoing(normalizedType)
                        ? "-"
                        : isIncoming(normalizedType)
                            ? "+"
                            : ""}
                    {formatnumber.price(amount)}
                </span>
            );
        },
    },
];

export default function TransactionsList() {
    const {
        transactions,
        isLoading,
        isError,
    } = useTransactions();

    return (
        <div className="bg-white">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
                تراکنش‌های اخیر
            </h3>

            {isLoading ? (
                <Loading />
            ) : isError ? (
                <p className="text-center rounded-2xl bg-rose-50 text-rose-500 py-5">
                    شما تا کنون پرداختی نداشته‌اید
                </p>
            ) : transactions.length === 0 ? (
                <p className="text-center text-slate-400 py-6">
                    تراکنشی یافت نشد
                </p>
            ) : (
                <DynamicTable
                    columns={columns}
                    data={transactions}
                    keyField="id"
                />
            )}
        </div>
    );
}