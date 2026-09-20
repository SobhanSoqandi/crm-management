import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Scissors } from "lucide-react";
import { SectionCard, ChartTooltip } from "./SectionCard";
import { formatMoney, formatCompact } from "./formatters";

function truncate(text = "", max = 14) {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function ServicesSection({ items = [], className = "" }) {
  const chartData = items.map((service) => ({
    name: service.name,
    value: Number(service.revenue || 0),
  }));

  const chartHeight = Math.max(240, chartData.length * 52);

  return (
    <SectionCard
      title="خدمات"
      subtitle="درآمد و تعداد نوبت هر خدمت"
      icon={Scissors}
      className={className}
    >
      {items.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">هنوز خدمتی ثبت نشده است.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {/* نمودار درآمد هر خدمت */}
          <div dir="ltr" style={{ height: chartHeight }} className="w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 8, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                {/* reversed => میله‌ها از راست به چپ رشد می‌کنند */}
                <XAxis
                  type="number"
                  reversed
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={formatCompact}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  orientation="right"
                  width={110}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#475569", fontSize: 12 }}
                  tickFormatter={(v) => truncate(v)}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "#faf5ff" }} />
                <Bar dataKey="value" fill="#a21caf" radius={8} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* جدول */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="py-3 text-right font-medium">خدمت</th>
                  <th className="py-3 text-right font-medium">تعداد نوبت</th>
                  <th className="py-3 text-right font-medium">درآمد</th>
                </tr>
              </thead>

              <tbody>
                {items.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-slate-50 transition-colors last:border-0 hover:bg-fuchsia-50/40"
                  >
                    <td className="py-3 font-medium text-slate-800">{service.name}</td>

                    <td className="py-3">
                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                        {formatMoney(service.appointments_count)}
                      </span>
                    </td>

                    <td className="py-3 font-semibold text-slate-700">
                      {formatMoney(service.revenue)}{" "}
                      <span className="text-xs font-normal text-slate-400">تومان</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

export default ServicesSection;
