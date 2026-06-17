"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Lightbulb,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { CommunityInputForm } from "@/components/community-input-form";
import {
  EvaluationStrategy,
  HumanDecisionPoints,
  LifecycleGovernance,
  NonGoalsSection,
} from "@/components/governance-sections";
import { ReadinessCharts } from "@/components/readiness-charts";
import { ReadinessResults } from "@/components/readiness-results";
import { ResponsibleGuardrails } from "@/components/responsible-guardrails";
import { ScenarioComparison } from "@/components/scenario-comparison";
import { StrategicRoadmap } from "@/components/strategic-roadmap";
import {
  buildRoadmap,
  buildScenarios,
  calculateReadiness,
  defaultCommunityInput,
  getRecommendedScenario,
  sampleCommunityInput,
} from "@/lib/readiness";
import type {
  CommunityInput,
  ReadinessResult,
  RoadmapPhase,
  Scenario,
  ScoreKey,
} from "@/lib/readiness";

interface Blueprint {
  input: CommunityInput;
  result: ReadinessResult;
  scenarios: Scenario[];
  roadmap: RoadmapPhase[];
}

export function CivicAIDashboard() {
  const [input, setInput] = useState<CommunityInput>(defaultCommunityInput);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);

  const previewResult = useMemo(() => calculateReadiness(input), [input]);

  function updateTextField(
    field: "communityName" | "regionCountry" | "communityType",
    value: string,
  ) {
    setInput((current) => {
      if (field === "communityType") {
        return {
          ...current,
          communityType: value as CommunityInput["communityType"],
        };
      }

      return { ...current, [field]: value };
    });
  }

  function updateScoreField(field: ScoreKey, value: number) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  function createBlueprint(nextInput: CommunityInput) {
    const result = calculateReadiness(nextInput);
    const scenarios = buildScenarios(nextInput, result);

    return {
      input: nextInput,
      result,
      scenarios,
      roadmap: buildRoadmap(nextInput, result),
    };
  }

  function generateBlueprint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBlueprint(createBlueprint(input));
  }

  function loadSampleCommunity() {
    const nextBlueprint = createBlueprint(sampleCommunityInput);
    setInput(sampleCommunityInput);
    setBlueprint(nextBlueprint);
    window.requestAnimationFrame(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function printReport() {
    window.print();
  }

  const displayedResult = blueprint?.result ?? previewResult;
  const hasGenerated = blueprint !== null;
  const dashboardCommunity =
    blueprint?.input.communityName || input.communityName || "Your community";
  const recommendedScenario =
    blueprint !== null
      ? getRecommendedScenario(blueprint.result, blueprint.scenarios)
      : undefined;

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <HeroSection
        communityName={dashboardCommunity}
        previewScore={displayedResult.overallScore}
        readinessLevel={displayedResult.readinessBand.label}
      />

      <main
        className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8"
        id="report"
      >
        <section
          id="blueprint"
          className="grid items-start gap-6 lg:grid-cols-[420px_minmax(0,1fr)]"
        >
          <CommunityInputForm
            input={input}
            onGenerate={generateBlueprint}
            onLoadSample={loadSampleCommunity}
            onScoreChange={updateScoreField}
            onTextChange={updateTextField}
          />

          <div className="flex flex-col gap-6">
            <ReadinessResults
              communityName={blueprint?.input.communityName ?? input.communityName}
              hasGenerated={hasGenerated}
              input={blueprint?.input ?? input}
              onPrint={printReport}
              recommendedScenario={recommendedScenario}
              regionCountry={blueprint?.input.regionCountry ?? input.regionCountry}
              roadmap={blueprint?.roadmap ?? []}
              result={blueprint?.result ?? null}
              scenarios={blueprint?.scenarios ?? []}
            />
            <ReadinessCharts result={blueprint?.result ?? null} />
          </div>
        </section>

        <ScenarioComparison
          hasGenerated={hasGenerated}
          recommendedScenarioTitle={recommendedScenario?.title}
          scenarios={blueprint?.scenarios ?? []}
        />

        <StrategicRoadmap
          hasGenerated={hasGenerated}
          roadmap={blueprint?.roadmap ?? []}
        />

        <HumanDecisionPoints />

        <LifecycleGovernance />

        <EvaluationStrategy />

        <NonGoalsSection />

        <ResponsibleGuardrails />

        <ArchitectureFlow />
      </main>
    </div>
  );
}

function HeroSection({
  communityName,
  previewScore,
  readinessLevel,
}: {
  communityName: string;
  previewScore: number;
  readinessLevel: string;
}) {
  const heroStats = [
    {
      label: "Local scoring",
      value: "10 inputs",
      icon: Gauge,
      color: "text-emerald-700",
    },
    {
      label: "Decision lens",
      value: "Human-led",
      icon: Users,
      color: "text-blue-700",
    },
    {
      label: "Roadmap",
      value: "3 phases",
      icon: ClipboardList,
      color: "text-orange-700",
    },
  ];

  const principleCards = [
    {
      title: "Assess readiness",
      text: "Score infrastructure, literacy, governance, sectors, and capacity with a transparent local model.",
      icon: BarChart3,
    },
    {
      title: "Identify gaps",
      text: "Surface the three weakest areas and convert them into practical priority actions.",
      icon: Lightbulb,
    },
    {
      title: "Support decisions",
      text: "Compare scenarios and produce a roadmap for responsible adoption with human oversight.",
      icon: ShieldCheck,
    },
  ];

  return (
    <header className="no-print relative overflow-hidden border-b border-slate-200 bg-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 14% 16%, rgba(20,184,166,0.22), transparent 28%), radial-gradient(circle at 86% 10%, rgba(37,99,235,0.16), transparent 28%), linear-gradient(135deg, #f8fafc 0%, #eef7f4 45%, #f8fafc 100%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-white shadow-sm">
              <BrainCircuit className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
                USAII Global AI Hackathon 2026
              </p>
              <p className="text-sm text-slate-600">Civic-tech MVP prototype</p>
            </div>
          </div>
          <a
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            href="#blueprint"
          >
            Start blueprint
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>

        <section className="grid min-h-[610px] items-center gap-8 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-white/80 px-3 py-2 text-sm font-medium text-teal-900 shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Responsible AI adoption planning for communities
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
              CivicAI Readiness Blueprint
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-700">
              AI-powered decision support for community AI readiness and
              responsible adoption.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              The system helps human decision-makers assess readiness, compare
              tradeoffs, and plan safer implementation. It does not replace
              public judgment, community accountability, or expert review.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  className="rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm"
                  key={stat.label}
                >
                  <stat.icon className={`mb-3 h-5 w-5 ${stat.color}`} />
                  <p className="text-2xl font-semibold text-slate-950">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/80 bg-white/85 p-5 shadow-xl shadow-slate-200/70 backdrop-blur">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Live readiness lens
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                  {communityName}
                </h2>
              </div>
              <div className="rounded-lg bg-emerald-50 px-3 py-2 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                  Preview
                </p>
                <p className="text-2xl font-semibold text-emerald-900">
                  {previewScore}
                </p>
              </div>
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-950 p-4 text-white">
                <Scale className="mb-4 h-6 w-6 text-teal-300" />
                <p className="text-sm text-slate-300">Readiness level</p>
                <p className="mt-1 text-3xl font-semibold">{readinessLevel}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <Building2 className="mb-4 h-6 w-6 text-blue-700" />
                <p className="text-sm text-slate-500">Decision model</p>
                <p className="mt-1 text-3xl font-semibold text-slate-950">
                  Local
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {principleCards.map((card) => (
                <div
                  className="grid grid-cols-[40px_1fr] gap-3 rounded-lg border border-slate-200 bg-white p-4"
                  key={card.title}
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-50 text-teal-800">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-lg bg-amber-50 p-4 text-sm text-amber-950">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-700" />
              <p>
                Frontend prototype only: no OpenAI API calls, no automated
                final decisions, and no external data submission.
              </p>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
