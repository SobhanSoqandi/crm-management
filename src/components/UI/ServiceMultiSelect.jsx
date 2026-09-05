import { useState, useEffect, useRef } from "react";
import { HiChevronDown, HiCheck, HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import useServices from "../../hooks/useServices";
import Loading from "./Loading";

function ServiceMultiSelect({ value = [], onChange }) {
    const { services, isLoading } = useServices();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        function handleEscape(e) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        if (!open) setQuery("");
    }, [open]);

    const activeServices = services.filter((service) => service.is_active);

    const visibleServices = query
        ? activeServices.filter((service) => service.name.includes(query))
        : activeServices;

    const toggleService = (id) => {
        const next = value.includes(id)
            ? value.filter((item) => item !== id)
            : [...value, id];
        onChange(next);
    };

    const removeService = (id, e) => {
        e.stopPropagation();
        onChange(value.filter((item) => item !== id));
    };

    const clearAll = () => onChange([]);

    const selectedServices = activeServices.filter((service) =>
        value.includes(service.id)
    );

    return (
        <div className="relative" ref={containerRef}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                خدمات
            </label>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border bg-white px-4 py-2 text-sm transition-colors ${
                    open
                        ? "border-[#e4ab00] ring-1 ring-[#e4ab00]"
                        : "border-slate-200"
                }`}
            >
                {selectedServices.length > 0 ? (
                    <div className="flex flex-1 flex-wrap gap-1.5 text-right">
                        {selectedServices.map((service) => (
                            <span
                                key={service.id}
                                className="flex items-center gap-1 rounded-lg bg-[#c4ffd7] px-2.5 py-1 text-xs font-medium text-[#0A6847]"
                            >
                                {service.name}
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => removeService(service.id, e)}
                                    className="rounded-full p-0.5 hover:bg-[#0A6847]/20"
                                >
                                    <HiXMark className="text-sm" />
                                </span>
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="text-slate-400">انتخاب خدمات (چند مورد)</span>
                )}

                <HiChevronDown
                    className={`shrink-0 text-xl text-slate-400 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                    {isLoading ? (
                        <div className="p-4">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            {activeServices.length > 6 && (
                                <div className="border-b border-slate-100 p-2">
                                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                                        <HiMagnifyingGlass className="text-slate-400" />
                                        <input
                                            autoFocus
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="جستجوی خدمات..."
                                            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>
                            )}

                            <div
                                className="max-h-56 overflow-y-auto p-1.5"
                                role="listbox"
                                aria-multiselectable="true"
                            >
                                {visibleServices.length === 0 ? (
                                    <p className="px-3 py-6 text-center text-sm text-slate-400">
                                        خدمتی یافت نشد
                                    </p>
                                ) : (
                                    visibleServices.map((service) => {
                                        const checked = value.includes(service.id);

                                        return (
                                            <button
                                                key={service.id}
                                                type="button"
                                                role="option"
                                                aria-selected={checked}
                                                onClick={() => toggleService(service.id)}
                                                className={`flex w-full items-center gap-3 rounded-lg my-1 px-3 py-2.5 text-right text-sm transition-colors ${
                                                    checked
                                                        ? "bg-[#b2f6cc]"
                                                        : "hover:bg-slate-50"
                                                }`}
                                            >
                                                <span
                                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                                        checked
                                                            ? "border-[#ecf1ef] bg-[#007b50] text-white"
                                                            : "border-slate-400 bg-white"
                                                    }`}
                                                >
                                                    {checked && (
                                                        <HiCheck className="text-sm" />
                                                    )}
                                                </span>
                                                <span
                                                    className={
                                                        checked
                                                            ? "font-medium text-slate-800"
                                                            : "text-slate-600"
                                                    }
                                                >
                                                    {service.name}
                                                </span>
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2">
                                <span className="text-xs text-slate-400">
                                    {value.length > 0
                                        ? `${value.length} مورد انتخاب شده`
                                        : "موردی انتخاب نشده"}
                                </span>

                                <div className="flex items-center gap-3">
                                    {value.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={clearAll}
                                            className="text-sm text-nowrap font-medium text-rose-500 hover:underline"
                                        >
                                            پاک کردن
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="btn--mini btn--primary w-20 justify-center"
                                    >
                                        تأیید
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ServiceMultiSelect;