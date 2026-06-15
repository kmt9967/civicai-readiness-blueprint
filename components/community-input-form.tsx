import { FormEvent, ReactNode } from "react";
import {
  Building2,
  ChevronDown,
  ClipboardList,
  Globe2,
  MapPin,
  PlayCircle,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import {
  communityTypes,
  scoreFields,
} from "@/lib/readiness";
import type {
  CommunityInput,
  CommunityType,
  ScoreKey,
} from "@/lib/readiness";

interface CommunityInputFormProps {
  input: CommunityInput;
  onTextChange: (
    field: "communityName" | "regionCountry" | "communityType",
    value: string,
  ) => void;
  onScoreChange: (field: ScoreKey, value: number) => void;
  onGenerate: (event: FormEvent<HTMLFormElement>) => void;
  onLoadSample: () => void;
}

export function CommunityInputForm({
  input,
  onTextChange,
  onScoreChange,
  onGenerate,
  onLoadSample,
}: CommunityInputFormProps) {
  return (
    <form
      className="no-print rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={onGenerate}
    >
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-50 text-teal-800">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800">
              Community input form
            </p>
            <h2 className="text-2xl font-semibold text-slate-950">
              Readiness profile
            </h2>
          </div>
        </div>
        <button
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-900 transition hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
          onClick={onLoadSample}
          type="button"
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          Demo Mode: Load sample community
        </button>
      </div>

      <div className="grid gap-4">
        <FieldShell
          icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
          label="Community name"
        >
          <input
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            onChange={(event) =>
              onTextChange("communityName", event.target.value)
            }
            placeholder="e.g. Riverbend Civic Coalition"
            value={input.communityName}
          />
        </FieldShell>

        <FieldShell
          icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
          label="Region/country"
        >
          <input
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            onChange={(event) =>
              onTextChange("regionCountry", event.target.value)
            }
            placeholder="e.g. United States"
            value={input.regionCountry}
          />
        </FieldShell>

        <FieldShell
          icon={<Globe2 className="h-4 w-4" aria-hidden="true" />}
          label="Community type"
        >
          <div className="relative">
            <select
              className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              onChange={(event) =>
                onTextChange(
                  "communityType",
                  event.target.value as CommunityType,
                )
              }
              value={input.communityType}
            >
              {communityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />
          </div>
        </FieldShell>
      </div>

      <div className="my-6 h-px bg-slate-200" />

      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-700">
          <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-950">Readiness scores</h3>
          <p className="text-sm text-slate-600">Use 1 for low and 5 for high.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {scoreFields.map((field) => (
          <ScoreSlider
            helper={field.helper}
            key={field.key}
            label={field.label}
            onChange={(value) => onScoreChange(field.key, value)}
            value={input[field.key]}
          />
        ))}
      </div>

      <button
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-100"
        type="submit"
      >
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        Generate Blueprint
      </button>
    </form>
  );
}

function FieldShell({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="text-slate-500">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function ScoreSlider({
  label,
  helper,
  value,
  onChange,
}: {
  label: string;
  helper: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="block text-sm font-semibold text-slate-900">
            {label}
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-600">
            {helper}
          </span>
        </span>
        <span className="grid h-9 min-w-9 place-items-center rounded-lg bg-white px-2 text-sm font-semibold text-slate-950 shadow-sm">
          {value}/5
        </span>
      </span>
      <input
        aria-label={`${label} score`}
        className="mt-4 w-full"
        max={5}
        min={1}
        onChange={(event) => onChange(Number(event.target.value))}
        step={1}
        type="range"
        value={value}
      />
      <span className="mt-2 grid grid-cols-5 text-center text-[11px] font-medium text-slate-500">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </span>
    </label>
  );
}
