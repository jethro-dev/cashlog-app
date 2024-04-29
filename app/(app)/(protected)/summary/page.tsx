import { ActivityPanel } from "@/components/activity-panel";
import { ChartPanel } from "@/components/chart-panel";
import { MonthlyTotalPanel } from "@/components/monthly-total-panel";
import RewardsPanel from "@/components/rewards-panel";
import { createClient } from "@/utils/supabase/server";

const SummaryPage = async () => {
  return (
    <main className="px-6 py-6 space-y-4">
      <MonthlyTotalPanel />
      <ActivityPanel />
      <ChartPanel />
      <RewardsPanel />
    </main>
  );
};

export default SummaryPage;
