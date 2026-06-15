import { CalendarClock, CheckCircle2, Route, Target } from "lucide-react";
import type { RoadmapPhase } from "@/lib/readiness";

interface StrategicRoadmapProps {
  roadmap: RoadmapPhase[];
  hasGenerated: boolean;
}

export function StrategicRoadmap({
  roadmap,
  hasGenerated,
}: StrategicRoadmapProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800">
            Strategic roadmap
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">
            3-phase responsible adoption plan
          </h2>
        </div>
        <Route className="hidden h-10 w-10 text-teal-700 sm:block" />
      </div>

      {!hasGenerated ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          Generate a blueprint to create the 0-3, 3-12, and 12-24 month
          roadmap.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {roadmap.map((phase) => (
            <article
              className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              key={phase.window}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {phase.phase}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                    {phase.window}
                  </h3>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-white text-teal-800 shadow-sm">
                  <CalendarClock className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <div className="mb-4 flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                <Target className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Focus
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                    {phase.focus}
                  </p>
                </div>
              </div>

              <ul className="grid gap-3">
                {phase.actions.map((action) => (
                  <li className="flex gap-3 text-sm leading-6" key={action}>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                    <span className="text-slate-700">{action}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-lg bg-teal-50 p-4 text-sm leading-6 text-teal-950">
                {phase.outcome}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
