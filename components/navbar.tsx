import React from "react";
import AuthButton from "./AuthButton";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/supabase";
import { getUserProfile, updateBudget } from "@/lib/supabase/utils";

type Props = {};

const Navbar = async (props: Props) => {
  const { first_name }: Tables<"profiles"> = await getUserProfile();

  function getGreetings() {
    const currentHour = new Date().getHours(); // This gets the current hour in local time
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  return (
    <nav className="bg-background w-full flex justify-center border-b border-b-foreground/10 h-16 px-6">
      <div className="relative w-full max-w-4xl text-sm flex items-center justify-center">
        <h1 className="font-normal text-sm text-muted-foreground text-center">
          {`${getGreetings()}, ${first_name}`}
        </h1>

        <div className="absolute right-0">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
