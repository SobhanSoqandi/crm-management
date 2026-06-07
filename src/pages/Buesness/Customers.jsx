import React from 'react'
import DynamicTable from '../../components/UI/DynamicTable';

function Customers() {

    const columns = [
        { label: 'نام', field: 'name', width: '30%' },
        { label: 'شماره', field: 'phone', width: '20%' },
        { label: 'خذمات', field: 'service', width: '30%' },
        { label: 'ایمیل', field: 'email', width: '40%' },
        {
            label: 'وضعیت',
            field: 'status',
            render: (value) => (
                <span style={{ color: value === 'فعال' ? 'green' : 'red' }}>
                    {value}
                </span>
            )
        },
        { label: 'نقش', field: 'role', width: '20%' }
    ];

    const data = [
        { id: 1, name: 'علی رضایی', email: 'ali@example.com', status: 'فعال', role: 'ادمین', service: 'لیزر', phone: "09151542225" },
        { id: 2, name: 'سارا محمدی', email: 'sara@example.com', status: 'غیرفعال', role: 'کاربر', service: 'لیزر', phone: "09151542225" },
    ];

    return (
        <div className="w-full" >
            <DynamicTable columns={columns} data={data} keyField="id" />
        </div>
    )
}

export default Customers;