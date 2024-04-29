import { faker } from "@faker-js/faker";
import Panel from "./panel";
import { format, subMonths } from "date-fns";
import { getCurrentMonthName, getLastMonthName } from "@/lib/utils";
import { SpotlightChart } from "./spotlight-chart";
import { fetchTotalExpensesForCurrentMonth } from "@/lib/supabase/utils";

type Props = {};

type Data = {
  monthName: string;
  monthTotal: number;
};
export const ChartPanel = async (props: Props) => {
  const total: number = await fetchTotalExpensesForCurrentMonth();
  return (
    <Panel title={`Spotlight on ${getCurrentMonthName()}`}>
      <div className="px-4 py-6">
        <div className="mb-6">
          <p className="text-muted-foreground text-light text-sm">
            Spend so far this month
          </p>
          <p className="mt-2 text-foreground text-2xl font-medium text-blue-900">
            £{total}
          </p>
        </div>

        <SpotlightChart />
      </div>
    </Panel>
  );
};
