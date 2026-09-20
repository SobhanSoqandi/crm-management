import useFetchData from "../../hooks/useFetchData";

import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import RevenueChart from "./components/RevenueChart";
import TodayAppointments from "./components/TodayAppointments";
import WalletCashback from "./components/WalletCashback";
import ServicesSection from "./components/ServicesSection";
import RecentActivities from "./components/RecentActivities";
import {
  DashboardLoading,
  DashboardError,
  DashboardEmpty,
} from "./components/DashboardStates";

function Dashboard() {
  const { data, isLoading, isError, error } =
    useFetchData("dashboard", "dashboard");

  if (isLoading) return <DashboardLoading />;
  if (isError) return <DashboardError error={error} />;

  const dashboard = data?.data;

  if (!dashboard) return <DashboardEmpty />;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6" dir="rtl">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-5">
        <DashboardHeader salonName={dashboard.salon?.name} />

        <StatsGrid customers={dashboard.customers} revenue={dashboard.revenue} />

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <RevenueChart revenue={dashboard.revenue} className="lg:col-span-2" />
          <TodayAppointments appointments={dashboard.today?.appointments} />
        </div>

        <WalletCashback wallet={dashboard.wallet} cashback={dashboard.cashback} />

        <ServicesSection items={dashboard.services?.items} />

        <RecentActivities items={dashboard.recent_activities?.items} />
      </div>
    </div>
  );
}

export default Dashboard;
