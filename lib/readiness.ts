export type CommunityType =
  | "City"
  | "Nonprofit coalition"
  | "Workforce agency"
  | "Education network"
  | "Healthcare network"
  | "Local government";

export type ScoreKey =
  | "internetAccess"
  | "aiLiteracy"
  | "digitalInfrastructure"
  | "dataGovernance"
  | "workforceReadiness"
  | "educationReadiness"
  | "healthcareReadiness"
  | "governmentReadiness"
  | "nonprofitReadiness"
  | "budgetStaffCapacity";

export interface CommunityInput extends Record<ScoreKey, number> {
  communityName: string;
  regionCountry: string;
  communityType: CommunityType;
}

export interface ScoreFieldDefinition {
  key: ScoreKey;
  label: string;
  helper: string;
}

export interface ReadinessBand {
  label: "Emerging" | "Developing" | "Ready" | "Advanced";
  summary: string;
  color: string;
}

export type ConfidenceLevel = "Low" | "Medium" | "High";

export interface ConfidenceAssessment {
  level: ConfidenceLevel;
  reason: string;
}

export interface ScoreDatum {
  key: string;
  label: string;
  score: number;
  rawScore?: number;
  color?: string;
  confidence: ConfidenceAssessment;
}

export interface Gap {
  key: ScoreKey;
  label: string;
  score: number;
  scoreOutOf100: number;
  status: "Critical gap" | "Needs attention" | "Monitor";
  detail: string;
  confidence: ConfidenceAssessment;
}

export interface PriorityAction {
  title: string;
  detail: string;
  linkedGap: string;
}

export interface ReadinessResult {
  overallScore: number;
  readinessBand: ReadinessBand;
  overallConfidence: ConfidenceAssessment;
  allScores: ScoreDatum[];
  sectorScores: ScoreDatum[];
  dimensionScores: ScoreDatum[];
  topGaps: Gap[];
  priorityActions: PriorityAction[];
}

export interface PointRange {
  min: number;
  max: number;
}

export interface Scenario {
  title: string;
  summary: string;
  projectedRange: PointRange;
  impactRange: PointRange;
  risk: "Low" | "Medium" | "High";
  difficulty: "Low" | "Medium" | "High";
  costEffort: "Low" | "Medium" | "High";
  confidence: ConfidenceAssessment;
  bestFor: string;
  rationale: string;
  color: string;
}

export interface RoadmapPhase {
  window: string;
  phase: string;
  focus: string;
  actions: string[];
  outcome: string;
}

export const communityTypes: CommunityType[] = [
  "City",
  "Nonprofit coalition",
  "Workforce agency",
  "Education network",
  "Healthcare network",
  "Local government",
];

export const scoreFields: ScoreFieldDefinition[] = [
  {
    key: "internetAccess",
    label: "Internet access",
    helper: "Reliable broadband, device access, and connectivity reach.",
  },
  {
    key: "aiLiteracy",
    label: "AI literacy",
    helper: "Baseline understanding of AI concepts, risks, and use cases.",
  },
  {
    key: "digitalInfrastructure",
    label: "Digital infrastructure",
    helper: "Cloud, identity, cybersecurity, and shared digital tools.",
  },
  {
    key: "dataGovernance",
    label: "Data governance",
    helper: "Policies for data quality, consent, stewardship, and review.",
  },
  {
    key: "workforceReadiness",
    label: "Workforce readiness",
    helper: "Staff capacity to adopt, operate, and evaluate AI tools.",
  },
  {
    key: "educationReadiness",
    label: "Education readiness",
    helper: "Schools and learning networks prepared for responsible AI.",
  },
  {
    key: "healthcareReadiness",
    label: "Healthcare readiness",
    helper: "Care networks prepared for safe, privacy-aware AI workflows.",
  },
  {
    key: "governmentReadiness",
    label: "Government readiness",
    helper: "Public agencies prepared for policy, procurement, and oversight.",
  },
  {
    key: "nonprofitReadiness",
    label: "Nonprofit readiness",
    helper: "Civic organizations prepared to use AI for services and outreach.",
  },
  {
    key: "budgetStaffCapacity",
    label: "Budget/staff capacity",
    helper: "Available funding, staff time, and implementation support.",
  },
];

export const defaultCommunityInput: CommunityInput = {
  communityName: "Riverbend Civic Coalition",
  regionCountry: "United States",
  communityType: "Local government",
  internetAccess: 3,
  aiLiteracy: 2,
  digitalInfrastructure: 3,
  dataGovernance: 2,
  workforceReadiness: 3,
  educationReadiness: 3,
  healthcareReadiness: 2,
  governmentReadiness: 3,
  nonprofitReadiness: 4,
  budgetStaffCapacity: 2,
};

export const sampleCommunityInput: CommunityInput = {
  communityName: "Great Lakes Civic AI Partnership",
  regionCountry: "United States",
  communityType: "City",
  internetAccess: 4,
  aiLiteracy: 2,
  digitalInfrastructure: 3,
  dataGovernance: 2,
  workforceReadiness: 4,
  educationReadiness: 3,
  healthcareReadiness: 2,
  governmentReadiness: 3,
  nonprofitReadiness: 4,
  budgetStaffCapacity: 3,
};

const sectorDefinitions: Array<{
  key: ScoreKey;
  label: string;
  color: string;
}> = [
  { key: "workforceReadiness", label: "Workforce", color: "#0f766e" },
  { key: "educationReadiness", label: "Education", color: "#2563eb" },
  { key: "healthcareReadiness", label: "Healthcare", color: "#c2410c" },
  { key: "governmentReadiness", label: "Government", color: "#7c3aed" },
  { key: "nonprofitReadiness", label: "Nonprofit", color: "#be123c" },
];

const dimensionDefinitions: Array<{
  key: string;
  label: string;
  keys: ScoreKey[];
  color: string;
}> = [
  {
    key: "infrastructure",
    label: "Infrastructure",
    keys: ["internetAccess", "digitalInfrastructure"],
    color: "#0f766e",
  },
  {
    key: "literacy",
    label: "AI literacy",
    keys: ["aiLiteracy"],
    color: "#2563eb",
  },
  {
    key: "governance",
    label: "Governance",
    keys: ["dataGovernance"],
    color: "#7c3aed",
  },
  {
    key: "capacity",
    label: "Capacity",
    keys: ["budgetStaffCapacity"],
    color: "#c2410c",
  },
];

const priorityActionCopy: Record<
  ScoreKey,
  { title: string; detail: string }
> = {
  internetAccess: {
    title: "Close access barriers before advanced AI pilots",
    detail:
      "Map broadband, device, and accessibility gaps, then prioritize shared access points and inclusion partners.",
  },
  aiLiteracy: {
    title: "Launch role-based AI literacy sessions",
    detail:
      "Train leaders, frontline staff, and community partners on use cases, limitations, bias, privacy, and human review.",
  },
  digitalInfrastructure: {
    title: "Stabilize the digital foundation",
    detail:
      "Audit identity, cybersecurity, cloud, data-sharing, and support workflows before adding high-risk AI tools.",
  },
  dataGovernance: {
    title: "Create a lightweight data governance process",
    detail:
      "Define data owners, quality checks, consent expectations, review cadence, and escalation paths for sensitive uses.",
  },
  workforceReadiness: {
    title: "Build an AI change-management team",
    detail:
      "Identify staff champions, protect training time, and document how AI changes roles, supervision, and accountability.",
  },
  educationReadiness: {
    title: "Prepare learning institutions for responsible AI",
    detail:
      "Align classroom, training, and learner-support pilots with privacy, academic integrity, and accessibility rules.",
  },
  healthcareReadiness: {
    title: "Use extra review for health-adjacent AI",
    detail:
      "Limit pilots to low-risk workflows until privacy, clinical oversight, consent, and escalation protocols are mature.",
  },
  governmentReadiness: {
    title: "Update procurement and public-sector oversight",
    detail:
      "Add transparency, auditability, appeal, accessibility, and vendor accountability requirements to AI procurement.",
  },
  nonprofitReadiness: {
    title: "Support nonprofit service partners",
    detail:
      "Offer shared templates, training, and governance support so smaller organizations can participate safely.",
  },
  budgetStaffCapacity: {
    title: "Scope pilots to available capacity",
    detail:
      "Start with one narrow, measurable pilot and reserve staff time for review, evaluation, and community feedback.",
  },
};

const gapDetails: Record<ScoreKey, string> = {
  internetAccess:
    "Connectivity constraints can exclude residents or partner organizations from AI-enabled services.",
  aiLiteracy:
    "Low AI literacy raises the chance of over-trust, misuse, weak oversight, and poor vendor evaluation.",
  digitalInfrastructure:
    "Digital infrastructure gaps make pilots harder to secure, integrate, maintain, and scale.",
  dataGovernance:
    "Weak data governance increases privacy, bias, consent, quality, and accountability risks.",
  workforceReadiness:
    "Workforce gaps reduce adoption quality and make it harder to keep humans meaningfully in the loop.",
  educationReadiness:
    "Education readiness gaps limit equitable learning, training, and youth-facing AI adoption.",
  healthcareReadiness:
    "Healthcare gaps require caution because errors can affect privacy, safety, care quality, and trust.",
  governmentReadiness:
    "Government readiness gaps can weaken procurement, transparency, appeals, and public accountability.",
  nonprofitReadiness:
    "Nonprofit gaps can leave service partners behind and reduce community reach.",
  budgetStaffCapacity:
    "Capacity limits can turn promising pilots into unsupported tools without monitoring or evaluation.",
};

export function calculateReadiness(input: CommunityInput): ReadinessResult {
  const inputQuality = getInputQuality(input);
  const normalizedScores = scoreFields.map((field) => input[field.key] * 20);
  const overallScore = Math.round(
    normalizedScores.reduce((sum, score) => sum + score, 0) /
      normalizedScores.length,
  );
  const overallConfidence = assessOverallConfidence(inputQuality);

  const allScores = scoreFields.map((field) => ({
    key: field.key,
    label: field.label,
    score: input[field.key] * 20,
    rawScore: input[field.key],
    confidence: assessScoreConfidence(input[field.key], inputQuality),
  }));

  const sectorScores = sectorDefinitions.map((sector) => ({
    key: sector.key,
    label: sector.label,
    score: input[sector.key] * 20,
    rawScore: input[sector.key],
    color: sector.color,
    confidence: assessScoreConfidence(input[sector.key], inputQuality),
  }));

  const dimensionScores = dimensionDefinitions.map((dimension) => {
    const average =
      dimension.keys.reduce((sum, key) => sum + input[key], 0) /
      dimension.keys.length;

    return {
      key: dimension.key,
      label: dimension.label,
      score: Math.round(average * 20),
      rawScore: Number(average.toFixed(1)),
      color: dimension.color,
      confidence: assessScoreConfidence(average, inputQuality),
    };
  });

  const topGaps = scoreFields
    .map((field) => ({
      key: field.key,
      label: field.label,
      score: input[field.key],
      scoreOutOf100: input[field.key] * 20,
      status: getGapStatus(input[field.key]),
      detail: gapDetails[field.key],
      confidence: assessScoreConfidence(input[field.key], inputQuality),
    }))
    .sort((a, b) => a.score - b.score || a.label.localeCompare(b.label))
    .slice(0, 3);

  const priorityActions = topGaps.map((gap) => ({
    ...priorityActionCopy[gap.key],
    linkedGap: gap.label,
  }));

  return {
    overallScore,
    readinessBand: getReadinessBand(overallScore),
    overallConfidence,
    allScores,
    sectorScores,
    dimensionScores,
    topGaps,
    priorityActions,
  };
}

export function buildScenarios(
  input: CommunityInput,
  result: ReadinessResult,
): Scenario[] {
  const inputQuality = getInputQuality(input);
  const literacyBoost =
    input.aiLiteracy <= 2 ? 14 : input.aiLiteracy === 3 ? 10 : 6;
  const governancePenalty = input.dataGovernance <= 2 ? -3 : 0;
  const infrastructureBoost =
    input.digitalInfrastructure <= 2 || input.internetAccess <= 2 ? 15 : 9;
  const capacityPenalty = input.budgetStaffCapacity <= 2 ? -4 : 0;
  const delayPenalty = result.overallScore >= 70 ? -12 : -8;
  const literacyImpact = toRange(literacyBoost + governancePenalty, 2, 4);
  const infrastructureImpact = toRange(
    infrastructureBoost + capacityPenalty,
    3,
    4,
  );
  const delayImpact = {
    min: delayPenalty - 4,
    max: delayPenalty + 2,
  };

  return [
    {
      title: "Invest in AI literacy now",
      summary:
        "Build shared understanding before expanding tools across agencies and partner networks.",
      projectedRange: toProjectedRange(result.overallScore, literacyImpact),
      impactRange: literacyImpact,
      risk: input.dataGovernance <= 2 ? "Medium" : "Low",
      difficulty: input.budgetStaffCapacity <= 2 ? "Medium" : "Low",
      costEffort: input.budgetStaffCapacity <= 2 ? "Medium" : "Low",
      confidence: assessScenarioConfidence(inputQuality, [
        input.aiLiteracy,
        input.dataGovernance,
        input.budgetStaffCapacity,
      ]),
      bestFor:
        "Communities where AI literacy, governance awareness, or staff confidence is the weakest blocker.",
      rationale:
        "Best when people need confidence, common language, and clear limits before pilots scale.",
      color: "#2563eb",
    },
    {
      title: "Invest in infrastructure first",
      summary:
        "Strengthen connectivity, security, data systems, and support capacity before adoption.",
      projectedRange: toProjectedRange(
        result.overallScore,
        infrastructureImpact,
      ),
      impactRange: infrastructureImpact,
      risk: input.aiLiteracy <= 2 ? "Medium" : "Low",
      difficulty: input.budgetStaffCapacity <= 2 ? "High" : "Medium",
      costEffort: input.budgetStaffCapacity <= 2 ? "High" : "Medium",
      confidence: assessScenarioConfidence(inputQuality, [
        input.internetAccess,
        input.digitalInfrastructure,
        input.budgetStaffCapacity,
      ]),
      bestFor:
        "Communities where connectivity, systems, cybersecurity, or implementation capacity is the biggest constraint.",
      rationale:
        "Best when systems, access, or cybersecurity are the main blockers for responsible pilots.",
      color: "#0f766e",
    },
    {
      title: "Delay AI adoption for 3 years",
      summary:
        "Avoid near-term implementation while monitoring policy, vendor, and workforce changes.",
      projectedRange: toProjectedRange(result.overallScore, delayImpact),
      impactRange: delayImpact,
      risk: result.overallScore < 45 ? "Medium" : "High",
      difficulty: "Low",
      costEffort: "Low",
      confidence: assessScenarioConfidence(
        inputQuality,
        scoreFields.map((field) => input[field.key]),
      ),
      bestFor:
        "Communities with high-stakes safety, governance, or public accountability gaps that need review before pilots.",
      rationale:
        "Operationally simple, but it may widen capability gaps and reduce readiness for future funding.",
      color: "#c2410c",
    },
  ];
}

export function getRecommendedScenario(
  result: ReadinessResult,
  scenarios: Scenario[],
) {
  const primaryGap = result.topGaps[0]?.key;

  if (
    result.overallScore < 45 &&
    (primaryGap === "dataGovernance" ||
      primaryGap === "healthcareReadiness" ||
      primaryGap === "governmentReadiness")
  ) {
    return scenarios.find((scenario) =>
      scenario.title.startsWith("Delay AI adoption"),
    );
  }

  if (
    primaryGap === "internetAccess" ||
    primaryGap === "digitalInfrastructure" ||
    primaryGap === "budgetStaffCapacity"
  ) {
    return scenarios.find((scenario) =>
      scenario.title.startsWith("Invest in infrastructure"),
    );
  }

  return scenarios.find((scenario) =>
    scenario.title.startsWith("Invest in AI literacy"),
  );
}

export function buildRoadmap(
  input: CommunityInput,
  result: ReadinessResult,
): RoadmapPhase[] {
  const primaryGap = result.topGaps[0]?.label.toLowerCase() ?? "readiness";
  const communityLabel = input.communityType.toLowerCase();

  return [
    {
      window: "0-3 months",
      phase: "Phase 1",
      focus: "Awareness, policy basics, and data review",
      actions: [
        `Host AI awareness briefings for ${communityLabel} leaders and implementation teams.`,
        "Adopt interim principles for human review, transparency, privacy, accessibility, and appeal.",
        `Review datasets, vendors, and workflows connected to the leading gap: ${primaryGap}.`,
      ],
      outcome:
        "A shared readiness baseline, initial policy guardrails, and a short list of safe pilot candidates.",
    },
    {
      window: "3-12 months",
      phase: "Phase 2",
      focus: "Training, pilot projects, and governance process",
      actions: [
        "Run role-based training for staff, partners, and community reviewers.",
        "Launch one or two narrow pilots with clear success metrics and opt-out or appeal paths.",
        "Create a governance cadence for data quality checks, risk review, documentation, and feedback.",
      ],
      outcome:
        "Evidence from controlled pilots, stronger staff capability, and repeatable oversight routines.",
    },
    {
      window: "12-24 months",
      phase: "Phase 3",
      focus: "Scaling, monitoring, evaluation, and responsible AI updates",
      actions: [
        "Scale only pilots that show measurable benefit, equity, safety, and operational reliability.",
        "Monitor outcomes across demographic, geographic, accessibility, and service-delivery dimensions.",
        "Update responsible AI policies as laws, community expectations, and model capabilities change.",
      ],
      outcome:
        "A sustainable adoption program with monitoring, evaluation, community feedback, and improvement loops.",
    },
  ];
}

interface InputQuality {
  profileComplete: boolean;
  neutralCount: number;
  maxRepeatedCount: number;
}

function getInputQuality(input: CommunityInput): InputQuality {
  const scores = scoreFields.map((field) => input[field.key]);
  const frequency = scores.reduce<Record<number, number>>((counts, score) => {
    counts[score] = (counts[score] ?? 0) + 1;
    return counts;
  }, {});

  return {
    profileComplete:
      input.communityName.trim().length > 0 &&
      input.regionCountry.trim().length > 0,
    neutralCount: scores.filter((score) => score === 3).length,
    maxRepeatedCount: Math.max(...Object.values(frequency)),
  };
}

function assessOverallConfidence(
  inputQuality: InputQuality,
): ConfidenceAssessment {
  if (!inputQuality.profileComplete) {
    return {
      level: "Low",
      reason:
        "The profile is missing community or region context, so reviewers should treat the score as a draft estimate.",
    };
  }

  if (inputQuality.maxRepeatedCount >= 8) {
    return {
      level: "Low",
      reason:
        "Most scores use the same value, which may indicate a coarse assessment rather than evidence-backed inputs.",
    };
  }

  if (inputQuality.neutralCount >= 5) {
    return {
      level: "Medium",
      reason:
        "The profile is complete, but several inputs sit at the midpoint and should be validated with local evidence.",
    };
  }

  return {
    level: "High",
    reason:
      "The profile is complete and the scores are differentiated across readiness areas, though human review is still required.",
  };
}

function assessScoreConfidence(
  score: number,
  inputQuality: InputQuality,
): ConfidenceAssessment {
  if (!inputQuality.profileComplete) {
    return {
      level: "Low",
      reason:
        "Community or region context is incomplete, so this score needs reviewer validation.",
    };
  }

  if (inputQuality.maxRepeatedCount >= 8) {
    return {
      level: "Low",
      reason:
        "Many inputs repeat the same value, which lowers confidence in individual score precision.",
    };
  }

  if (Math.abs(score - 3) <= 0.5 || inputQuality.neutralCount >= 5) {
    return {
      level: "Medium",
      reason:
        "The input is complete, but midpoint or clustered ratings should be checked against local evidence.",
    };
  }

  return {
    level: "High",
    reason:
      "The input is complete and this rating is differentiated enough to support planning discussion.",
  };
}

function assessScenarioConfidence(
  inputQuality: InputQuality,
  scenarioScores: number[],
): ConfidenceAssessment {
  if (!inputQuality.profileComplete || inputQuality.maxRepeatedCount >= 8) {
    return {
      level: "Low",
      reason:
        "Scenario estimates depend on inputs that are incomplete or too uniform to support strong confidence.",
    };
  }

  if (
    inputQuality.neutralCount >= 5 ||
    scenarioScores.some((score) => Math.abs(score - 3) <= 0.5)
  ) {
    return {
      level: "Medium",
      reason:
        "The estimate uses complete inputs, but several relevant ratings are midpoint values that need evidence review.",
    };
  }

  return {
    level: "High",
    reason:
      "The estimate is based on complete and differentiated inputs, with uncertainty still shown as a range.",
  };
}

function toRange(center: number, lowerSpread: number, upperSpread: number) {
  return {
    min: Math.round(center - lowerSpread),
    max: Math.round(center + upperSpread),
  };
}

function toProjectedRange(score: number, impactRange: PointRange) {
  return {
    min: clampScore(score + impactRange.min),
    max: clampScore(score + impactRange.max),
  };
}

function getReadinessBand(score: number): ReadinessBand {
  if (score < 45) {
    return {
      label: "Emerging",
      summary: "Foundational work is needed before broad AI adoption.",
      color: "#c2410c",
    };
  }

  if (score < 65) {
    return {
      label: "Developing",
      summary: "Promising readiness exists, but several safeguards need attention.",
      color: "#ca8a04",
    };
  }

  if (score < 82) {
    return {
      label: "Ready",
      summary: "The community can begin focused pilots with strong oversight.",
      color: "#0f766e",
    };
  }

  return {
    label: "Advanced",
    summary: "The community is positioned for scaled, monitored AI adoption.",
    color: "#2563eb",
  };
}

function getGapStatus(score: number): Gap["status"] {
  if (score <= 2) {
    return "Critical gap";
  }

  if (score === 3) {
    return "Needs attention";
  }

  return "Monitor";
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}
