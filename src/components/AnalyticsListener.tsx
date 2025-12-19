import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, trackPageview, trackPageviewEnd, trackSessionStart } from "@/lib/analytics";

/**
 * Tracks:
 * - session_start (once)
 * - pageview on every route change
 * - pageview_end with duration + max scroll on route change / tab hidden / unload
 */
export default function AnalyticsListener() {
  const location = useLocation();
  const startedRef = useRef(false);
  const pageStartRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);

  // start session once
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    trackSessionStart();
    trackEvent("session_active");

    const onScroll = () => {
      const doc = document.documentElement;
      const denom = doc.scrollHeight - doc.clientHeight;
      if (denom <= 0) return;
      const scrolled = Math.round((doc.scrollTop / denom) * 100);
      if (!Number.isNaN(scrolled)) {
        maxScrollRef.current = Math.max(
          maxScrollRef.current,
          Math.min(100, Math.max(0, scrolled))
        );
      }
    };

    const flush = () => {
      const duration = Date.now() - pageStartRef.current;
      trackPageviewEnd(duration, maxScrollRef.current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", flush);
    };
  }, []);

  // pageview on route change
  useEffect(() => {
    // flush previous page stats first
    const duration = Date.now() - pageStartRef.current;
    if (duration > 250) {
      trackPageviewEnd(duration, maxScrollRef.current);
    }

    // reset
    pageStartRef.current = Date.now();
    maxScrollRef.current = 0;

    // new pageview
    trackPageview();
  }, [location.pathname]);

  return null;
}
