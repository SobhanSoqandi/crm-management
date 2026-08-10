import React from 'react'
import HeaderAppoint from './HeaderAppoint'
import DynamicTable from "../../components/UI/DynamicTable"
import { MdOutlineRestorePage, MdPayment } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { formatnumber } from '../../Utils/ToPersianNumber';
import Modal from '../../components/UI/modal';
import Payappointment from './payment/Payappointment';
import { FaCashRegister } from 'react-icons/fa';


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
                <div className="flex gap-2">
                    {!row.isDeleted && (
                        <>
                            <Modal>
                                <Modal.Open name="payment">
                                    <button className="btn--mini bg-emerald-500 text-white">
                                        <MdPayment className="text-xl" />
                                        <span>پرداخت</span>
                                    </button>
                                </Modal.Open>

                                <Modal.Window name="payment">
                                    <div className="p-6">
                                        <h2 className="text-lg font-bold">
                                            پرداخت
                                        </h2>

                                        <Payappointment />
                                    </div>
                                </Modal.Window>
                            </Modal>

                            <button
                                className="btn--mini bg-rose-500 text-white"
                                onClick={() => openModal(row)}
                            >
                                <BiTrash className="text-xl" />
                                <span>حذف</span>
                            </button>
                        </>
                    )}

                    {row.isDeleted && (
                        <button
                            className="btn--mini bg-blue-400 text-white"
                            onClick={() => openModal(row)}
                        >
                            <MdOutlineRestorePage className="text-xl" />
                            <span>جایگزینی</span>
                        </button>
                    )}
                </div>
            ),
        }
    ]

    const data = [
        { id: 1, name: ' کبری کاریزی ', price: '35000', op: " پرداخت ", service: 'مو', time: "12:30", isDeleted: false, phone: "09151542225" },
        { id: 2, name: 'سارا محمدی', price: '700000', op: 'پردخت', service: 'لیزر', time: "14:30", isDeleted: true, phone: "09151542225" },
    ];

    return (
        <div className="container mx-auto" >
            <HeaderAppoint />

            <div className="w-full p-3" >
                <DynamicTable columns={columns} data={data} keyField="id" />
            </div>
        </div>
    )
}

export default Appointments