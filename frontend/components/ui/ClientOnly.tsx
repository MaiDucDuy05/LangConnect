"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SupportWidget } from "@/components/support-widget"
import { Toaster } from "@/components/ui/toaster";

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isDashBoard, setIsDashboard] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsDashboard(pathname.startsWith("/dashboard"));
  }, [pathname]);

  if (isDashBoard) return <>{children}</>; 

  return (
    <>
      <Header />
      <Toaster />
      {children} 
      <Footer />
      <SupportWidget />
    </>
  );
}
