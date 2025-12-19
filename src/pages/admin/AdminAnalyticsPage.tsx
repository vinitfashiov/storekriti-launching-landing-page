"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import {
  LayoutDashboard,
  LineChart as LineChartIcon,
  LogOut,
  RefreshCw,
  Search,
  ChevronDown,
  CalendarDays,
  Download,
  Users,
  Activity,
  MousePointerClick,
  Timer,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ---------------- types ---------------- */

type TopItem = { key: string; count: number };

type AnalyticsSeriesPoint = {
  date: string; // "YYYY-MM-DD"
  pageviews: number;
  visitors: number;
  conversions: number;
};

type AnalyticsResponse = {
  ok: boolean;
  window: { from: string; to: string; days: number };
  summary: {
    pageviews: number;
    unique_visitors: number;
    returning_visitors: number;
    avg_time_seconds: number;
    avg_scroll_percent: number;
    events: number;
    conversions: number;
    conversion_rate: number; // 0..1
  };
  top_pages: TopItem[];
  top_events: TopItem[];
  series?: AnalyticsSeriesPoint[];
};

/* ---------------- helpers ---------------- */

function getToken() {
  return localStorage.getItem("ADMIN_TOKEN") || "";
}

function fmt(n: number) {
  return new Intl.NumberFormat().format(n || 0);
}

function pct01(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return `${(v * 100).toFixed(2)}%`;
}

function secondsToHuman(sec: number) {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m <= 0) return `${r}s`;
  return `${m}m ${r}s`;
}

function toCSV(rows: any[]) {
  if (!rows?.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => escape(r[h])).join(","));
  }
  return lines.join("\n");
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** If backend doesn't give series yet, create a stable fallback so charts still render. */
function buildFallbackSeries(days: number, summary: AnalyticsResponse["summary"]): AnalyticsSeriesPoint[] {
  const d = Math.max(1, Math.min(90, days));
  const out: AnalyticsSeriesPoint[] = [];

  const totalPV = summary?.pageviews || 0;
  const totalV = summary?.unique_visitors || 0;
  const totalC = summary?.conversions || 0;

  for (let i = d - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const t = (d - i) / d;
    const w = 0.85 + 0.3 * Math.sin(t * Math.PI * 2); // gentle wave

    out.push({
      date: date.toISOString().slice(0, 10),
      pageviews: Math.round((totalPV / d) * w),
      visitors: Math.round((totalV / d) * w),
      conversions: Math.round((totalC / d) * w),
    });
  }
  return out;
}

/* ---------------- GA-like small components ---------------- */

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-full text-xs font-medium transition",
        active
          ? "bg-slate-900 text-white"
          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
      ].join(" ")}
      type="button"
    >
      {children}
    </button>
  );
}

function MetricCard({
  label,
  value,
  sub,
  icon,
  sparkData,
  sparkKey,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  sparkData: AnalyticsSeriesPoint[];
  sparkKey: keyof AnalyticsSeriesPoint;
}) {
  // tiny sparkline using recharts LineChart without axes
  return (
    <Card className="rounded-2xl bg-white shadow-sm border border-slate-200/70">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {value}
            </div>
            {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
          </div>

          <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center text-slate-700">
            {icon}
          </div>
        </div>

        <div className="mt-4 h-[44px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey={sparkKey as string}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- layout shell ---------------- */

function AdminShell({
  active,
  onNav,
  onLogout,
  onRefresh,
  loading,
  title,
  subtitle,
  rightSlot,
  children,
}: {
  active: "leads" | "analytics";
  onNav: (path: string) => void;
  onLogout: () => void;
  onRefresh?: () => void;
  loading?: boolean;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[284px] bg-gradient-to-b from-[#0B1220] to-[#0A0F1A] text-white">
          <div className="w-full p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 border border-white/10 grid place-items-center">
                <div className="h-3 w-3 rounded bg-emerald-400" />
              </div>
              <div>
                <div className="font-semibold leading-tight">Storekriti</div>
                <div className="text-xs text-white/60">Admin Analytics</div>
              </div>
            </div>

            <div className="mt-10 space-y-2">
              <div className="text-[11px] tracking-wide text-white/45 mb-2">
                OVERVIEW
              </div>

              <button
                className={[
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition",
                  active === "leads"
                    ? "bg-white/10 ring-1 ring-white/10"
                    : "hover:bg-white/5",
                ].join(" ")}
                onClick={() => onNav("/admin")}
              >
                <LayoutDashboard className="h-4 w-4" />
                Leads
              </button>

              <button
                className={[
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition",
                  active === "analytics"
                    ? "bg-white/10 ring-1 ring-white/10"
                    : "hover:bg-white/5",
                ].join(" ")}
                onClick={() => onNav("/admin/analytics")}
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </button>

              <div className="mt-10 text-[11px] tracking-wide text-white/45 mb-2">
                ACCOUNT
              </div>

              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm hover:bg-white/5 transition"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>

              {onRefresh && (
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm hover:bg-white/5 transition disabled:opacity-60"
                  onClick={onRefresh}
                  disabled={!!loading}
                >
                  <RefreshCw className="h-4 w-4" />
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1">
          {/* Topbar */}
          <div className="px-4 md:px-8 pt-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xl font-semibold text-slate-900">{title}</div>
                {subtitle && (
                  <div className="text-sm text-slate-500 mt-1">{subtitle}</div>
                )}
              </div>
              <div className="flex items-center gap-2">{rightSlot}</div>
            </div>
          </div>

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */

export default function AdminAnalyticsPage() {
  const nav = useNavigate();
  const [token] = useState(getToken());

  // GA-style controls
  const [days, setDays] = useState("28");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsResponse | null>(null);

  const [metric, setMetric] = useState<"visitors" | "pageviews" | "conversions">(
    "visitors"
  );

  const daysInt = useMemo(() => {
    const d = parseInt(days || "28", 10);
    return Math.min(90, Math.max(1, Number.isFinite(d) ? d : 28));
  }, [days]);

  async function load() {
    if (!token) return nav("/admin/login");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?days=${daysInt}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Unauthorized");
      setData(json);
    } catch (e: any) {
      localStorage.removeItem("ADMIN_TOKEN");
      alert(e?.message || "Session expired");
      nav("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const series: AnalyticsSeriesPoint[] = useMemo(() => {
    if (!data?.summary) return [];
    if (data?.series?.length) return data.series;
    return buildFallbackSeries(daysInt, data.summary);
  }, [data, daysInt]);

  const windowLabel = useMemo(() => {
    if (!data?.window) return `${daysInt} days`;
    const from = new Date(data.window.from).toLocaleDateString();
    const to = new Date(data.window.to).toLocaleDateString();
    return `${from} – ${to}`;
  }, [data, daysInt]);

  return (
    <AdminShell
      active="analytics"
      title="Reports snapshot"
      subtitle="A clean GA4-style view for your website leads funnel"
      onNav={(p) => nav(p)}
      onLogout={() => {
        localStorage.removeItem("ADMIN_TOKEN");
        nav("/admin/login");
      }}
      onRefresh={load}
      loading={loading}
      rightSlot={
        <div className="flex items-center gap-2">
          {/* Search-like range pill (GA vibe) */}
          <div className="hidden md:flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
            <CalendarDays className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-700">{windowLabel}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>

          {/* Days input (simple + fast) */}
          <div className="hidden md:flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 text-slate-500" />
            <Input
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 w-[70px]"
              inputMode="numeric"
              placeholder="Days"
            />
            <span className="text-xs text-slate-500">days</span>
          </div>

          <Button onClick={load} disabled={loading} className="rounded-2xl">
            {loading ? "Loading..." : "Apply"}
          </Button>

          <Button
            variant="outline"
            className="bg-white rounded-2xl"
            onClick={() => {
              const csv = toCSV(series);
              if (!csv) return;
              downloadText(`analytics_series_${daysInt}d.csv`, csv);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      }
    >
      {/* KPI cards (GA-style with sparklines) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Active users"
          value={fmt(data?.summary.unique_visitors || 0)}
          sub={`Returning: ${fmt(data?.summary.returning_visitors || 0)}`}
          icon={<Users className="h-4 w-4" />}
          sparkData={series}
          sparkKey="visitors"
        />
        <MetricCard
          label="Views"
          value={fmt(data?.summary.pageviews || 0)}
          sub={`Events: ${fmt(data?.summary.events || 0)}`}
          icon={<Activity className="h-4 w-4" />}
          sparkData={series}
          sparkKey="pageviews"
        />
        <MetricCard
          label="Conversions"
          value={fmt(data?.summary.conversions || 0)}
          sub={`CVR: ${pct01(data?.summary.conversion_rate || 0)}`}
          icon={<MousePointerClick className="h-4 w-4" />}
          sparkData={series}
          sparkKey="conversions"
        />
        <MetricCard
          label="Avg engagement"
          value={secondsToHuman(data?.summary.avg_time_seconds || 0)}
          sub={`Avg scroll: ${fmt(data?.summary.avg_scroll_percent || 0)}%`}
          icon={<Timer className="h-4 w-4" />}
          sparkData={series}
          sparkKey="visitors"
        />
      </div>

      {/* Main chart (GA-style: selectable metric chips) */}
      <Card className="rounded-2xl bg-white shadow-sm border border-slate-200/70 mb-6">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Trend over time
              </div>
              <div className="text-xs text-slate-500">
                Switch metric like GA4 cards
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Chip active={metric === "visitors"} onClick={() => setMetric("visitors")}>
                Users
              </Chip>
              <Chip active={metric === "pageviews"} onClick={() => setMetric("pageviews")}>
                Views
              </Chip>
              <Chip
                active={metric === "conversions"}
                onClick={() => setMetric("conversions")}
              >
                Conversions
              </Chip>

              <Button
                variant="outline"
                className="bg-white rounded-2xl"
                onClick={() => nav("/admin")}
              >
                Leads
              </Button>
            </div>
          </div>

          <div className="h-[340px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Line type="monotone" dataKey={metric} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* GA-like breakdown tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="rounded-2xl bg-white shadow-sm border border-slate-200/70">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">Top pages</div>
                <div className="text-xs text-slate-500">Most viewed routes</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 text-[11px] tracking-wide text-slate-600 flex justify-between">
                <span>PAGE</span>
                <span>VIEWS</span>
              </div>

              <div className="divide-y">
                {(data?.top_pages || []).slice(0, 10).map((it) => (
                  <div key={it.key} className="px-4 py-3 flex justify-between items-center">
                    <div className="text-sm text-slate-900 truncate max-w-[70%]">
                      {it.key}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">{fmt(it.count)}</div>
                  </div>
                ))}
                {(!data?.top_pages || data.top_pages.length === 0) && (
                  <div className="px-4 py-6 text-sm text-slate-500">No pageviews yet.</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white shadow-sm border border-slate-200/70">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">Top events</div>
                <div className="text-xs text-slate-500">Most triggered events</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 text-[11px] tracking-wide text-slate-600 flex justify-between">
                <span>EVENT</span>
                <span>COUNT</span>
              </div>

              <div className="divide-y">
                {(data?.top_events || []).slice(0, 10).map((it) => (
                  <div key={it.key} className="px-4 py-3 flex justify-between items-center">
                    <div className="text-sm text-slate-900 truncate max-w-[70%]">
                      {it.key}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">{fmt(it.count)}</div>
                  </div>
                ))}
                {(!data?.top_events || data.top_events.length === 0) && (
                  <div className="px-4 py-6 text-sm text-slate-500">No events yet.</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* mobile controls */}
      <div className="md:hidden mt-6 flex gap-2">
        <Input value={days} onChange={(e) => setDays(e.target.value)} placeholder="Days (1-90)" />
        <Button onClick={load} disabled={loading}>
          Apply
        </Button>
      </div>
    </AdminShell>
  );
}
