import Link from "next/link";
import type { Grant } from "@/lib/types";

interface GrantCardProps {
  grant: Grant;
}

function formatValue(grant: Grant): string {
  if (grant.maxValue === 0) return "Free";
  if (grant.maxValue >= 1000) return `€${(grant.maxValue / 1000).toFixed(0)}k`;
  return `€${grant.maxValue.toLocaleString()}`;
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
  const d = new Date(iso);
  return d.toLocaleDateString("en-IE", { month: "short", year: "numeric" });
}

export default function GrantCard({ grant }: GrantCardProps) {
  const { border, badge } = accentClasses(grant);

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 border-t-4 ${border} p-5 flex flex-col hover:shadow-md transition-shadow`}
    >
      <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${badge}`}>
        {grant.provider}
      </span>

      <h3 className="text-base font-bold text-gray-900 leading-snug mb-2">
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
}
