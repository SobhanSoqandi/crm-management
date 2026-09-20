import { Users, Banknote, CalendarRange, CalendarDays } from "lucide-react";
import { formatMoney } from "./formatters";

const TONES = {
  violet: { icon: "bg-violet-100 text-violet-700", accent: "bg-violet-500" },
  emerald: { icon: "bg-emerald-100 text-emerald-700", accent: "bg-emerald-500" },
  amber: { icon: "bg-amber-100 text-amber-700", accent: "bg-amber-500" },
  rose: { icon: "bg-rose-100 text-rose-700", accent: "bg-rose-500" },
};

function StatCard({ title, value, unit, icon: Icon, tone = "violet" }) {
  const t = TONES[tone];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* نوار رنگی کنار کارت */}
      <span className={`absolute right-0 top-5 h-10 w-1 rounded-l-full ${t.accent}`} />

      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.icon}`}>
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-4 text-3xl font-extrabold text-slate-800">{value}</p>

      {unit && <span className="text-xs text-slate-400">{unit}</span>}
    </div>
  );
}

function StatsGrid({ customers, revenue }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="مشتریان"
        value={formatMoney(customers?.total)}
        icon={Users}
        tone="violet"
      />
      <StatCard
        title="درآمد امروز"
        value={formatMoney(revenue?.today)}
        unit="تومان"
        icon={Banknote}
        tone="emerald"
      />
      <StatCard
        title="درآمد این هفته"
        value={formatMoney(revenue?.this_week)}
        unit="تومان"
        icon={CalendarRange}
        tone="amber"
      />
      <StatCard
        title="درآمد این ماه"
        value={formatMoney(revenue?.this_month)}
        unit="تومان"
        icon={CalendarDays}
        tone="rose"
      />
    </div>
  );
}

export default StatsGrid;
