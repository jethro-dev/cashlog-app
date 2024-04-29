import {
  fetchTotalExpensesForCurrentMonth,
  getBudget,
} from "@/lib/supabase/utils";

type Props = {};

export const MonthlyTotalPanel = async (props: Props) => {
  const total: number = await fetchTotalExpensesForCurrentMonth();
  const budget = await getBudget();

  return (
    <div className="bg-background border border-border gap-2 px-4 py-10 rounded-lg shadow-sm space-y-6">
      <div>
        <p className="text-2xl font-medium text-blue-900">£{total}</p>
        <p className="mt-2 font-light text-sm text-muted-foreground">
          spent this month
        </p>
      </div>

      <div>
        <p className="text-2xl font-medium text-blue-900">
          £{budget - total < 0 ? 0 : budget - total}
        </p>

        <p className="mt-2 font-light text-sm text-muted-foreground">
          available to spend
        </p>

        <p className="font-light text-sm text-muted-foreground">
          Monthly budget: £{budget}
        </p>
      </div>
    </div>
  );
};
