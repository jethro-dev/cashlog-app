import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { Tables } from "@/types/supabase";
import {
  checkAuthAndRedirect,
  fetchExpenses,
  fetchTotalExpensesForCurrentMonth,
} from "@/lib/supabase/utils";

import { ActivityPanel } from "@/components/activity-panel";
import { MonthlyTotalPanel } from "@/components/monthly-total-panel";

type Expense = Tables<"expenses"> & {
  expense_types: Tables<"expense_types">; // Assuming this is the structure returned by Supabase
};

interface GroupedExpenses {
  [key: string]: Expense[]; // This means the object can have any number of properties with string keys, each being an array of Expense.
}

export default async function DashboardPage() {
  const userId = await checkAuthAndRedirect();

  return (
    <main className="w-full p-6 space-y-4">
      <MonthlyTotalPanel />

      <ActivityPanel />
    </main>
  );
}
