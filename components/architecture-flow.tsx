import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BrainCircuit,
  Database,
  FileInput,
  MessageSquare,
  RefreshCw,
  UserCheck,
} from "lucide-react";

const architectureSteps: Array<{
  title: string;
  icon: LucideIcon;
  detail: string;
}> = [
  {
    title: "Data Input",
    icon: FileInput,
    detail: "Community profile and 1-5 readiness scores.",
  },
  {
    title: "Scoring Engine",
    icon: Database,
    detail: "Local weighted scoring and gap detection.",
  },
  {
    title: "AI/Recommendation Layer",
    icon: BrainCircuit,
    detail: "Mock guidance today, future reviewed AI assist.",
  },
  {
    title: "Dashboard Insights",
    icon: BarChart3,
    detail: "Charts, gaps, scenarios, and roadmap.",
  },
  {
    title: "Human Decision Support",
    icon: UserCheck,
    detail: "Leaders review, adapt, and approve actions.",
  },
  {
    title: "Feedback & Updates",
    icon: RefreshCw,
    detail: "Outcomes and review cycles improve the plan.",
  },
];

export function ArchitectureFlow() {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">
            Architecture
          </p>
          <h2 className="mt-1 break-words whitespace-normal text-3xl font-semibold">
            Decision-support flow
          </h2>
        </div>
        <div className="flex w-fit max-w-full flex-wrap items-center gap-2 whitespace-normal rounded-lg bg-white/10 px-3 py-2 text-sm text-slate-200">
          <MessageSquare className="h-4 w-4 text-teal-300" />
          Feedback loop ready
        </div>
      </div>

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {architectureSteps.map((step, index) => (
          <ArchitectureStep
            detail={step.detail}
            icon={step.icon}
            key={step.title}
            stepNumber={index + 1}
            title={step.title}
          />
        ))}
      </div>
    </section>
  );
}

function ArchitectureStep({
  title,
  detail,
  icon: Icon,
  stepNumber,
}: {
  title: string;
  detail: string;
  icon: LucideIcon;
  stepNumber: number;
}) {
  return (
    <article className="min-w-0 rounded-lg border border-white/10 bg-white/10 p-4">
      <div className="mb-4 flex min-w-0 flex-wrap items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-300 text-slate-950">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="rounded-lg border border-white/10 bg-slate-950/40 px-2 py-1 text-xs font-semibold text-teal-200">
          Step {stepNumber}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="break-words whitespace-normal font-semibold">{title}</h3>
        <p className="mt-2 break-words whitespace-normal text-sm leading-6 text-slate-300">
          {detail}
        </p>
      </div>
    </article>
  );
}
