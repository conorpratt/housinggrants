import Link from "next/link";
import GrantCalculator from "@/components/GrantCalculator";
import grantsData from "@/data/grants.json";
import { filterGrants, parseFiltersFromParams, buildResultsUrl } from "@/lib/filterGrants";
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
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const filters = parseFiltersFromParams(params);
  const results = filterGrants(allGrants, filters);

  const isRenovateSecondHandGap =
    results.length === 0 &&
    filters.intents.includes("renovate") &&
    filters.propertyType === "second-hand";

  const energyIntents = ["heat-pump", "solar", "retrofit", "insulation", "windows-doors"];
  const isFirstTimeBuyerEnergyGap =
    results.length === 0 &&
    (filters.buyerType === "first-time-buyer" || filters.buyerType === "second-time-buyer") &&
    filters.intents.some((i) => energyIntents.includes(i));

  const vacantSuggestionUrl = buildResultsUrl({ ...filters, propertyType: "vacant" });
  const existingOwnerSuggestionUrl = buildResultsUrl({ ...filters, buyerType: "existing-homeowner" });

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
          isRenovateSecondHandGap ? (
            <div className="max-w-xl py-12">
              <p className="text-4xl mb-4">🏚️</p>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                No renovation grants for standard second-hand homes
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                There is currently no government grant specifically for renovating a standard second-hand home in Ireland. The schemes that exist target vacant or derelict properties, or energy upgrades for existing homeowners.
              </p>
              <div className="space-y-3 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-blue-900 mb-1">If the property has been vacant for 2+ years</p>
                  <p className="text-blue-700 mb-2">The Vacant Property Refurbishment Grant (up to €70,000) and the Croí Cónaithe scheme may apply.</p>
                  <Link href={vacantSuggestionUrl} className="font-medium text-blue-800 hover:underline">
                    See grants for vacant properties →
                  </Link>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-teal-900 mb-1">Once you own the home</p>
                  <p className="text-teal-700 mb-2">SEAI energy grants cover insulation, heat pumps, solar panels, and window upgrades — available to existing homeowners.</p>
                  <Link href="/results?buyerType=existing-homeowner&intents=retrofit,insulation,heat-pump,solar,windows-doors" className="font-medium text-teal-800 hover:underline">
                    See SEAI energy grants →
                  </Link>
                </div>
              </div>
              <Link
                href="/finder"
                className="inline-block bg-teal-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-teal-800 transition-colors text-sm"
              >
                ← Adjust filters
              </Link>
            </div>
          ) : isFirstTimeBuyerEnergyGap ? (
            <div className="max-w-xl py-12">
              <p className="text-4xl mb-4">⚡</p>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                These grants are for existing homeowners
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                SEAI energy grants (insulation, heat pumps, solar, windows) can only be applied for after you own and live in the property. You cannot apply during the purchase process — but bookmark this for later.
              </p>
              <div className="space-y-3 mb-8">
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-teal-900 mb-1">Come back after you move in</p>
                  <p className="text-teal-700 mb-2">Once you own the home, search as an &ldquo;Existing homeowner&rdquo; to see all available energy upgrade grants.</p>
                  <Link href={existingOwnerSuggestionUrl} className="font-medium text-teal-800 hover:underline">
                    See grants for existing homeowners →
                  </Link>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-blue-900 mb-1">Grants available to you now</p>
                  <p className="text-blue-700 mb-2">There are purchase grants and mortgage supports available for first and second-time buyers right now.</p>
                  <Link
                    href={buildResultsUrl({ buyerType: filters.buyerType, intents: ["buy"], propertyType: "" })}
                    className="font-medium text-blue-800 hover:underline"
                  >
                    See buying grants →
                  </Link>
                </div>
              </div>
              <Link
                href="/finder"
                className="inline-block bg-teal-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-teal-800 transition-colors text-sm"
              >
                ← Adjust filters
              </Link>
            </div>
          ) : (
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
          )
        ) : (
          <>
            <GrantCalculator grants={results} />

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
