import type {
  CommunityInput,
  ReadinessResult,
  RoadmapPhase,
} from "@/lib/readiness";

export const AI_INSIGHT_FALLBACK_MESSAGE =
  "AI insight unavailable in this environment. The prototype still provides transparent local scoring, scenario comparison, and responsible AI guardrails.";

export interface AIInsight {
  executiveInsight: string;
  whyAIIsNeeded: string;
  topRisks: string[];
  recommendedScenario: {
    title: string;
    reasoning: string;
  };
  humanReviewPlan: string[];
  dataLimitations: string[];
  nextBestActions: string[];
}

export interface AIInsightRequest {
  communityProfile: Pick<
    CommunityInput,
    "communityName" | "regionCountry" | "communityType"
  >;
  scores: Array<{
    key: string;
    label: string;
    score: number;
    rawScore?: number;
    confidence: string;
  }>;
  readiness: {
    overallScore: number;
    readinessLevel: ReadinessResult["readinessBand"]["label"];
    confidence: string;
    confidenceReason: string;
  };
  weakestGaps: Array<{
    label: string;
    score: number;
    status: string;
    detail: string;
    confidence: string;
  }>;
  priorityActions: Array<{
    title: string;
    detail: string;
    linkedGap: string;
  }>;
  scenarioComparison: Array<{
    title: string;
    impactRange: string;
    risk: string;
    difficulty: string;
    costEffort: string;
    confidence: string;
    bestFor: string;
  }>;
  recommendedScenario?: {
    title: string;
    rationale: string;
  };
  roadmapSummary: string;
  roadmapPhases: Array<Pick<RoadmapPhase, "window" | "focus" | "outcome">>;
}

export interface AIInsightResponse {
  insight: AIInsight;
}
