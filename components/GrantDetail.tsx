import Link from "next/link";
import type { Grant } from "@/lib/types";

interface GrantDetailProps {
  grant: Grant;
}

function formatValue(grant: Grant): string {
  if (grant.maxValue === 0) return "Free";
  return `Up to €${grant.maxValue.toLocaleString()}`;
}

export default function GrantDetail({ grant }: GrantDetailProps) {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/grants"
        className="text-sm text-gray-500 hover:text-teal-700 transition-colors mb-6 inline-block"
      >
        ← All grants
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-teal-700 mb-1">
              {grant.provider}
            </p>
            <h1 className="text-2xl font-bold text-gray-900">{grant.name}</h1>
          </div>
          <span className="text-lg font-bold text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
            {formatValue(grant)}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Grant value:</span> {grant.valueSummary}
        </p>

        <p className="text-gray-700 leading-relaxed mt-4 mb-6">
          {grant.description}
        </p>

        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Key Requirements
          </h2>
          <ul className="space-y-2">
            {grant.keyRequirements.map((req, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-teal-600 font-bold mt-0.5 shrink-0">
                  ✓
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Applies to
          </h2>
          <div className="flex flex-wrap gap-2">
            {grant.eligibleBuyerType.map((bt) => (
              <span
                key={bt}
                className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full capitalize"
              >
                {bt.replace(/-/g, " ")}
              </span>
            ))}
            {grant.eligiblePropertyType.map((pt) => (
              <span
                key={pt}
                className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full capitalize"
              >
                {pt.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <a
            href={grant.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-5 py-3 bg-teal-700 text-white text-sm font-semibold rounded-xl hover:bg-teal-800 transition-colors"
          >
            Apply Now →
          </a>
          <a
            href={grant.moreInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-5 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            More Information
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Last verified: {grant.lastVerified}. Always confirm details with the
          scheme provider before applying.
        </p>
      </div>
    </article>
  );
}
