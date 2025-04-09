"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
// import { ArrowRight } from "lucide-react";

// Initialize Cal.com
export function useInitCal() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", {
        "cssVarsPerTheme": {
          "light": { "cal-brand": "#B69259" },
          "dark": { "cal-brand": "#B69259" }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);
}

// Reusable button component
export function CalendarButton({ className }: { className?: string }) {
  const pathname = usePathname();
  const buttonText = pathname === '/listing-shorts' ? 'Create Free Tour' : 'Schedule Demo';

  return (
    <Button
      variant="golden"
      className={`relative flex items-center justify-center gap-2 rounded-full px-6 py-3 ${className}`}
      data-cal-namespace="30min"
      data-cal-link="demodrive/30min"
      data-cal-config='{"layout":"month_view"}'
    >
      {buttonText}
      {/* <ArrowRight className="h-4 w-4" /> */}
    </Button>
  );
}
