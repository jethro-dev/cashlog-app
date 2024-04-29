import { type ClassValue, clsx } from "clsx";
import { addMonths, format, subMonths } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentMonthName() {
  const now = new Date();
  const monthName = format(now, "MMMM"); // 'MMMM' results in the full month name, e.g., "April"
  return monthName;
}

export function getLastMonthName() {
  const now = new Date();
  const lastMonth = subMonths(now, 1);
  const lastMonthName = format(lastMonth, "MMMM"); // Full month name of the last month
  return lastMonthName;
}

export function getNextMonthName() {
  const now = new Date();
  const lastMonth = addMonths(now, 1);
  const lastMonthName = format(lastMonth, "MMMM"); // Full month name of the last month
  return lastMonthName;
}
