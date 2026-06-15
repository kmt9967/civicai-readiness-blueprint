import { AlertTriangle, Scale, ShieldCheck, UserCheck } from "lucide-react";

const guardrails = [
  "This system does not make final policy or funding decisions.",
  "It only supports human decision-makers.",
  "Scores are estimates based on user-provided or synthetic data.",
  "Human review is required before using recommendations.",
  "The system should not be used when data is incomplete, biased, outdated, or when decisions directly affect rights, funding, safety, or access to essential services.",
];

export function ResponsibleGuardrails() {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-800">
            Responsible AI guardrails
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">
            Human authority stays at the center.
          </h2>
          <p className="mt-3 text-sm leading-6 text-amber-950">
            CivicAI Readiness Blueprint is a decision-support prototype. It is
            designed to improve deliberation, not to automate public judgment.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[Scale, UserCheck, ShieldCheck].map((Icon, index) => (
            <div
              className="grid h-12 w-12 place-items-center rounded-lg bg-white text-amber-800 shadow-sm"
              key={index}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {guardrails.map((guardrail) => (
          <div
            className="flex items-start gap-3 rounded-lg border border-amber-200 bg-white p-4"
            key={guardrail}
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <p className="text-sm leading-6 text-slate-800">{guardrail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
