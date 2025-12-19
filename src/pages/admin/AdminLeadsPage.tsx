"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  LayoutDashboard,
  LineChart,
  Users,
  LogOut,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  whatsapp: string;
  business_type?: string | null;
  budget_range?: string | null;
  start_timeline?: string | null;
  motivation?: string | null;
  source?: string | null;
  created_at: string;
};

function getToken() {
  return localStorage.getItem("ADMIN_TOKEN") || "";
}

function trunc(s: string | null | undefined, n = 60) {
  const v = (s || "").trim();
  if (!v) return "-";
  if (v.length <= n) return v;
  return v.slice(0, n) + "...";
}

function fmt(n: number) {
  return new Intl.NumberFormat().format(n || 0);
}

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
        <aside className="hidden md:flex w-[280px] bg-gradient-to-b from-[#0B1220] to-[#0A0F1A] text-white">
          <div className="w-full p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 grid place-items-center">
                <div className="h-3 w-3 rounded bg-emerald-400" />
              </div>
              <div>
                <div className="font-semibold leading-tight">Storekriti</div>
                <div className="text-xs text-white/60">Admin Panel</div>
              </div>
            </div>

            <div className="mt-10 space-y-2">
              <div className="text-xs text-white/50 mb-2">GENERAL</div>

              <button
                className={[
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition",
                  active === "analytics"
                    ? "bg-white/10 ring-1 ring-white/10"
                    : "hover:bg-white/5",
                ].join(" ")}
                onClick={() => onNav("/admin/analytics")}
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </button>

              <div className="mt-10 text-xs text-white/50 mb-2">ACCOUNT</div>

              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-white/5 transition"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>

              {onRefresh && (
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-white/5 transition disabled:opacity-60"
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

              <div className="flex items-center gap-2">
                {rightSlot}
                <div className="md:hidden">
                  <Button
                    variant="outline"
                    onClick={onLogout}
                    className="bg-white"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLeadsPage() {
  const nav = useNavigate();
  const [token] = useState(getToken());

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const limit = 20;

  async function load() {
    if (!token) return nav("/admin/login");
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/leads?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Unauthorized");

      setRows(data.rows || []);
      setPages(data.pages || 1);
      setTotal(data.total || 0);
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
  }, [page]);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line
  }, [q]);

  const showing = useMemo(() => {
    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);
    return { from, to };
  }, [page, total]);

  return (
    <AdminShell
      active="leads"
      title="Welcome Back!"
      subtitle="Here’s what’s happening with your leads today"
      onNav={(p) => nav(p)}
      onLogout={() => {
        localStorage.removeItem("ADMIN_TOKEN");
        nav("/admin/login");
      }}
      onRefresh={load}
      loading={loading}
      rightSlot={
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search leads..."
              className="pl-9 w-[320px] bg-white"
            />
          </div>
          <Button
            onClick={() => {
              setPage(1);
              load();
            }}
            disabled={loading}
          >
            Search
          </Button>
        </div>
      }
    >
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card className="rounded-2xl bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="text-xs text-slate-500">Total Leads</div>
            <div className="mt-1 text-2xl font-semibold">{fmt(total)}</div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <Users className="h-4 w-4" />
              Page {page} / {pages}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="text-xs text-slate-500">Showing</div>
            <div className="mt-1 text-2xl font-semibold">
              {showing.from}-{showing.to}
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Per page: {limit}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="text-xs text-slate-500">Search</div>
            <div className="mt-1 text-2xl font-semibold">
              {q.trim() ? "Active" : "None"}
            </div>
            <div className="mt-3 text-xs text-slate-500">
              {q.trim() ? trunc(q, 26) : "Type in top search"}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="text-xs text-slate-500">Status</div>
            <div className="mt-1 text-2xl font-semibold">
              {loading ? "Loading..." : "Ready"}
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Use Refresh anytime
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile search */}
      <div className="md:hidden mb-4 flex gap-2">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search leads..."
          className="bg-white"
        />
        <Button
          onClick={() => {
            setPage(1);
            load();
          }}
          disabled={loading}
        >
          Go
        </Button>
      </div>

      {/* Table */}
      <Card className="rounded-2xl bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="w-full overflow-auto">
            <table className="min-w-[1100px] w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">WhatsApp</th>
                  <th className="text-left p-4 font-medium">Business</th>
                  <th className="text-left p-4 font-medium">Budget</th>
                  <th className="text-left p-4 font-medium">Timeline</th>
                  <th className="text-left p-4 font-medium">Motivation</th>
                  <th className="text-left p-4 font-medium">Source</th>
                  <th className="text-left p-4 font-medium">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {rows.map((r) => (
                  <tr key={r.id} className="align-top">
                    <td className="p-4 font-medium text-slate-900">{r.name}</td>
                    <td className="p-4 text-slate-700">{r.whatsapp}</td>
                    <td className="p-4 text-slate-700">{r.business_type || "-"}</td>
                    <td className="p-4 text-slate-700">{r.budget_range || "-"}</td>
                    <td className="p-4 text-slate-700">{r.start_timeline || "-"}</td>
                    <td className="p-4 text-slate-700">{trunc(r.motivation, 70)}</td>
                    <td className="p-4 text-slate-700">{r.source || "-"}</td>
                    <td className="p-4 text-slate-700">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}

                {!rows.length && (
                  <tr>
                    <td className="p-8 text-slate-500" colSpan={8}>
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4">
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>

            <div className="text-sm text-slate-500">
              Page <span className="text-slate-800 font-medium">{page}</span> of{" "}
              <span className="text-slate-800 font-medium">{pages}</span>
            </div>

            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages || loading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
