import React, { useState } from 'react'
import useMutationData from '../../services/useMutationData';
import { useQueryClient } from '@tanstack/react-query';
import Toggle from '../../components/UI/Toggle';
import Loading from "../../components/UI/Loading"

// mode: 'add' | 'edit'
// edit mode needs: serviceId, initialData
// add mode needs: salonId
function ServiceForm({ mode = 'add', serviceId, initialData, salonId, onCloseModal }) {
    const isEdit = mode === 'edit';

    const [name, setName] = useState(initialData?.name || '');
    const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutationData(
        (info) => (isEdit ? `services/${info.id}` : 'services'),
        isEdit ? 'put' : 'post',
        isEdit ? 'edit-service' : 'add-service',
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['services-list'] });
                onCloseModal?.();
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            mutate({ id: serviceId, name, is_active: isActive });
        } else {
            mutate({ salon_id: salonId, name, is_active: isActive });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-6 p-5">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-gray-800">
                    {isEdit ? 'ویرایش خدمت' : 'افزودن خدمت'}
                </h3>
                <p className="text-sm text-gray-400">
                    {isEdit
                        ? 'اطلاعات خدمت را ویرایش و ذخیره کنید'
                        : 'اطلاعات خدمت جدید را وارد کنید'}
                </p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-gray-600">
                    نام خدمت
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: کاشت ناخن"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-350 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 px-3.5 py-3">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">فعال</span>
                    <span className="text-xs text-gray-400">
                        {isActive ? 'این خدمت برای مشتریان قابل رزرو است' : 'این خدمت غیرفعال است'}
                    </span>
                </div>

                <Toggle enabled={isActive} onChange={setIsActive} />
            </div>

            <div className="flex justify-end gap-2 pt-1">
                <button
                    type="button"
                    onClick={onCloseModal}
                    disabled={isPending}
                    className="btn btn--light w-full"
                >
                    انصراف
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn--primary w-full"
                >
                    {isPending && (
                       <Loading />
                    )}
                    {isPending
                        ? 'در حال ذخیره...'
                        : isEdit
                            ? 'ذخیره'
                            : 'افزودن'}
                </button>
            </div>
        </form>
    )
}

export default ServiceForm
