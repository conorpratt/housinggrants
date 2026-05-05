"use client";

import { useState } from "react";
import Link from "next/link";
import type { Grant } from "@/lib/types";

interface Props {
  grants: Grant[];
}

function formatValue(grant: Grant): string {
  if (grant.maxValue === 0) return "Free";
  if (grant.maxValue >= 1000) return `€${(grant.maxValue / 1000).toFixed(0)}k`;
  return `€${grant.maxValue.toLocaleString()}`;
}

function formatTotal(total: number): string {
  if (total >= 1_000_000) return `€${(total / 1_000_000).toFixed(2)}m`;
  if (total >= 1000) return `€${(total / 1000).toFixed(0)}k`;
  return `€${total.toLocaleString()}`;
}

function accentClasses(grant: Grant): { border: string; badge: string } {
  const cats = grant.category;
  if (cats.includes("buy")) {
    return { border: "border-t-blue-500", badge: "bg-blue-50 text-blue-700" };
  }
  if (cats.some((c) => ["renovate", "vacant"].includes(c))) {
    return { border: "border-t-amber-500", badge: "bg-amber-50 text-amber-700" };
  }
  return { border: "border-t-teal-500", badge: "bg-teal-50 text-teal-700" };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IE", { month: "short", year: "numeric" });
}

export default function GrantCalculator({ grants }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selectedGrants = grants.filter((g) => selected.has(g.id));
  const total = selectedGrants.reduce((sum, g) => sum + g.maxValue, 0);
  const hasCashValue = selectedGrants.some((g) => g.maxValue > 0);

  return (
    <div className="pb-36">
      <p className="text-sm text-gray-500 mb-5">
        Tick the grants you plan to apply for — we&rsquo;ll add up your potential total.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {grants.map((grant) => {
          const { border, badge } = accentClasses(grant);
          const isChecked = selected.has(grant.id);

          return (
            <div
              key={grant.id}
              onClick={() => toggle(grant.id)}
              className={`relative bg-white rounded-xl border border-gray-200 border-t-4 ${border} p-5 flex flex-col cursor-pointer transition-all
                ${isChecked ? "ring-2 ring-teal-500 shadow-md" : "hover:shadow-md"}`}
            >
              {/* Checkbox */}
              <div className="absolute top-4 right-4">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                    ${isChecked ? "bg-teal-600 border-teal-600" : "border-gray-300 bg-white"}`}
                >
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 mr-8 ${badge}`}>
                {grant.provider}
              </span>

              <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 pr-6">
                {grant.name}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
                {grant.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-end justify-between gap-2">
                <div>
                  {grant.maxValue !== 0 && (
                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Up to</p>
                  )}
                  <p className={`text-2xl font-extrabold leading-none ${grant.maxValue === 0 ? "text-green-600" : "text-gray-900"}`}>
                    {formatValue(grant)}
                  </p>
                </div>
                <Link
                  href={`/grants/${grant.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 text-sm font-semibold text-teal-700 border border-teal-200 rounded-lg px-3 py-2 hover:bg-teal-50 transition-colors"
                >
                  Details →
                </Link>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Verified {formatDate(grant.lastVerified)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sticky total bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300
          ${selected.size > 0 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="bg-gray-900 text-white px-4 py-4 shadow-2xl">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-300">
                {selected.size} grant{selected.size !== 1 ? "s" : ""} selected
              </p>
              {hasCashValue && (
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 text-sm">Potential total:</span>
                  <span className="text-2xl font-extrabold text-teal-400">{formatTotal(total)}</span>
                </div>
              )}
              {!hasCashValue && selected.size > 0 && (
                <span className="text-sm text-gray-300">Free schemes selected</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-500 max-w-xs hidden sm:block">
                Values are maximums — actual awards depend on eligibility.
              </p>
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs text-gray-400 hover:text-white transition-colors underline"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
