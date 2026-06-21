import {
  BadgeCheck,
  Clock3,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import type { ConfidenceLevel, PointRange, Scenario } from "@/lib/readiness";

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  hasGenerated: boolean;
  recommendedScenarioTitle?: string;
}

export function ScenarioComparison({
  scenarios,
  hasGenerated,
  recommendedScenarioTitle,
}: ScenarioComparisonProps) {
  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-800">
            Scenario comparison
          </p>
          <h2 className="mt-1 break-words whitespace-normal text-3xl font-semibold text-slate-950">
            Compare three adoption paths
          </h2>
        </div>
        <p className="min-w-0 max-w-xl break-words whitespace-normal text-sm leading-6 text-slate-600">
          Projections are local estimate ranges for discussion and planning,
          not forecasts or funding decisions.
        </p>
      </div>

      {!hasGenerated ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          Generate a blueprint to compare literacy-first, infrastructure-first,
          and delayed-adoption scenarios.
        </div>
      ) : (
        <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <ScenarioCard
              isRecommended={scenario.title === recommendedScenarioTitle}
              key={scenario.title}
              scenario={scenario}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ScenarioCard({
  scenario,
  isRecommended,
}: {
  scenario: Scenario;
  isRecommended: boolean;
}) {
  const isPositive = scenario.impactRange.max >= 0;

  return (
    <article
      className={`relative min-w-0 rounded-lg border p-5 ${
        isRecommended
          ? "border-teal-300 bg-teal-50 shadow-md shadow-teal-100"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      {isRecommended && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
          <BadgeCheck className="h-4 w-4" aria-hidden="true" />
          Recommended
        </div>
      )}

      <div className="flex min-w-0 flex-wrap items-start gap-4">
        <div
          className="grid h-11 w-11 place-items-center rounded-lg text-white shadow-sm"
          style={{ backgroundColor: scenario.color }}
        >
          {isPositive ? (
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 rounded-lg bg-white px-3 py-2 text-left shadow-sm sm:ml-auto sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Impact
          </p>
          <p
            className={`break-words whitespace-normal text-lg font-semibold ${
              isPositive ? "text-teal-800" : "text-orange-800"
            }`}
          >
            {formatPointRange(scenario.impactRange)}
          </p>
        </div>
      </div>

      <h3 className="mt-5 break-words whitespace-normal text-xl font-semibold text-slate-950">
        {scenario.title}
      </h3>
      <p className="mt-2 break-words whitespace-normal text-sm leading-6 text-slate-600">
        {scenario.summary}
      </p>

      <div className="mt-5 min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <ScenarioRow
          label="Readiness impact range"
          value={`${formatPointRange(scenario.impactRange)} points`}
        />
        <ScenarioRow label="Risk" value={scenario.risk} />
        <ScenarioRow label="Difficulty" value={scenario.difficulty} />
        <ScenarioRow label="Cost/effort" value={scenario.costEffort} />
        <ScenarioRow
          label="Confidence"
          value={<ConfidenceBadge level={scenario.confidence.level} />}
        />
        <ScenarioRow label="Best for" value={scenario.bestFor} />
      </div>

      <div className="mt-4 flex min-w-0 gap-3 rounded-lg bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
        {scenario.title.includes("Delay") ? (
          <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />
        ) : (
          <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
        )}
        <p className="min-w-0 break-words whitespace-normal">{scenario.rationale}</p>
      </div>

      <p className="mt-3 break-words whitespace-normal text-xs leading-5 text-slate-500">
        Confidence range: {scenario.confidence.reason}
      </p>
    </article>
  );
}

function ScenarioRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-1 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,130px)_minmax(0,1fr)] sm:gap-3">
      <p className="min-w-0 break-words whitespace-normal text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <div className="min-w-0 break-words whitespace-normal text-sm font-semibold leading-6 text-slate-950">
        {value}
      </div>
    </div>
  );
}

function formatPointRange(range: PointRange) {
  return `${formatSignedPoint(range.min)} to ${formatSignedPoint(range.max)}`;
}

function formatSignedPoint(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const levelClasses = {
    Low: "bg-orange-100 text-orange-800 ring-orange-200",
    Medium: "bg-amber-100 text-amber-800 ring-amber-200",
    High: "bg-teal-100 text-teal-800 ring-teal-200",
  };

  return (
    <span
      className={`inline-flex w-fit max-w-full items-center whitespace-normal break-words rounded-lg px-2 py-1 text-center text-xs font-semibold ring-1 ${levelClasses[level]}`}
    >
      {level}
    </span>
  );
}
