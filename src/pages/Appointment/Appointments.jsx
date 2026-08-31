import { useState, useEffect, useMemo } from "react";
import HeaderAppoint from './HeaderAppoint'
import DynamicTable from "../../components/UI/DynamicTable"
import Pagination from "../../components/UI/Pagination"
import { MdDelete, MdOutlineRestorePage, MdPayment } from 'react-icons/md';
import { FaCheckCircle, FaCoins } from 'react-icons/fa';
import { formatnumber } from '../../Utils/ToPersianNumber';
import Modal from '../../components/UI/modal';
import Payappointment from './payment/Payappointment';
import useFetchData from '../../hooks/useFetchData';
import useUser from '../../hooks/useUser';
import Loading from '../../components/UI/Loading';
import useMutationData from '../../services/useMutationData';
import ConfirmDelete from '../../components/UI/ConfirmDelete';
import { useQueryClient } from '@tanstack/react-query';
import { toGregorianISO, getToday } from './calendar/dateUtils';

const PAGE_SIZE = 10;

function getCustomerName(customer) {

  if (!customer?.first_name && !customer?.last_name) return "نامشخص";
  return `${customer?.first_name ?? ""} ${customer?.last_name ?? ""}`.trim();
}

function extractAppointments(raw) {
  const payload = raw?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.appointment)) return payload.appointment;
  return [];
}

// GET /customer هم به همون شکل { data: [...] } برمی‌گرده
function extractCustomers(raw) {
  const payload = raw?.data;
  return Array.isArray(payload) ? payload : [];
}


function isSameGregorianDate(isoDateTime, gregorianDateOnly) {
  return isoDateTime.slice(0, 10) === gregorianDateOnly;
}

function Appointments() {

  const queryClient = useQueryClient();

  const [phone, setPhone] = useState("");
  const [debouncedPhone, setDebouncedPhone] = useState("");
  const [startDate, setStartDate] = useState(getToday());
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedPhone(phone));
    return () => clearTimeout(timeout);
  }, [phone]);

  useEffect(() => {
    setPage(1);
  }, [debouncedPhone, startDate]);

  const { data: appointmentsRaw, isLoading: isAppointmentsLoading, isError: isAppointmentsError } =
    useFetchData("appointments", "appointments/me");

  const { data: customersRaw, isLoading: isCustomersLoading, isError: isCustomersError } =
    useFetchData("customers", "customer");

  const isLoading = isAppointmentsLoading || isCustomersLoading;
  const isError = isAppointmentsError || isCustomersError;
  

  const allAppointments = extractAppointments(appointmentsRaw);
  const allCustomers = extractCustomers(customersRaw);

  const customersById = useMemo(() => {
    return new Map(allCustomers.map((c) => [c.id, c]));
  }, [allCustomers]);

  const filtered = useMemo(() => {
    const startDateISO = startDate ? toGregorianISO(startDate) : null;

    return allAppointments
      .filter((a) => !a.IsDeleted)
      .filter((a) => {
        const customer = customersById.get(a.customer_id);
        const userPhone = customer?.user?.phone ?? "";
        return debouncedPhone ? userPhone.includes(debouncedPhone) : true;
      })
      .filter((a) => {
        return startDateISO ? isSameGregorianDate(a.start_time, startDateISO) : true;
      });
  }, [allAppointments, customersById, debouncedPhone, startDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const data = paginated.map((a) => {
    const customer = customersById.get(a.customer_id);
    const dateObj = new Date(a.start_time);

    return {
      id: a.id,
      customerId: a.customer_id,
      name: getCustomerName(customer),
      phone: customer?.user?.phone || "-",
      date: dateObj,
      time: dateObj,
      price: a.paid_price,
      is_paid: a.is_paid,
      isDeleted: a.IsDeleted,
    };
  });

  const { mutate: deleteAppointment } = useMutationData(
    (id) => `appointments/${id}`,
    "delete",
    "delete-appointment",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      },
    }
  );

  const { user } = useUser();

  if (isLoading) return;

  let isSalon = false;

  if (user.role_id == 2) {
    isSalon = true
  }


  const columns = [
 ...(isSalon
    ? [
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
      ]
    : []),
   
    {
      label: "تاریخ",
      field: "date",
      width: "20%",
      render: (value) => formatnumber.date(value)
    },
    {
      label: "ساعت",
      field: "time",
      width: "15%",
      render: (value) => new Date(value).toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      label: "عملیات",
      width: "10%",
      render: (_, row) => (
        <div className="flex gap-3">
          {!row.isDeleted && (
            <>
              {row.is_paid ? (
                <span
                  className="flex items-center  bg-emerald-50 text-nowrap border-2 border-emerald-500 text-emerald-500 p-1 rounded-lg font-bold"
                >
                  <FaCheckCircle className="inline-block ml-1 text-sm" />
                  پرداخت شده
                </span>
              ) : (
                <>
                  <Modal>
                    <Modal.Open name="payment">
                      <button className="btn--mini btn--primary text-[#ffffff]">
                        <FaCoins className="text-xl text-[#e7ad00]" />
                        <span>پرداخت</span>
                      </button>
                    </Modal.Open>

                    <Modal.Window name="payment">
                      <div className="p-6">
                        <h2 className="text-lg font-bold">
                          پرداخت
                        </h2>

                        <Payappointment
                          appointmentId={row.id}
                          customerId={row.customerId}
                        />
                      </div>
                    </Modal.Window>
                  </Modal>

                  <Modal>
                    <Modal.Open name="delete">
                      <button className="btn--mini btn-light text-rose-500 border border-red-400">
                        <MdDelete className="text-xl" />
                        <span>حذف</span>
                      </button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                      <ConfirmDelete
                        resourceName="نوبت"
                        onConfirm={() => deleteAppointment(row.id)}
                      />
                    </Modal.Window>
                  </Modal>
                </>
              )}
            </>
          )}

          {row.isDeleted && (
            <button className="btn--mini bg-blue-400 text-white">
              <MdOutlineRestorePage className="text-xl" />
              <span>جایگزینی</span>
            </button>
          )}
        </div>
      ),
    }
  ]

  return (
    <div className="container mx-auto">
      <HeaderAppoint
        phone={phone}
        onPhoneChange={setPhone}
        startDate={startDate}
        onStartDateChange={setStartDate}
        isSalon={isSalon}
      />

      <div className="w-full p-3">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p className="text-center text-red-500 py-6">
            کاربر گرامی شما تاکنون نوبتی ثبت نکرده اید
          </p>
        ) : data.length === 0 ? (
          <p className="text-center text-slate-400 py-6">
            نوبتی یافت نشد
          </p>
        ) : (
          <>
            <DynamicTable
              columns={columns}
              data={data}
              keyField="id"
              getRowClassName={(row) => row.is_paid ? "bg-emerald-50" : ""}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              total={filtered.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Appointments
