import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CalendarCheck, CheckCircle2, Clock3 } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { formatMoney } from "./formatters";

function MiniStat({ label, value, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 text-center">
      <span className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
        <Icon size={16} />
      </span>
      <p className="mt-2 text-xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function TodayAppointments({ appointments, className = "" }) {
  const total = Number(appointments?.count || 0);
  const paid = Number(appointments?.paid_count || 0);
  const unpaid = Number(appointments?.unpaid_count || 0);

  const hasData = paid + unpaid > 0;
  const chartData = hasData
    ? [
        { name: "پرداخت شده", value: paid, color: "#10b981" },
        { name: "پرداخت نشده", value: unpaid, color: "#f43f5e" },
      ]
    : [{ name: "بدون داده", value: 1, color: "#e2e8f0" }];

  return (
    <SectionCard
      title="وضعیت امروز"
      subtitle="نوبت‌های پرداخت شده و پرداخت نشده"
      icon={CalendarCheck}
      className={className}
    >
      <div dir="ltr" className="relative mx-auto h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={62}
              outerRadius={86}
              paddingAngle={hasData ? 4 : 0}
              cornerRadius={8}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* عدد وسط نمودار */}
        <div
          dir="rtl"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-extrabold text-slate-800">{formatMoney(total)}</span>
          <span className="text-xs text-slate-500">کل نوبت‌ها</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <MiniStat
          label="کل نوبت‌ها"
          value={formatMoney(total)}
          icon={CalendarCheck}
          tone="bg-violet-100 text-violet-700"
        />
        <MiniStat
          label="پرداخت شده"
          value={formatMoney(paid)}
          icon={CheckCircle2}
          tone="bg-emerald-100 text-emerald-700"
        />
        <MiniStat
          label="پرداخت نشده"
          value={formatMoney(unpaid)}
          icon={Clock3}
          tone="bg-rose-100 text-rose-700"
        />
      </div>
    </SectionCard>
  );
}

export default TodayAppointments;
