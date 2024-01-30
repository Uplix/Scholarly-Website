"use client";
import { Footer } from "@/components/footer";
import { HomeNavigation } from "@/components/homeNavigation";
import { useEffect, useState } from "react";

export default function GoLayout({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<number>(
    window != undefined ? window.innerWidth : 0,
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindows(window != undefined ? window.innerWidth : 0);
      // console.log(windows)
    });
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <HomeNavigation width={windows} />
      {children}
      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}
