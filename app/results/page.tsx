import Link from "next/link";
import GrantCard from "@/components/GrantCard";
import grantsData from "@/data/grants.json";
import { filterGrants, parseFiltersFromParams } from "@/lib/filterGrants";
import type { Grant } from "@/lib/types";
import type { Metadata } from "next";

const allGrants = grantsData as Grant[];

interface ResultsPageProps {
  searchParams: Promise<{ buyerType?: string; intents?: string; propertyType?: string }>;
}

export const metadata: Metadata = {
  title: "Your Grant Results — housinggrants.ie",
};

const buyerTypeLabels: Record<string, string> = {
  "first-time-buyer": "First-time buyer",
  "second-time-buyer": "Second-time buyer / mover",
  "existing-homeowner": "Existing homeowner",
  landlord: "Landlord / investor",
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const filters = parseFiltersFromParams(params);
  const results = filterGrants(allGrants, filters);

  const hasFilters =
    filters.buyerType || filters.intents.length > 0 || filters.propertyType;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/finder"
            className="text-sm text-gray-500 hover:text-teal-700 transition-colors"
          >
            ← Adjust filters
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">
            {results.length} grant{results.length !== 1 ? "s" : ""} found
          </h1>

          {hasFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {filters.buyerType && (
                <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full">
                  {buyerTypeLabels[filters.buyerType] ?? filters.buyerType}
                </span>
              )}
              {filters.intents.map((intent) => (
                <span
                  key={intent}
                  className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full capitalize"
                >
                  {intent.replace(/-/g, " ")}
                </span>
              ))}
              {filters.propertyType && (
                <span className="text-xs bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-full capitalize">
                  {filters.propertyType.replace(/-/g, " ")}
                </span>
              )}
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No grants matched your filters
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Try adjusting your answers — some combinations have limited
              coverage.
            </p>
            <Link
              href="/finder"
              className="inline-block bg-teal-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-teal-800 transition-colors"
            >
              Try different filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((grant) => (
                <GrantCard key={grant.id} grant={grant} />
              ))}
            </div>

            <div className="mt-10 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <strong>Tip:</strong> These results are based on your answers.
              Always check the full eligibility criteria on the official scheme
              website before applying.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
