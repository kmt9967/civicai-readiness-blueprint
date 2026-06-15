import {
  AlertTriangle,
  Ban,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  RefreshCw,
  UserCheck,
} from "lucide-react";

const nonGoals = [
  "It does not make final policy decisions.",
  "It does not allocate funding automatically.",
  "It does not replace public consultation.",
  "It does not claim predictions are certain.",
  "It does not use personal or sensitive data.",
];

const decisionPoints = [
  {
    title: "Approve the readiness assessment",
    detail:
      "Human reviewers decide whether the submitted inputs are complete, current, and representative enough to use.",
  },
  {
    title: "Prioritize an investment scenario",
    detail:
      "Leaders compare tradeoffs and choose whether to emphasize AI literacy, infrastructure, or delayed adoption.",
  },
  {
    title: "Set policy status",
    detail:
      "Decision-makers decide whether recommendations become policy proposals or remain advisory planning notes.",
  },
];

const lifecycleItems = [
  "Inputs should be reviewed every 6 months.",
  "Scores should be updated when community data changes.",
  "Drift detection should compare old readiness scores with new inputs.",
  "Human reviewers should approve roadmap updates.",
  "Public sector users should document assumptions before acting.",
];

const evaluationItems = [
  "Compare recommendations with expert review.",
  "Track whether priority actions are adopted.",
  "Measure improvement in readiness scores over time.",
  "Review false confidence cases where the system appeared certain but data was weak.",
];

export function NonGoalsSection() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Scope boundaries
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">
            What this system does NOT do
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            These non-goals keep the prototype aligned with human governance,
            public accountability, and privacy-preserving decision support.
          </p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-rose-50 text-rose-700">
          <Ban className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {nonGoals.map((item) => (
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            key={item}
          >
            <AlertTriangle className="mb-3 h-5 w-5 text-rose-700" />
            <p className="text-sm leading-6 text-slate-800">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HumanDecisionPoints() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-800">
            Human decision points
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">
            Where people must make the call
          </h2>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-800">
          <UserCheck className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {decisionPoints.map((point, index) => (
          <article
            className="rounded-lg border border-slate-200 bg-slate-50 p-5"
            key={point.title}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-blue-800 shadow-sm">
                {index + 1}
              </div>
              <ClipboardCheck className="h-5 w-5 text-blue-800" />
            </div>
            <h3 className="text-lg font-semibold text-slate-950">
              {point.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {point.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LifecycleGovernance() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800">
            Lifecycle controls
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">
            Lifecycle & Governance
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            The blueprint is meant to be updated as community conditions,
            evidence, laws, and institutional capacity change.
          </p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal-50 text-teal-800">
          <RefreshCw className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {lifecycleItems.map((item) => (
          <div
            className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
            key={item}
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
            <p className="text-sm leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EvaluationStrategy() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-800">
            Evaluation strategy
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">
            How the system can be evaluated
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Evaluation should test usefulness, calibration, adoption, and
            whether the dashboard communicates uncertainty honestly.
          </p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-orange-50 text-orange-800">
          <BarChart3 className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {evaluationItems.map((item) => (
          <div
            className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
            key={item}
          >
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />
            <p className="text-sm leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
