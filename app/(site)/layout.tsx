import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/providers/MotionProvider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
