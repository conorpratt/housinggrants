"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FilterState, BuyerType, GrantCategory, PropertyType } from "@/lib/types";
import { buildResultsUrl } from "@/lib/filterGrants";
import categories from "@/data/categories.json";

const buyerTypes: { id: BuyerType; label: string; description: string; icon: string }[] = [
  {
    id: "first-time-buyer",
    label: "First-time buyer",
    description: "I have never owned a home before",
    icon: "🔑",
  },
  {
    id: "second-time-buyer",
    label: "Second-time buyer / mover",
    description: "I have owned a home before and am moving",
    icon: "🏡",
  },
  {
    id: "existing-homeowner",
    label: "Existing homeowner",
    description: "I already own and live in a home",
    icon: "🏠",
  },
];

const propertyTypes: { id: PropertyType; label: string; description: string; icon: string }[] = [
  { id: "new-build", label: "New build", description: "Buying off plans or from a developer", icon: "🏗️" },
  { id: "second-hand", label: "Second-hand", description: "An existing lived-in property", icon: "🏘️" },
  { id: "vacant", label: "Vacant property", description: "Empty for 2+ years", icon: "🏚️" },
  { id: "derelict", label: "Derelict property", description: "Run-down or uninhabitable", icon: "🪨" },
];

const TOTAL_STEPS = 3;

export default function FilterWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    buyerType: "",
    intents: [],
    propertyType: "",
  });

  function handleBuyerType(id: BuyerType) {
    setFilters((f) => ({ ...f, buyerType: id }));
  }

  function handleIntent(id: GrantCategory) {
    setFilters((f) => ({
      ...f,
      intents: f.intents.includes(id)
        ? f.intents.filter((i) => i !== id)
        : [...f.intents, id],
    }));
  }

  function handlePropertyType(id: PropertyType) {
    setFilters((f) => ({
      ...f,
      propertyType: f.propertyType === id ? "" : id,
    }));
  }

  function handleSubmit() {
    router.push(buildResultsUrl(filters));
  }

  function canProceed(): boolean {
    if (step === 1) return filters.buyerType !== "";
    return true;
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                i + 1 < step
                  ? "bg-teal-700 text-white"
                  : i + 1 === step
                  ? "bg-teal-700 text-white ring-4 ring-teal-100"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i + 1 < step ? "✓" : i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div
                className={`h-0.5 flex-1 rounded transition-all ${
                  i + 1 < step ? "bg-teal-700" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Who are you? */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Who are you?</h2>
          <p className="text-gray-500 text-sm mb-6">
            This helps us filter out grants that don&apos;t apply to your situation.
          </p>
          <div className="space-y-3">
            {buyerTypes.map((bt) => {
              const selected = filters.buyerType === bt.id;
              return (
                <button
                  key={bt.id}
                  onClick={() => handleBuyerType(bt.id)}
                  className={`w-full text-left px-5 py-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selected
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl shrink-0">{bt.icon}</span>
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm ${selected ? "text-teal-800" : "text-gray-900"}`}>
                      {bt.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{bt.description}</p>
                  </div>
                  {selected && <span className="ml-auto text-teal-600 font-bold text-lg shrink-0">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2 — What do you want to do? */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">What are you looking to do?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Select all that apply — you can pick more than one.
          </p>
          <div className="space-y-3">
            {categories.map((cat) => {
              const selected = filters.intents.includes(cat.id as GrantCategory);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleIntent(cat.id as GrantCategory)}
                  className={`w-full text-left px-5 py-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selected
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl shrink-0">{cat.icon}</span>
                  <span className={`font-semibold text-sm ${selected ? "text-teal-800" : "text-gray-900"}`}>
                    {cat.label}
                  </span>
                  {selected && <span className="ml-auto text-teal-600 font-bold text-lg shrink-0">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3 — Property type */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">What type of property?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Optional — skip if you&apos;re not sure yet.
          </p>
          <div className="space-y-3">
            {propertyTypes.map((pt) => {
              const selected = filters.propertyType === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => handlePropertyType(pt.id)}
                  className={`w-full text-left px-5 py-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selected
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl shrink-0">{pt.icon}</span>
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm ${selected ? "text-teal-800" : "text-gray-900"}`}>
                      {pt.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{pt.description}</p>
                  </div>
                  {selected && <span className="ml-auto text-teal-600 font-bold text-lg shrink-0">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        <p className="text-xs text-gray-400 font-medium">Step {step} of {TOTAL_STEPS}</p>

        {step < TOTAL_STEPS ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="px-6 py-3 bg-teal-700 text-white text-sm font-semibold rounded-xl hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-teal-700 text-white text-sm font-semibold rounded-xl hover:bg-teal-800 transition-colors"
          >
            Show my grants →
          </button>
        )}
      </div>
    </div>
  );
}
