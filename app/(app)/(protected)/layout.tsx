import Navbar from "@/components/navbar";
import { BottomBar } from "@/components/bottom-bar";
import { checkAuthAndRedirect } from "@/lib/supabase/utils";

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await checkAuthAndRedirect();
  return (
    <div className="bg-foreground h-screen max-h-screen">
      <div className="bg-neutral-100 flex flex-col max-w-lg mx-auto h-full">
        <Navbar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
