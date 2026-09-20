import { formatMoney } from "./formatters";

export function SectionCard({ title, subtitle, icon: Icon, action, className = "", children }) {
  return (
    <section
      className={`rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm md:p-6 ${className}`}
    >
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700">
              <Icon size={20} strokeWidth={2} />
            </span>
          )}
          <div>
            <h2 className="text-base font-bold text-slate-800 md:text-lg">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

// Tooltip مشترک برای نمودارهای recharts
export function ChartTooltip({ active, payload, label, unit = "تومان" }) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const title = label || item?.payload?.name;

  return (
    <div
      dir="rtl"
      className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-sm shadow-lg"
    >
      {title && <p className="text-xs text-slate-500">{title}</p>}
      <p className="mt-0.5 font-bold text-slate-800">
        {formatMoney(item.value)}{" "}
        <span className="text-xs font-normal text-slate-400">{unit}</span>
      </p>
    </div>
  );
}
