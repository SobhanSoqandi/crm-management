import React from "react";
import DynamicTable from "../../../components/UI/DynamicTable";
import { formatnumber } from "../../../Utils/ToPersianNumber";

function HistoryCustomer() {
  const columns = [
    {
      label: "تاریخ",
      field: "date",
      width: "18%",
    },

    {
      label: "ساعت",
      field: "time",
      width: "12%",
      render: (value) => formatnumber.time(value),
    },

    {
      label: "خدمات",
      field: "service",
      width: "22%",
    },

    {
      label: "مبلغ",
      field: "price",
      width: "18%",
      render: (value) => formatnumber.price(value),
    },

    {
      label: "کش‌بک",
      field: "cashback",
      width: "18%",
      render: (value) => formatnumber.price(value),
    },

    {
      label: "وضعیت پرداخت",
      field: "status",
      width: "12%",
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

const customer = {
    name: "کبری کاریزی",
    phone: "09151542225",
    visits: 4,
    wallet: 820000,
};

  const data = [
    {
      id: 1,
      date: "1405/05/01",
      time: "10:30",
      service: "رنگ مو",
      price: 2300000,
      cashback: 230000,
      status: "پرداخت شده",
    },

    {
      id: 2,
      date: "1405/04/18",
      time: "17:00",
      service: "کراتین",
      price: 3500000,
      cashback: 350000,
      status: "پرداخت شده",
    },

    {
      id: 3,
      date: "1405/04/01",
      time: "14:00",
      service: "کوتاهی",
      price: 600000,
      cashback: 60000,
      status: "پرداخت شده",
    },

    {
      id: 4,
      date: "1405/03/20",
      time: "12:30",
      service: "هایلایت",
      price: 1800000,
      cashback: 180000,
      status: "پرداخت شده",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="p-5">

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">

          <h2 className="text-xl text-slate-700">
            سوابق مشتری
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">

            <div>
              <p className="text-sm text-slate-500">
                نام مشتری
              </p>

              <h3 className="mt-1">
                کبری کاریزی
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                شماره تماس
              </p>

              <h3 className="mt-1">
                {formatnumber.digits("09151542225")}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                تعداد مراجعات
              </p>

              <h3 className="mt-1">
                4 بار
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                اعتبار خرید
              </p>

              <h3 className="mt-1 text-emerald-600">
                {formatnumber.price(820000)}
              </h3>
            </div>

          </div>

        </div>

        <DynamicTable
          columns={columns}
          data={data}
          keyField="id"
        />

      </div>
    </div>
  );
}

export default HistoryCustomer;