import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  AI_INSIGHT_FALLBACK_MESSAGE,
  type AIInsight,
  type AIInsightRequest,
  type AIInsightResponse,
} from "@/lib/ai-insight";

export const runtime = "nodejs";

const DEFAULT_OPENAI_MODEL = "gpt-5.5";

const insightSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "executiveInsight",
    "whyAIIsNeeded",
    "topRisks",
    "recommendedScenario",
    "humanReviewPlan",
    "dataLimitations",
    "nextBestActions",
  ],
  properties: {
    executiveInsight: { type: "string" },
    whyAIIsNeeded: { type: "string" },
    topRisks: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
    recommendedScenario: {
      type: "object",
      additionalProperties: false,
      required: ["title", "reasoning"],
      properties: {
        title: { type: "string" },
        reasoning: { type: "string" },
      },
    },
    humanReviewPlan: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
    dataLimitations: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
    nextBestActions: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
  },
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: AI_INSIGHT_FALLBACK_MESSAGE },
      { status: 503 },
    );
  }

  let payload: AIInsightRequest;

  try {
    payload = (await request.json()) as AIInsightRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  try {
    const client = new OpenAI({ apiKey });
    const model = process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL;

    const response = await client.responses.create({
      model,
      instructions: buildInstructions(),
      input: JSON.stringify(payload, null, 2),
      max_output_tokens: 1400,
      store: false,
      text: {
        format: {
          type: "json_schema",
          name: "civic_ai_policy_insight",
          description:
            "Advisory policy insight for the CivicAI Readiness Blueprint prototype.",
          strict: true,
          schema: insightSchema,
        },
      },
    });

    const text = response.output_text;

    if (!text) {
      throw new Error("OpenAI response did not include output_text.");
    }

    const insight = normalizeInsight(JSON.parse(text));
    const body: AIInsightResponse = { insight };

    return NextResponse.json(body);
  } catch (error) {
    console.error("AI insight generation failed", error);

    return NextResponse.json(
      { error: AI_INSIGHT_FALLBACK_MESSAGE },
      { status: 502 },
    );
  }
}

function buildInstructions() {
  return [
    "You generate advisory AI readiness insights for a civic-tech dashboard.",
    "Use only the provided form values and calculated prototype results.",
    "Do not make final policy or funding decisions.",
    "Do not claim certainty.",
    "Explain uncertainty and tradeoffs.",
    "Keep outputs advisory.",
    "Mention that human review is required.",
    "Do not invent real statistics, benchmarks, citations, laws, or sources.",
    "Do not cite fake sources.",
    "Do not ask for personal, confidential, or sensitive data.",
    "Keep each field concise and specific to the provided community profile.",
  ].join("\n");
}

function normalizeInsight(value: unknown): AIInsight {
  if (!isRecord(value)) {
    throw new Error("Insight payload is not an object.");
  }

  const recommendedScenario = value.recommendedScenario;

  if (!isRecord(recommendedScenario)) {
    throw new Error("Missing recommendedScenario object.");
  }

  return {
    executiveInsight: readString(value.executiveInsight),
    whyAIIsNeeded: readString(value.whyAIIsNeeded),
    topRisks: readStringArray(value.topRisks, 3),
    recommendedScenario: {
      title: readString(recommendedScenario.title),
      reasoning: readString(recommendedScenario.reasoning),
    },
    humanReviewPlan: readStringArray(value.humanReviewPlan, 3),
    dataLimitations: readStringArray(value.dataLimitations, 3),
    nextBestActions: readStringArray(value.nextBestActions, 3),
  };
}

function readString(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Expected a non-empty string.");
  }

  return value.trim();
}

function readStringArray(value: unknown, expectedLength: number) {
  if (!Array.isArray(value) || value.length !== expectedLength) {
    throw new Error(`Expected an array of ${expectedLength} strings.`);
  }

  return value.map(readString);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
