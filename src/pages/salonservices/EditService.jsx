import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import useMutationData from '../../services/useMutationData';
import { useQueryClient } from '@tanstack/react-query';

function EditService({ serviceId, initialData, onCloseModal }) {
    const [name, setName] = useState(initialData?.name || '');
    const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutationData(
        (info) => `services/${info.id}`,
        'put',
        'edit-service',
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['services-list'] });
                onCloseModal?.();
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            id: serviceId,
            name,
            is_active: isActive,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-6 p-5">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-gray-800">ویرایش خدمت</h3>
                <p className="text-sm text-gray-400">اطلاعات خدمت را ویرایش و ذخیره کنید</p>
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

                <Switch
                    checked={isActive}
                    onChange={setIsActive}
                    className={`${isActive ? 'bg-emerald-500' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-100`}
                >
                    <span className="sr-only">فعال / غیرفعال</span>
                    <span
                        className={`${isActive ? '-translate-x-6' : '-translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200`}
                    />
                </Switch>
            </div>

            <div className="flex justify-end gap-2 pt-1">
                <button
                    type="button"
                    onClick={onCloseModal}
                    disabled={isPending}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50"
                >
                    انصراف
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending && (
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    )}
                    {isPending ? 'در حال ذخیره...' : 'ذخیره'}
                </button>
            </div>
        </form>
    )
}

export default EditService
