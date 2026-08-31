import React, { useState } from 'react'
import DynamicTable from '../../components/UI/DynamicTable';
import Loading from '../../components/UI/Loading';
import { MdOutlineRestore } from 'react-icons/md';
import { formatnumber } from '../../Utils/ToPersianNumber';
import SearchInput from '../../components/UI/SearchInput';
import Modal from '../../components/UI/modal';
import HistoryCustomer from './History/HistoryCustomer';
import useFetchData from '../../hooks/useFetchData';

function Customers() {
    const [searchTerm, setSearchTerm] = useState('');

    const params = new URLSearchParams();
    if (searchTerm) {
        if (/^\d+$/.test(searchTerm)) {
            params.set('phone', searchTerm);
        } else {
            params.set('first_name', searchTerm);
            params.set('last_name', searchTerm);
        }
    }

    const { data, isLoading } = useFetchData(
        ['customers-search', searchTerm],
        `salon/search?${params.toString()}`
    );

    const rows = data?.data?.map(({ customer, phone }) => ({
        id: customer.id,
        name: `${customer.first_name} ${customer.last_name}`,
        phone: customer.user?.phone || phone,
        email: customer.user?.email || '-',
        status: customer.user?.is_active ? 'فعال' : 'غیرفعال',
    })) || [];

    const columns = [
        { label: 'نام', field: 'name', width: '20%' },
        {
            label: "شماره",
            field: "phone",
            width: "20%",
            render: (value) => formatnumber.digits(value),
        },
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
                <Modal>
                    <Modal.Open>
                        <button className="btn--mini">
                            <MdOutlineRestore className="text-base md:text-xl" />
                            تاریخچه
                        </button>
                    </Modal.Open>
                    <Modal.Window>
                        <HistoryCustomer customerId={row.id} />
                    </Modal.Window>
                </Modal>
            ),
        },
    ];

    return (
        <div className="w-full container mx-auto p-4">
            <div className="max-w-96">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="جستجو بر اساس نام یا شماره تماس"
                />
            </div>
            <div className="py-3">
                {isLoading ? (
                    <Loading />
                ) : (
                    <DynamicTable columns={columns} data={rows} keyField="id" />
                )}
            </div>
        </div>
    )
}

export default Customers;