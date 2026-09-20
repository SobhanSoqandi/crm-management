function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-3xl bg-slate-200/70 ${className}`} />;
}

export function DashboardLoading() {
  return (
    <div className="min-h-screen space-y-4 bg-slate-50 p-4 md:p-6" dir="rtl">
      <Skeleton className="h-32" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 lg:col-span-2" />
        <Skeleton className="h-80" />
      </div>
      <p className="pt-2 text-center text-sm text-slate-400">در حال دریافت اطلاعات...</p>
    </div>
  );
}

export function DashboardError({ error }) {
  return (
    <div className="p-6" dir="rtl">
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
        <p className="font-bold">خطا در دریافت اطلاعات داشبورد</p>
        <pre className="mt-4 overflow-x-auto text-left text-xs">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export function DashboardEmpty() {
  return (
    <div className="p-6" dir="rtl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        اطلاعات داشبورد پیدا نشد.
      </div>
    </div>
  );
}
