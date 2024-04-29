"use server";

import { createClient } from "@/utils/supabase/server";

export async function createExpense(formData: FormData) {
  console.log("Running createExpense:");
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User must be logged in to create their expenses.");
    return [];
  }

  const userId = user.id; // Obtain the user ID from the current session

  const rawFormData = {
    title: formData.get("title"),
    amount: formData.get("amount"),
  };

  console.log({ rawFormData });

  try {
    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          title: rawFormData.title,
          amount: rawFormData.amount,
          user_id: userId,
          type_id: 5,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    if (data) {
      console.log("Created expenses successfully:", data);
      return data;
    }
  } catch (error) {
    console.error("Error creating expenses:", error);
    return [];
  }
}
