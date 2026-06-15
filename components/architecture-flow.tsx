import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">
            Architecture
          </p>
          <h2 className="mt-1 text-3xl font-semibold">
            Decision-support flow
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-slate-200">
          <MessageSquare className="h-4 w-4 text-teal-300" />
          Feedback loop ready
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[repeat(11,minmax(0,1fr))] lg:items-stretch">
        {architectureSteps.map((step, index) => (
          <ArchitectureStep
            detail={step.detail}
            icon={step.icon}
            isLast={index === architectureSteps.length - 1}
            key={step.title}
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
  isLast,
}: {
  title: string;
  detail: string;
  icon: LucideIcon;
  isLast: boolean;
}) {
  return (
    <>
      <article className="rounded-lg border border-white/10 bg-white/10 p-4 lg:col-span-1">
        <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-teal-300 text-slate-950">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
      </article>
      {!isLast && (
        <div className="hidden place-items-center text-slate-400 lg:grid">
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
    </>
  );
}
