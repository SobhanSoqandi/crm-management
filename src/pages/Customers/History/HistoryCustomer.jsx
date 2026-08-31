import React from "react";
import DynamicTable from "../../../components/UI/DynamicTable";
import Loading from "../../../components/UI/Loading";
import { formatnumber } from "../../../Utils/ToPersianNumber";
import useFetchData from "../../../hooks/useFetchData";

function HistoryCustomer({ customerId }) {
  const { data, isLoading } = useFetchData(
    ['customer-appointments', customerId],
    `customer/appointments?customer_id=${customerId}`
  );

  const columns = [
    { label: "تاریخ", field: "date", width: "20%" },
    { label: "ساعت", field: "time", width: "15%" },
    {
      label: "تعداد خدمات",
      field: "servicesCount",
      width: "15%",
      render: (value) => formatnumber.digits(value),
    },
    {
      label: "مبلغ",
      field: "price",
      width: "20%",
      render: (value) => formatnumber.price(value),
    },
    {
      label: "وضعیت پرداخت",
      field: "status",
      width: "15%",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            value === "پرداخت شده"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const rows = data?.map((item) => {
    const start = new Date(item.start_time);
    return {
      id: item.id,
      date: start.toLocaleDateString("fa-IR"),
      time: start.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      servicesCount: item.appointment_services?.length || 0,
      price: Number(item.paid_price),
      status: item.is_paid ? "پرداخت شده" : "پرداخت نشده",
    };
  }) || [];

  const customer = data?.[0]?.customer;
  const totalPaid = rows
    .filter((r) => r.status === "پرداخت شده")
    .reduce((sum, r) => sum + r.price, 0);

  return (
    <div className="container mx-auto">
      <div className="p-5">
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-xl text-slate-700">سوابق مشتری</h2>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-slate-500">نام مشتری</p>
              <h3 className="mt-1">
                {customer ? `${customer.first_name} ${customer.last_name}` : "-"}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">شماره تماس</p>
              <h3 className="mt-1">
                {customer ? formatnumber.digits(customer.user?.phone) : "-"}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">تعداد مراجعات</p>
              <h3 className="mt-1">{formatnumber.digits(rows.length)} بار</h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">مجموع خرید</p>
              <h3 className="mt-1 text-emerald-600">
                {formatnumber.price(totalPaid)}
              </h3>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <DynamicTable columns={columns} data={rows} keyField="id" />
        )}
      </div>
    </div>
  );
}

export default HistoryCustomer;