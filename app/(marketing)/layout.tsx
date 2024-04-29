import LandingNavbar from "@/components/landing-navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground">
      <LandingNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
