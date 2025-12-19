// Storekriti lightweight analytics (privacy-friendly)
// - Anonymous visitor_id via localStorage
// - session_id rotates after 30m inactivity
// - Sends pageviews + events to /api/track (Vercel serverless)

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function getVisitorId(): string {
  const key = "SK_VISITOR_ID";
  let id = localStorage.getItem(key);
  if (!id) {
    id = uid("v");
    localStorage.setItem(key, id);
  }
  return id;
}

export function getSessionId(): string {
  const key = "SK_SESSION_ID";
  const tsKey = "SK_SESSION_TS";
  const now = Date.now();
  const last = Number(localStorage.getItem(tsKey) || "0");
  let sid = localStorage.getItem(key);

  // new session if 30 minutes of inactivity
  if (!sid || now - last > 30 * 60 * 1000) {
    sid = uid("s");
    localStorage.setItem(key, sid);
  }
  localStorage.setItem(tsKey, String(now));
  return sid;
}

async function post(payload: any) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // analytics should never break UX
  }
}

export function trackSessionStart(extra?: Record<string, any>) {
  const visitor_id = getVisitorId();
  const session_id = getSessionId();
  return post({
    type: "session_start",
    visitor_id,
    session_id,
    landing_path: window.location.pathname,
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer || null,
    ...extra,
  });
}

export function trackPageview() {
  const visitor_id = getVisitorId();
  const session_id = getSessionId();
  return post({
    type: "pageview",
    visitor_id,
    session_id,
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer || null,
  });
}

export function trackPageviewEnd(duration_ms: number, scroll_max: number) {
  const visitor_id = getVisitorId();
  const session_id = getSessionId();
  return post({
    type: "pageview_end",
    visitor_id,
    session_id,
    path: window.location.pathname,
    duration_ms,
    scroll_max,
  });
}

export function trackEvent(name: string, props?: Record<string, any>) {
  const visitor_id = getVisitorId();
  const session_id = getSessionId();
  return post({
    type: "event",
    visitor_id,
    session_id,
    name,
    path: window.location.pathname,
    props: props || null,
  });
}
