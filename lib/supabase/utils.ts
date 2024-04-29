import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function checkAuthAndRedirect(): Promise<string> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const userId = user.id;

  return userId;
}

export async function getUserProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  return data;
}

export async function getBudget() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("budget")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  return data?.budget;
}

export async function updateBudget(newBudget: number) {
  if (typeof newBudget !== "number" || newBudget < 0) {
    console.error("Invalid budget: Budget must be a non-negative number.");
    return;
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("Login to update budget");
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ budget: newBudget })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating budget:", error);
    return;
  }

  console.log("Budget updated successfully:", data);
  return data;
}

export async function fetchExpenses() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User must be logged in to fetchExpenses.");
    return [];
  }

  const userId = user.id; // Obtain the user ID from the current session

  try {
    const { data: expenses, error } = await supabase
      .from("expenses")
      .select(
        `
        *,
        expense_types (
            type_name,
            emoji
        )
      `
      )
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    if (expenses) {
      //   console.log("Fetched Expenses:", expenses);
      return expenses;
    }

    return []; // Return an empty array if no expenses are found or in case of errors
  } catch (error) {
    // console.error("Error fetching expenses:", error);
    return [];
  }
}

export async function fetchTotalExpensesForLastMonth(): Promise<number> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error(
      "User must be logged in to fetchTotalExpensesForCurrentMonth."
    );
    return 0;
  }

  const userId = user.id; // Obtain the user ID from the current session

  try {
    const { data, error } = await supabase.rpc("get_previous_month_expenses", {
      p_user_id: userId,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(
      "Error fetching total expenses for the current month:",
      error
    );
    return 0; // Returning 0 in case of an error
  }
}
export async function fetchTotalExpensesForCurrentMonth(): Promise<number> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error(
      "User must be logged in to fetchTotalExpensesForCurrentMonth."
    );
    return 0;
  }

  const userId = user.id; // Obtain the user ID from the current session

  try {
    const { data, error } = await supabase.rpc("get_current_month_expenses", {
      p_user_id: userId,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(
      "Error fetching total expenses for the current month:",
      error
    );
    return 0; // Returning 0 in case of an error
  }
}

export async function fetchAllExpenseType() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User must be logged in to fetchAllExpenseType");
    return 0;
  }

  const userId = user.id; // Obtain the user ID from the current session

  try {
    const { data, error } = await supabase.rpc("get_user_expense_types", {
      p_user_id: userId,
    });

    if (error) {
      throw error;
    }

    console.log({ data });

    return data;
  } catch (error) {
    console.error("Error fetching all expense type:", error);
    return 0; // Returning 0 in case of an error
  }
}
