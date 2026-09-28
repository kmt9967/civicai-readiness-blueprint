# CivicAI Readiness Blueprint

**Finalist — USAII Global AI Hackathon 2026**

A decision-support dashboard that helps a community work out how ready it is for AI, and what a responsible first step looks like. It combines transparent local scoring, gap analysis, scenario comparison and a three-phase roadmap, plus an optional AI policy insight.

- **Live demo:** https://civicai-readiness-blueprint.vercel.app
- **Hackathon submission (Devpost):** https://devpost.com/software/civicai-readiness-blueprint
- **Portfolio case study:** https://talalkhawaja.com/projects/civicai-readiness-blueprint
- **Team:** Aqeela Urooj and Talal Khawaja (Teqprotech)

## Problem

Cities, nonprofit coalitions, workforce agencies and education or healthcare networks are being asked to "adopt AI", but few have a shared way to judge their readiness across access, literacy, infrastructure, data governance and staff capacity. Without that view, the loudest use case tends to win, and the pilot fails on a gap nobody measured.

## What it does

1. **Community profile.** Name, region and type: city, nonprofit coalition, workforce agency, education network, healthcare network or local government.
2. **Ten readiness areas.** Internet access, AI literacy, digital infrastructure, data governance, workforce, education, healthcare, government and nonprofit readiness, and budget and staff capacity.
3. **Transparent scoring.** Deterministic code turns the inputs into an overall score and a readiness band (Emerging, Developing, Ready or Advanced), each with a confidence level and the reason for it.
4. **Gaps and priority actions.** The weakest areas are marked as critical, needing attention or to monitor, and each links to a concrete action, such as launching role-based AI literacy sessions or setting up a lightweight data-governance process.
5. **Scenario comparison.** Three options are compared on impact range, risk, difficulty and effort: invest in AI literacy now, invest in infrastructure first, or delay adoption.
6. **Roadmap.** Three phases: 0–3 months, 3–12 months and 12–24 months.
7. **Optional AI policy insight.** A server-side route sends the scores, gaps, scenarios and roadmap summary to the OpenAI Responses API with a strict JSON schema. It returns an executive insight, top risks, a recommended scenario with reasoning, a human-review plan, data limitations and next actions.
8. **Responsible-AI guardrails.** The AI output is labelled as advisory, and the roadmap keeps human review points in the loop.

## Design decisions

- **Scoring doesn't depend on the model.** Scores, gaps, scenarios and the roadmap come from local logic in `lib/readiness.ts`. If no API key is set, or the call fails, the app says the AI insight is unavailable and everything else keeps working.
- **Advisory, not authoritative.** The model never produces the scores. It only comments on them, in a fixed schema.
- **Ranges over false precision.** Scenario impact is shown as a range with a confidence rating.

## Architecture

```
Browser (Next.js App Router, React 19)
 ├─ components/community-input-form.tsx   profile + 10 readiness inputs
 ├─ lib/readiness.ts                      deterministic scoring, gaps, actions, scenarios, roadmap
 ├─ components/readiness-charts.tsx       Recharts score views
 └─ components/ai-policy-insight.tsx      requests the optional insight
        │
        ▼
app/api/insight/route.ts (Node runtime)
 └─ OpenAI Responses API, strict JSON schema → falls back to a clear "unavailable" message
```

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Recharts, lucide-react and the OpenAI Node SDK. Deployed on Vercel.

## Setup

Requirements: Node.js 20 or newer. An OpenAI API key is optional; without one the dashboard still works and the AI insight panel shows its fallback message.

```bash
npm ci
cp .env.example .env.local   # Windows: copy .env.example .env.local
# optional: set OPENAI_API_KEY (and OPENAI_MODEL) in .env.local
npm run dev
```

Open http://localhost:3000.

| Variable | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | No | Enables the AI policy insight (server-side only) |
| `OPENAI_MODEL` | No | Overrides the model used by `/api/insight` |

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Usage

Fill in the community profile, rate the ten areas, and read the results from top to bottom: band and confidence, top gaps and actions, the scenario comparison, then the roadmap. Select the AI insight button for an advisory summary.

## Hackathon submission

Built by Aqeela Urooj and Talal Khawaja (Teqprotech) for the USAII Global AI Hackathon 2026 on Devpost, where the project was named a finalist. Submission: https://devpost.com/software/civicai-readiness-blueprint

## License

No license file has been added yet, so all rights are reserved by the authors for now.
