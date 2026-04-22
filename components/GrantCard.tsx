import Link from "next/link";
import type { Grant } from "@/lib/types";

interface GrantCardProps {
  grant: Grant;
}

function formatValue(grant: Grant): string {
  if (grant.maxValue === 0) return "Free";
  if (grant.maxValue >= 100000)
    return `Up to €${(grant.maxValue / 1000).toFixed(0)}k`;
  if (grant.maxValue >= 1000)
    return `Up to €${(grant.maxValue / 1000).toFixed(0)}k`;
  return `Up to €${grant.maxValue.toLocaleString()}`;
}

function valueColor(grant: Grant): string {
  if (grant.maxValue === 0) return "bg-green-100 text-green-800";
  if (grant.maxValue >= 30000) return "bg-teal-100 text-teal-800";
  if (grant.maxValue >= 10000) return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-700";
}

export default function GrantCard({ grant }: GrantCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            {grant.provider}
          </p>
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {grant.name}
          </h3>
        </div>
        <span
          className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${valueColor(grant)}`}
        >
          {formatValue(grant)}
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
        {grant.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {grant.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/grants/${grant.id}`}
        className="mt-1 inline-flex items-center justify-center text-sm font-medium text-teal-700 border border-teal-200 rounded-lg px-4 py-2 hover:bg-teal-50 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
