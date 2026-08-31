
import React from "react";
import DynamicTable from "../../components/UI/DynamicTable";
import Loading from "../../components/UI/Loading";
import { MdEdit, MdDeleteOutline, MdAdd } from "react-icons/md";
import { formatnumber } from "../../Utils/ToPersianNumber";
import Modal from "../../components/UI/modal";
import DeleteService from "./DeleteService";
import useFetchData from "../../hooks/useFetchData";
import ServiceForm from "./ServiceForm";
import useSalon from "../../hooks/useSalon";

function Services() {
    const { salon, isSalonLoading } = useSalon();

    const salonId = salon?.data?.id;

    const { data, isLoading } = useFetchData(
        ["services-list", salonId],
        `salon/{salon-id}/services?salon_id=${salonId}`,
        {
            enabled: !!salonId,
        }
    );

    const rows =
        data?.data?.map((service) => ({
            id: service.id,
            name: service.name,
            salon_id: service.salon_id,
            is_active: service.is_active,
            createdAt: service.CreatedAt,
        })) || [];

    const columns = [
        {
            label: "نام خدمت",
            field: "name",
            width: "25%",
        },
        {
            label: "وضعیت",
            field: "is_active",
            width: "20%",
            render: (value) => (
                <span style={{ color: value ? "green" : "red" }}>
                    {value ? "فعال" : "غیرفعال"}
                </span>
            ),
        },
        {
            label: "تاریخ ایجاد",
            field: "createdAt",
            width: "20%",
            render: (value) =>
                formatnumber.digits(
                    new Date(value).toLocaleDateString("fa-IR")
                ),
        },
        {
            label: "عملیات",
            width: "20%",
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <Modal>
                        <Modal.Open>
                            <button className="btn--mini btn--gold text-[#fdfdfd]">
                                <MdEdit className="text-base md:text-xl" />
                                ویرایش
                            </button>
                        </Modal.Open>

                        <Modal.Window>
                            <ServiceForm
                                mode="edit"
                                serviceId={row.id}
                                initialData={row}
                            />
                        </Modal.Window>
                    </Modal>

                    <Modal>
                        <Modal.Open>
                            <button className="btn--mini text-rose-400">
                                <MdDeleteOutline className="text-base md:text-xl" />
                                حذف
                            </button>
                        </Modal.Open>

                        <Modal.Window>
                            <DeleteService serviceId={row.id} />
                        </Modal.Window>
                    </Modal>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full container mx-auto p-4">
            <div className="flex justify-end">
                <Modal>
                    <Modal.Open>
                        <button className="flex gap-1 btn btn--primary">
                            <MdAdd className="text-xl" />
                            افزودن خدمت
                        </button>
                    </Modal.Open>

                    <Modal.Window>
                        <ServiceForm
                            mode="add"
                            salonId={salonId}
                        />
                    </Modal.Window>
                </Modal>
            </div>

            <div className="py-3">
                {isSalonLoading || isLoading ? (
                    <Loading />
                ) : (
                    <DynamicTable
                        columns={columns}
                        data={rows}
                        keyField="id"
                    />
                )}
            </div>
        </div>
    );
}

export default Services;
