"use client";
import { signInWithGoogle } from "@/actions/auth/sign-in-with-google";
import React from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

type Props = {};

export const GoogleSignInbutton = (props: Props) => {
  const handleLoginWithOAuth = async (provider: "google" | "google") => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: location.origin + "/auth/callback" },
    });
    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
  };

  return (
    <Button type="button" onClick={() => handleLoginWithOAuth("google")}>
      Google login
    </Button>
  );
};
