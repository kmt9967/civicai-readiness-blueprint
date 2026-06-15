"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, BarChart3 } from "lucide-react";
import type { ReadinessResult } from "@/lib/readiness";

interface ReadinessChartsProps {
  result: ReadinessResult | null;
}

export function ReadinessCharts({ result }: ReadinessChartsProps) {
  if (result === null) {
    return (
      <section className="grid gap-6 lg:grid-cols-2">
        <EmptyChartCard title="Sector readiness" />
        <EmptyChartCard title="Infrastructure, literacy, governance, capacity" />
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-50 text-teal-800">
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800">
              Charts
            </p>
            <h3 className="text-xl font-semibold text-slate-950">
              Sector readiness
            </h3>
          </div>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart
              data={result.sectorScores}
              margin={{ top: 12, right: 10, left: -18, bottom: 8 }}
            >
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis
                axisLine={{ stroke: "#cbd5e1" }}
                dataKey="label"
                tick={{ fill: "#475569", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                domain={[0, 100]}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                formatter={(value) => [`${value}/100`, "Readiness"]}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {result.sectorScores.map((entry) => (
                  <Cell fill={entry.color} key={entry.key} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-800">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-800">
              Readiness dimensions
            </p>
            <h3 className="text-xl font-semibold text-slate-950">
              Core capacity comparison
            </h3>
          </div>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer height="100%" width="100%">
            <RadarChart data={result.dimensionScores} outerRadius="74%">
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis
                dataKey="label"
                tick={{ fill: "#475569", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                axisLine={false}
                domain={[0, 100]}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <Radar
                dataKey="score"
                fill="#14b8a6"
                fillOpacity={0.28}
                stroke="#2563eb"
                strokeWidth={2}
              />
              <Tooltip formatter={(value) => [`${value}/100`, "Score"]} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function EmptyChartCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
      <div className="mb-4 h-6 w-48 rounded-lg bg-slate-100" />
      <div className="flex h-[320px] items-center justify-center rounded-lg bg-slate-50">
        <p className="max-w-xs text-center text-sm leading-6 text-slate-500">
          {title} will render after the blueprint is generated.
        </p>
      </div>
    </div>
  );
}
