"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type Lead = {
  id: string;
  name: string;
  whatsapp: string;
  email?: string | null;
  business?: string | null;
  message?: string | null;
  source?: string | null;
  created_at: string;
};

function getToken() {
  return localStorage.getItem("ADMIN_TOKEN") || "";
}

export default function AdminLeadsPage() {
  const nav = useNavigate();
  const [token, setToken] = useState(getToken());
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
      const res = await fetch(`/api/admin/leads?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Unauthorized");
      setRows(data.rows || []);
      setPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch (e: any) {
      localStorage.removeItem("ADMIN_TOKEN");
      alert(e.message || "Session expired");
      nav("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page]);
  useEffect(() => { setPage(1); /* eslint-disable-next-line */ }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 border-r bg-white/60 backdrop-blur">
          <div className="w-full p-5">
            <div className="text-lg font-semibold">Storekriti Admin</div>
            <div className="text-sm text-muted-foreground mt-1">Leads dashboard</div>

            <div className="mt-6 space-y-2">
              <div className="rounded-lg px-3 py-2 bg-accent font-medium">Leads</div>
            </div>

            <div className="mt-8 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => { localStorage.removeItem("ADMIN_TOKEN"); nav("/admin/login"); }}>
                Logout
              </Button>
              <Button className="w-full" onClick={load} disabled={loading}>
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:p-8">
          {/* Mobile top card */}
          <div className="md:hidden mb-4">
            <Card>
              <CardContent className="p-4 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => { localStorage.removeItem("ADMIN_TOKEN"); nav("/admin/login"); }}>
                  Logout
                </Button>
                <Button className="flex-1" onClick={load} disabled={loading}>
                  {loading ? "..." : "Refresh"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Leads</CardTitle>
              <div className="text-sm text-muted-foreground">Total: {total} • Page: {page}/{pages}</div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name / whatsapp / email / business..."
                  className="bg-white"
                />
                <Button onClick={() => { setPage(1); load(); }} disabled={loading}>
                  Search
                </Button>
              </div>

              <div className="w-full overflow-auto rounded-xl border bg-white">
                <table className="min-w-[900px] w-full text-sm">
                  <thead className="bg-accent/60">
                    <tr>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">WhatsApp</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Business</th>
                      <th className="text-left p-3">Source</th>
                      <th className="text-left p-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="border-t">
                        <td className="p-3 font-medium">{r.name}</td>
                        <td className="p-3">{r.whatsapp}</td>
                        <td className="p-3">{r.email || "-"}</td>
                        <td className="p-3">{r.business || "-"}</td>
                        <td className="p-3">{r.source || "-"}</td>
                        <td className="p-3">{new Date(r.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                    {!rows.length && (
                      <tr>
                        <td className="p-6 text-muted-foreground" colSpan={6}>
                          No leads found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || loading}>
                  Prev
                </Button>
                <Button variant="outline" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page >= pages || loading}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
