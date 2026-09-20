import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { SectionCard, ChartTooltip } from "./SectionCard";
import { formatCompact } from "./formatters";

function RevenueChart({ revenue, className = "" }) {

  const data = [
    { name: "این ماه", value: Number(revenue?.this_month || 0), color: "#00BFD4" },
    { name: "این هفته", value: Number(revenue?.this_week || 0), color: "#f59e0b" },
    { name: "امروز", value: Number(revenue?.today || 0), color: "#10b981" },
  ];

  return (
    <SectionCard
      title="مقایسه درآمد"
      subtitle="امروز، این هفته و این ماه (تومان)"
      icon={TrendingUp}
      className={className}
    >
      <div dir="ltr" className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={56}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={formatCompact}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f8fafc" }} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={72}>
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

export default RevenueChart;
