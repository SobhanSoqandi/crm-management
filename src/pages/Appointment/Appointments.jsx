import React from 'react'
import HeaderAppoint from './HeaderAppoint'
import DynamicTable from "../../components/UI/DynamicTable"
import { MdPayment } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { formatnumber } from '../../Utils/ToPersianNumber';


function Appointments() {


    const columns = [
        {
            label: "نام",
            field: "name",
            width: "20%",
        },
        {
            label: "شماره",
            field: "phone",
            width: "20%",
            render: (value) => formatnumber.digits(value),
        },
        {
            label: "خدمات",
            field: "service",
            width: "25%",
        },
        {
            label: "زمان",
            field: "time",
            width: "25%",
            render: (value) => formatnumber.time(value),
        },
        {
            label: "مبلغ",
            field: "price",
            width: "25%",
            render: (value) => formatnumber.price(value),
        },
        {
            label: "عملیات",
            width: "30%",
            render: (_, row) => (
                <div className="flex gap-2" >
                    <button
                        className="btn--mini bg-rose-500 text-white "
                        onClick={() => openModal(row)}
                    >
                        <BiTrash className="text-base md:text-xl text-white" />
                        <span className="hidden md:block" > حذف </span>
                    </button>

                    <button
                        className="btn--mini bg-teal-500 text-white "
                        onClick={() => openModal(row)}
                    >
                        <MdPayment className="text-base md:text-xl text-amber-400" />
                        پرداخت
                    </button>
                </div>

            ),
        },
    ]

    const data = [
        { id: 1, name: ' کبری کاریزی ', price: '35000', op: " پرداخت ", service: 'مو', time: "12:30", phone: "09151542225" },
        { id: 2, name: 'سارا محمدی', price: '700000', op: 'پردخت', service: 'لیزر', time: "14:30", phone: "09151542225" },
    ];

    return (
        <div className="container mx-auto" >
            <HeaderAppoint />

            <div className="w-full" >
                <DynamicTable columns={columns} data={data} keyField="id" />
            </div>
        </div>
    )
}

export default Appointments