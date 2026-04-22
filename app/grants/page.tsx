import GrantCard from "@/components/GrantCard";
import grantsData from "@/data/grants.json";
import type { Grant } from "@/lib/types";
import type { Metadata } from "next";

const grants = grantsData as Grant[];

export const metadata: Metadata = {
  title: "All Housing Grants — housinggrants.ie",
  description:
    "Browse all 12 housing grants and schemes available in Ireland for homeowners and buyers.",
};

export default function GrantsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            All Housing Grants
          </h1>
          <p className="text-gray-500 text-sm">
            {grants.length} grants and schemes — browse everything available, or{" "}
            <a href="/finder" className="text-teal-700 font-medium hover:underline">
              use the finder
            </a>{" "}
            to see only what applies to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {grants.map((grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>
      </div>
    </div>
  );
}
