
import { useState } from "react";
import { FiCopy, FiCheck, FiLink, FiAlertCircle } from "react-icons/fi";
import useSalon from "../../hooks/useSalon";

export default function SalonRegisterLink() {
    const { salon, isSalonLoading } = useSalon();
    const [copied, setCopied] = useState(false);

    const salonId = salon?.data?.id;
    const registerLink = salonId ? `https://paydarsystem.ir/register/${salonId}` : "";

    const handleCopy = async () => {
        if (!registerLink) return;
        await navigator.clipboard.writeText(registerLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 20000);
    };

    if (isSalonLoading) return <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-sm text-gray-500">در حال دریافت اطلاعات سالن...</div>;

    if (!salonId) return <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600"><FiAlertCircle size={20} /><div><p className="text-sm font-bold">شما صاحب سالن نیستید</p><p className="mt-1 text-xs text-red-500">امکان ایجاد لینک ثبت‌نام برای سالن وجود ندارد.</p></div></div>;

    return (
        <div className="overflow-hidden rounded-2xl bg-white">
            <div className="border-b border-gray-100 bg-gradient-to-l from-teal-50 to-white px-4 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f7bd00] text-white"><FiLink size={24} /></div>
                    <div className="min-w-0"><h3 className="text-base font-bold text-gray-800 sm:text-lg">لینک ثبت‌نام مشتریان</h3><p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">لینک اختصاصی سالن خود را با مشتریانتان به اشتراک بگذارید</p></div>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                <div className="mb-2 flex min-h-6 items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-emerald-900 sm:text-sm">لینک اختصاصی شما</span>{copied && <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-green-600 sm:text-xs"><FiCheck size={14} /> کپی شد</span>}</div>

                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1.5" dir="ltr">
                    <input value={registerLink} readOnly className="min-w-0 flex-1 bg-transparent px-2 text-xs text-gray-700 outline-none sm:text-sm" />
                    <button type="button" onClick={handleCopy} className={`flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white transition-all sm:h-10  sm:text-sm ${copied ? "bg-green-500" : "bg-teal-600 hover:bg-teal-700"}`}>{copied ? <FiCheck size={20} /> : <FiCopy size={20} />}{copied ? "کپی شد" : ""}</button>
                </div>

                <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-gray-400 sm:text-xs sm:leading-6"><FiLink className="mt-1 shrink-0" size={13} /><p>این لینک را با مشتریان خود به اشتراک بگذارید تا ثبت‌نام آن‌ها به‌صورت خودکار به سالن شما متصل شود.</p></div>
            </div>
        </div>
    );
}
