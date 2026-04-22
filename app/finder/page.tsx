import FilterWizard from "@/components/FilterWizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find My Grants — housinggrants.ie",
  description:
    "Answer a few quick questions to find every housing grant and scheme available to you in Ireland.",
};

export default function FinderPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Find your grants
          </h1>
          <p className="text-gray-500 text-sm">
            3 quick questions to find every scheme that applies to you.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
          <FilterWizard />
        </div>
      </div>
    </div>
  );
}
