"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  console.log("RUN signInWithGoogle");
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: location.origin + "/auth/callback" },
  });

  console.log("signInWithGoogle: ", data);
  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }
  //   return redirect("/summary");
};
