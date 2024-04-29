import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  checkAuthAndRedirect,
  fetchExpenses,
  fetchTotalExpensesForCurrentMonth,
} from "@/lib/supabase/utils";
import { Tables } from "@/types/supabase";
import Panel from "./panel";

type Props = {};

type Expense = Tables<"expenses"> & {
  expense_types: Tables<"expense_types">; // Assuming this is the structure returned by Supabase
};

interface GroupedExpenses {
  [key: string]: Expense[]; // This means the object can have any number of properties with string keys, each being an array of Expense.
}

export const ActivityPanel = async (props: Props) => {
  const expenses: Expense[] = await fetchExpenses();

  const groupByDate = (expenses: Expense[]): GroupedExpenses => {
    return expenses.reduce<GroupedExpenses>((acc, expense) => {
      const date = expense.created_at.split("T")[0]; // Assume created_at is a string and exists.
      if (!acc[date]) {
        acc[date] = []; // Initialize if not already present.
      }
      acc[date].push(expense); // Push the expense into the correct date.
      return acc;
    }, {} as GroupedExpenses); // Initialize with an empty GroupedExpenses object.
  };

  const res = groupByDate(expenses);

  return (
    <Panel title={"All activity"}>
      {expenses.length < 1 ? (
        <div className="p-4">
          <p className="text-muted-foreground text-sm font-light">
            You have no expenses. Add expenses now!
          </p>
        </div>
      ) : (
        <div>
          {Object.entries(res).map(([date, expenses]) => (
            <div key={date} className="">
              {/* <h2 className="p-2 bg-neutral-100">
              {format(date, "dd MMMM yyyy")}
            </h2> */}
              <ul className="divide-y">
                {expenses.map((expense) => (
                  <li
                    key={expense.id}
                    className="px-4 py-3 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <p className="text-xl p-2 bg-neutral-100 rounded-md">
                        {expense.expense_types.emoji}
                      </p>
                      <div>
                        <p className="text-sm font-medium">{expense.title}</p>

                        <span className="text-xs font-normal text-muted-foreground">
                          {format(new Date(expense.created_at), "hh:mm a")}
                          {" · "}
                          {format(new Date(expense.created_at), "MMMM")}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium">£{expense.amount}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
};
