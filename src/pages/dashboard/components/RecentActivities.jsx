
import { Activity } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { formatMoney } from "./formatters";

function RecentActivities({ items = [], className = "" }) {
  return (
    <SectionCard title="فعالیت‌های اخیر" icon={Activity} className={className}>
      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          فعالیتی ثبت نشده است.
        </p>
      ) : (
        <div className="max-h-[360px] overflow-y-auto pl-1">
          <ul className="relative space-y-3">
            <span className="absolute bottom-4 right-[19px] top-4 w-px bg-slate-200" />

            {items.map((activity, index) => (
              <li
                key={`${activity.created_at}-${index}`}
                className="relative flex items-center justify-between gap-4 rounded-2xl p-2 transition-colors hover:bg-slate-50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border-4 border-white bg-fuchsia-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-600" />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-800">
                      {activity.title}
                    </p>

                    {activity.description && (
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {activity.description}
                      </p>
                    )}
                  </div>
                </div>

                <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {formatMoney(activity.amount)} تومان
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  );
}

export default RecentActivities;
