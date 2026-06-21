import { ReactNode } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  FileText,
  Gauge,
  Info,
  Lightbulb,
  MapPin,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AIPolicyInsight } from "@/components/ai-policy-insight";
import type { AIInsightRequest } from "@/lib/ai-insight";
import type {
  ConfidenceLevel,
  CommunityInput,
  PointRange,
  ReadinessResult,
  RoadmapPhase,
  Scenario,
  ScoreDatum,
} from "@/lib/readiness";

interface ReadinessResultsProps {
  result: ReadinessResult | null;
  communityName: string;
  regionCountry: string;
  hasGenerated: boolean;
  input: CommunityInput;
  roadmap: RoadmapPhase[];
  recommendedScenario?: Scenario;
  scenarios: Scenario[];
  onPrint: () => void;
}

export function ReadinessResults({
  result,
  communityName,
  regionCountry,
  hasGenerated,
  input,
  roadmap,
  recommendedScenario,
  scenarios,
  onPrint,
}: ReadinessResultsProps) {
  if (!hasGenerated || result === null) {
    return (
      <section className="min-w-0 rounded-lg border border-dashed border-slate-300 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-600">
            <Gauge className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Readiness results
            </p>
            <h2 className="mt-1 break-words whitespace-normal text-2xl font-semibold text-slate-950">
              Generate a blueprint to calculate scores.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              The dashboard will calculate the overall readiness score, sector
              scores, readiness level, top gaps, and priority actions from the
              form inputs.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const mainGap = result.topGaps[0];
  const nextAction = result.priorityActions[0];
  const roadmapSummary =
    roadmap.length > 0
      ? "Start with awareness and policy basics, move into pilots and governance, then scale only with monitoring and evaluation."
      : "Generate the roadmap to connect near-term awareness, mid-term pilots, and long-term monitoring.";
  const mainRisk = mainGap
    ? `${mainGap.label} is the main risk because ${lowercaseFirst(mainGap.detail)}`
    : "No single readiness gap dominates the current profile.";
  const insightPayload = buildInsightRequest({
    input,
    result,
    roadmap,
    roadmapSummary,
    scenarios,
    recommendedScenario,
  });

  return (
    <section
      className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      id="results"
    >
      <ExecutiveSummary
        communityName={communityName}
        mainRisk={mainRisk}
        onPrint={onPrint}
        recommendedScenario={recommendedScenario}
        regionCountry={regionCountry}
        result={result}
        roadmapSummary={roadmapSummary}
      />

      <AIPolicyInsight requestPayload={insightPayload} />

      <DisclosureCards />

      <ToplineResults
        mainGap={mainGap}
        nextStep={nextAction?.title ?? "Review the top gaps with human owners."}
        result={result}
      />

      <SectorScoreCards sectorScores={result.sectorScores} />

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-700" />
            <h3 className="text-lg font-semibold text-slate-950">
              Top 3 weakest areas
            </h3>
          </div>
          <div className="grid gap-3">
            {result.topGaps.map((gap) => (
              <div
                className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-4"
                key={gap.key}
              >
                <div className="grid min-w-0 gap-2">
                  <h4 className="min-w-0 break-words whitespace-normal font-semibold text-slate-950">
                    {gap.label}
                  </h4>
                  <span className="w-fit max-w-full whitespace-normal rounded-lg bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {gap.score}/5
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">
                  {gap.status}
                </p>
                <div className="mt-3 flex min-w-0 flex-wrap items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Confidence
                  </span>
                  <ConfidenceBadge level={gap.confidence.level} />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Why this gap matters
                </p>
                <p className="mt-2 break-words whitespace-normal text-sm leading-6 text-slate-600">
                  {gap.detail}
                </p>
                <p className="mt-2 break-words whitespace-normal text-xs leading-5 text-slate-500">
                  {gap.confidence.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-700" />
            <h3 className="text-lg font-semibold text-slate-950">
              Top 3 priority actions
            </h3>
          </div>
          <div className="grid gap-3">
            {result.priorityActions.map((action) => (
              <div
                className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                key={action.title}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-700" />
                  <div className="min-w-0">
                    <p className="break-words whitespace-normal text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Linked gap: {action.linkedGap}
                    </p>
                    <h4 className="mt-1 break-words whitespace-normal font-semibold text-slate-950">
                      {action.title}
                    </h4>
                    <p className="mt-2 break-words whitespace-normal text-sm leading-6 text-slate-600">
                      {action.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-700" />
          <h3 className="text-lg font-semibold text-slate-950">
            Score confidence matrix
          </h3>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {result.allScores.map((score) => (
            <div
              className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              key={score.key}
            >
              <div className="grid min-w-0 gap-3">
                <div className="min-w-0">
                  <p className="break-words whitespace-normal text-sm font-semibold text-slate-950">
                    {score.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-950">
                    {score.score}/100
                  </p>
                </div>
                <ConfidenceBadge level={score.confidence.level} />
              </div>
              <p className="mt-3 break-words whitespace-normal text-xs leading-5 text-slate-600">
                {score.confidence.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExecutiveSummary({
  result,
  communityName,
  regionCountry,
  mainRisk,
  recommendedScenario,
  roadmapSummary,
  onPrint,
}: {
  result: ReadinessResult;
  communityName: string;
  regionCountry: string;
  mainRisk: string;
  recommendedScenario?: Scenario;
  roadmapSummary: string;
  onPrint: () => void;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">
            Executive Summary
          </p>
          <h2 className="mt-1 break-words whitespace-normal text-3xl font-semibold">
            {communityName || "Community"} readiness brief
          </h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {regionCountry || "Region not specified"}
          </p>
        </div>
        <button
          className="no-print inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-normal rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-white/20 sm:w-auto"
          onClick={onPrint}
          type="button"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Download / Print Report
        </button>
      </div>

      <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="min-w-0 rounded-lg bg-white p-5 text-slate-950">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Overall readiness
          </p>
          <p className="mt-2 text-7xl font-semibold leading-none">
            {result.overallScore}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            out of 100
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ReadinessBadge
              color={result.readinessBand.color}
              label={result.readinessBand.label}
            />
            <ConfidenceBadge level={result.overallConfidence.level} />
          </div>
        </div>

        <div className="grid min-w-0 gap-3 md:grid-cols-2">
          <SummaryLine label="Main risk" value={mainRisk} />
          <SummaryLine
            label="Best recommended scenario"
            value={recommendedScenario?.title ?? "Review scenarios with human owners"}
          />
          <SummaryLine label="Roadmap summary" value={roadmapSummary} />
          <SummaryLine
            label="Human review reminder"
            value="Human reviewers must validate inputs, assumptions, and policy fit before acting."
          />
        </div>
      </div>
    </div>
  );
}

function ToplineResults({
  result,
  mainGap,
  nextStep,
}: {
  result: ReadinessResult;
  mainGap: ReadinessResult["topGaps"][number] | undefined;
  nextStep: string;
}) {
  return (
    <div className="mt-6 min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800">
            10-second readout
          </p>
          <h3 className="break-words whitespace-normal text-2xl font-semibold text-slate-950">
            The profile is {result.readinessBand.label.toLowerCase()} and needs
            targeted human review.
          </h3>
        </div>
        <ReadinessBadge
          color={result.readinessBand.color}
          label={result.readinessBand.label}
        />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        <ToplineCard
          icon={<Gauge className="h-5 w-5" aria-hidden="true" />}
          label="Score"
          tone="teal"
          value={`${result.overallScore}/100`}
        />
        <ToplineCard
          icon={<Info className="h-5 w-5" aria-hidden="true" />}
          label="Confidence"
          tone="amber"
          value={result.overallConfidence.level}
        />
        <ToplineCard
          icon={<AlertTriangle className="h-5 w-5" aria-hidden="true" />}
          label="Main weak area"
          tone="orange"
          value={mainGap?.label ?? "No dominant gap"}
        />
        <ToplineCard
          icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
          label="Recommended next step"
          tone="blue"
          value={nextStep}
        />
      </div>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-950">
              Results are estimates, not final decisions.
            </p>
            <p className="mt-1 text-sm leading-6 text-amber-900">
              {result.overallConfidence.reason}
            </p>
          </div>
          <ConfidenceBadge level={result.overallConfidence.level} />
        </div>
      </div>
    </div>
  );
}

function SectorScoreCards({ sectorScores }: { sectorScores: ScoreDatum[] }) {
  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-teal-700" />
        <h3 className="text-lg font-semibold text-slate-950">
          Sector-wise scores
        </h3>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {sectorScores.map((sector) => (
          <div
            className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-4"
            key={sector.key}
            title={getSectorWhy(sector.label)}
          >
            <div className="grid min-w-0 gap-3">
              <div className="min-w-0">
                <p className="break-words whitespace-normal text-sm font-semibold text-slate-950">
                  {sector.label}
                </p>
                <p className="mt-1 text-3xl font-semibold text-slate-950">
                  {sector.score}
                </p>
              </div>
              <StatusBadge score={sector.score} />
            </div>
            <div className="mt-4 h-2 rounded-full bg-white">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${sector.score}%`,
                  backgroundColor: sector.color,
                }}
              />
            </div>
            <p className="mt-3 break-words whitespace-normal text-sm leading-5 text-slate-700">
              {getSectorExplanation(sector.score)}
            </p>
            <p className="mt-2 break-words whitespace-normal text-xs leading-5 text-slate-500">
              Why it matters: {getSectorWhy(sector.label)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DisclosureCards() {
  return (
    <div className="mt-4 grid min-w-0 gap-3 lg:grid-cols-2">
      <DisclosureCard
        icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
        title="Data Disclosure"
        text="This prototype uses user-provided scores and synthetic assumptions only. It does not use personal, confidential, or sensitive data."
        tone="teal"
      />
      <DisclosureCard
        icon={<FileText className="h-5 w-5" aria-hidden="true" />}
        title="Model Limitation"
        text="The scoring model is a transparent prototype, not a trained policy model. It is designed to structure discussion, reveal gaps, and support human review."
        tone="blue"
      />
    </div>
  );
}

function DisclosureCard({
  icon,
  title,
  text,
  tone,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  tone: "teal" | "blue";
}) {
  const toneClass =
    tone === "teal" ? "bg-teal-50 text-teal-800" : "bg-blue-50 text-blue-800";

  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${toneClass}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="break-words whitespace-normal font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 break-words whitespace-normal text-sm leading-6 text-slate-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-white/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
        {label}
      </p>
      <p className="mt-2 break-words whitespace-normal text-sm leading-6 text-white">{value}</p>
    </div>
  );
}

function ToplineCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: "teal" | "blue" | "orange" | "amber";
}) {
  const toneClasses = {
    teal: "bg-teal-50 text-teal-800",
    blue: "bg-blue-50 text-blue-800",
    orange: "bg-orange-50 text-orange-800",
    amber: "bg-amber-50 text-amber-800",
  };

  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div
        className={`mb-3 grid h-10 w-10 place-items-center rounded-lg ${toneClasses[tone]}`}
      >
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words whitespace-normal text-lg font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function ReadinessBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
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

function StatusBadge({ score }: { score: number }) {
  const status = score < 45 ? "Gap" : score < 65 ? "Watch" : "Strong";
  const statusClasses = {
    Gap: "bg-orange-100 text-orange-800 ring-orange-200",
    Watch: "bg-amber-100 text-amber-800 ring-amber-200",
    Strong: "bg-teal-100 text-teal-800 ring-teal-200",
  };

  return (
    <span
      className={`inline-flex w-fit max-w-full items-center whitespace-normal break-words rounded-lg px-2 py-1 text-center text-xs font-semibold ring-1 ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}

function getSectorExplanation(score: number) {
  if (score < 45) {
    return "Needs immediate capacity-building before AI pilots expand.";
  }

  if (score < 65) {
    return "Usable for limited pilots with oversight and targeted support.";
  }

  return "Ready for focused pilots with monitoring and safeguards.";
}

function getSectorWhy(label: string) {
  const why: Record<string, string> = {
    Workforce: "Staff capability determines whether tools are used safely.",
    Education: "Learning networks shape equitable AI literacy and access.",
    Healthcare: "Health-adjacent use cases require extra privacy and safety review.",
    Government: "Public agencies need procurement, transparency, and appeal paths.",
    Nonprofit: "Civic partners extend reach to residents and vulnerable groups.",
  };

  return why[label] ?? "Sector readiness affects adoption quality and oversight.";
}

function buildInsightRequest({
  input,
  result,
  scenarios,
  recommendedScenario,
  roadmapSummary,
  roadmap,
}: {
  input: CommunityInput;
  result: ReadinessResult;
  scenarios: Scenario[];
  recommendedScenario?: Scenario;
  roadmapSummary: string;
  roadmap: RoadmapPhase[];
}): AIInsightRequest {
  return {
    communityProfile: {
      communityName: input.communityName,
      regionCountry: input.regionCountry,
      communityType: input.communityType,
    },
    scores: result.allScores.map((score) => ({
      key: score.key,
      label: score.label,
      score: score.score,
      rawScore: score.rawScore,
      confidence: score.confidence.level,
    })),
    readiness: {
      overallScore: result.overallScore,
      readinessLevel: result.readinessBand.label,
      confidence: result.overallConfidence.level,
      confidenceReason: result.overallConfidence.reason,
    },
    weakestGaps: result.topGaps.map((gap) => ({
      label: gap.label,
      score: gap.score,
      status: gap.status,
      detail: gap.detail,
      confidence: gap.confidence.level,
    })),
    priorityActions: result.priorityActions,
    scenarioComparison: scenarios.map((scenario) => ({
      title: scenario.title,
      impactRange: formatPointRange(scenario.impactRange),
      risk: scenario.risk,
      difficulty: scenario.difficulty,
      costEffort: scenario.costEffort,
      confidence: scenario.confidence.level,
      bestFor: scenario.bestFor,
    })),
    recommendedScenario: recommendedScenario
      ? {
          title: recommendedScenario.title,
          rationale: recommendedScenario.rationale,
        }
      : undefined,
    roadmapSummary,
    roadmapPhases: roadmap.map((phase) => ({
      window: phase.window,
      focus: phase.focus,
      outcome: phase.outcome,
    })),
  };
}

function formatPointRange(range: PointRange) {
  return `${formatSignedPoint(range.min)} to ${formatSignedPoint(range.max)}`;
}

function formatSignedPoint(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function lowercaseFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}
