import {
  fetchTotalExpensesForCurrentMonth,
  fetchTotalExpensesForLastMonth,
} from "@/lib/supabase/utils";
import { cn, getCurrentMonthName, getLastMonthName } from "@/lib/utils";
import React from "react";

type Props = {};

export const SpotlightChart = async (props: Props) => {
  const currentMonthTotal: number = await fetchTotalExpensesForCurrentMonth();
  const lastMonthTotal: number = await fetchTotalExpensesForLastMonth();

  // Calculate the width percentages
  const maxExpense = Math.max(currentMonthTotal, lastMonthTotal);
  // Check if maxExpense is zero to avoid division by zero
  const currentMonthWidth =
    maxExpense > 0 ? (currentMonthTotal / maxExpense) * 100 : 5;
  const lastMonthWidth =
    maxExpense > 0 ? (lastMonthTotal / maxExpense) * 100 : 5;

  const currentMonthWidthClass = `w-[${currentMonthWidth}%]`;
  const lastMonthWidthClass = `w-[${lastMonthWidth}%]`;

  console.log({ currentMonthTotal, lastMonthTotal });

  return (
    <div>
      <div>
        <p className="text-xs font-medium">{getCurrentMonthName()}</p>
        <div className="mt-2 w-full h-4 flex items-center">
          <div
            className={cn(
              `w-[5%] bg-yellow-500/80 h-4 rounded-full`,
              currentMonthWidthClass
            )}
          ></div>{" "}
          <span className="ml-2 text-xs text-muted-foreground">
            £{currentMonthTotal}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium">{getLastMonthName()}</p>
        <div className="mt-2 w-full h-4 flex items-center">
          <div
            className={cn(
              `w-[5%] bg-yellow-500/80 h-4 rounded-full`,
              lastMonthWidthClass
            )}
          ></div>{" "}
          <span className="ml-2 text-xs text-muted-foreground">
            £{lastMonthTotal}
          </span>
        </div>
      </div>
    </div>
  );
};
