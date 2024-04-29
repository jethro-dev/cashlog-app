import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <form action={signOut}>
      <Button size={"icon"} variant={"ghost"}>
        <LogOut className="h-4 w-4" />
      </Button>
    </form>
  ) : (
    <Button size={"icon"} variant={"ghost"} asChild>
      <Link
        href="/login"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        <LogIn className="h-4 w-4" />
      </Link>
    </Button>
  );
}
