import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <Footer />
    </div>
  );
} 