"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Loader2,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  AI_INSIGHT_FALLBACK_MESSAGE,
  type AIInsight,
  type AIInsightRequest,
  type AIInsightResponse,
} from "@/lib/ai-insight";

interface AIPolicyInsightProps {
  requestPayload: AIInsightRequest;
}

export function AIPolicyInsight({ requestPayload }: AIPolicyInsightProps) {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateInsight() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/insight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
      const data = (await response.json()) as Partial<
        AIInsightResponse & { error: string }
      >;

      if (!response.ok || !data.insight) {
        throw new Error(data.error || AI_INSIGHT_FALLBACK_MESSAGE);
      }

      setInsight(data.insight);
    } catch (caughtError) {
      setInsight(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : AI_INSIGHT_FALLBACK_MESSAGE,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mt-4 rounded-lg border border-blue-200 bg-gradient-to-br from-slate-950 via-blue-950 to-teal-950 p-5 text-white shadow-lg shadow-blue-950/10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
            <BrainCircuit className="h-4 w-4" aria-hidden="true" />
            AI Policy Insight
          </div>
          <h3 className="text-3xl font-semibold">
            Generate a custom advisory insight
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Uses the current profile, local scores, weakest gaps, scenario
            ranges, and roadmap summary. Outputs remain advisory and require
            human review.
          </p>
        </div>
        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoading}
          onClick={generateInsight}
          type="button"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          )}
          {isLoading ? "Generating..." : "Generate AI Insight"}
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-amber-300/40 bg-amber-100 p-4 text-sm leading-6 text-amber-950">
          {AI_INSIGHT_FALLBACK_MESSAGE}
        </div>
      )}

      {isLoading && (
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {["Analyzing readiness", "Comparing scenarios", "Drafting guardrails"].map(
            (label) => (
              <div
                className="rounded-lg border border-white/10 bg-white/10 p-4"
                key={label}
              >
                <div className="mb-3 h-3 w-32 rounded-full bg-white/20" />
                <div className="h-3 w-full rounded-full bg-white/10" />
                <div className="mt-2 h-3 w-4/5 rounded-full bg-white/10" />
              </div>
            ),
          )}
        </div>
      )}

      {insight && (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <InsightCard
            icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
            title="Executive Insight"
          >
            <p>{insight.executiveInsight}</p>
          </InsightCard>
          <InsightCard
            icon={<BrainCircuit className="h-5 w-5" aria-hidden="true" />}
            title="Why AI is needed"
          >
            <p>{insight.whyAIIsNeeded}</p>
          </InsightCard>
          <InsightCard
            icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
            title="Recommended Scenario"
          >
            <p className="font-semibold text-white">
              {insight.recommendedScenario.title}
            </p>
            <p className="mt-2">{insight.recommendedScenario.reasoning}</p>
          </InsightCard>
          <InsightListCard
            icon={<AlertTriangle className="h-5 w-5" aria-hidden="true" />}
            items={insight.topRisks}
            title="Risks & Guardrails"
          />
          <InsightListCard
            icon={<UserCheck className="h-5 w-5" aria-hidden="true" />}
            items={insight.humanReviewPlan}
            title="Human Review Plan"
          />
          <InsightListCard
            icon={<FileText className="h-5 w-5" aria-hidden="true" />}
            items={insight.dataLimitations}
            title="Data Limitations"
          />
          <div className="lg:col-span-2">
            <InsightListCard
              icon={<CheckCircle2 className="h-5 w-5" aria-hidden="true" />}
              items={insight.nextBestActions}
              title="Next Best Actions"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function InsightCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-300 text-slate-950">
          {icon}
        </div>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      <div className="text-sm leading-6 text-slate-200">{children}</div>
    </article>
  );
}

function InsightListCard({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <InsightCard icon={icon} title={title}>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </InsightCard>
  );
}
