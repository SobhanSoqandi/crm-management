import React from 'react'
import DynamicTable from '../../components/UI/DynamicTable';
import Loading from '../../components/UI/Loading';
import { FcClock } from 'react-icons/fc';
import { MdOutlineRestore } from 'react-icons/md';
import { formatnumber } from '../../Utils/ToPersianNumber';

function Customers() {

    const openModal = () => {
        alert("hi modal")
    }

    const columns = [
        { label: 'نام', field: 'name', width: '20%' },
        {
            label: "شماره",
            field: "phone",
            width: "20%",
            render: (value) => formatnumber.digits(value),
        },
        { label: 'خذمات', field: 'service', width: '25%' },
        { label: 'ایمیل', field: 'email', width: '25%' },
        {
            label: 'وضعیت',
            field: 'status',
            width: "30%",
            render: (value) => (
                <span style={{ color: value === 'فعال' ? 'green' : 'red' }}>
                    {value}
                </span>
            )
        },
        {
            label: "عملیات",
            width: "30%",
            render: (_, row) => (
                <button
                    className="btn--mini"
                    onClick={() => openModal(row)}
                >
                    <MdOutlineRestore className="text-base md:text-xl" />
                    تاریخچه
                </button>
            ),
        },
    ];

    const data = [
        { id: 1, name: 'علی رضایی', email: 'ali@example.com', status: 'فعال', op: <Loading />, service: 'لیزر', phone: "09151542225" },
        { id: 2, name: 'سارا محمدی', email: 'sara@example.com', status: 'غیرفعال', op: 'کاربر', service: 'لیزر', phone: "09151542225" },
    ];

    return (
        <div className="w-full container mx-auto" >
            <DynamicTable columns={columns} data={data} keyField="id" />
        </div>
    )
}

export default Customers;