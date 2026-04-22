import Link from "next/link";
import GrantCard from "@/components/GrantCard";
import grantsData from "@/data/grants.json";
import type { Grant } from "@/lib/types";

const grants = grantsData as Grant[];
const featuredGrants = grants.slice(0, 3);

const steps = [
  {
    step: "1",
    title: "Tell us about yourself",
    description: "First-time buyer, homeowner, or something else?",
  },
  {
    step: "2",
    title: "What do you want to do?",
    description: "Buy, renovate, retrofit, solar — pick all that apply.",
  },
  {
    step: "3",
    title: "See your grants",
    description: "We show every grant you're eligible for, with details.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-teal-700 text-white py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-200 text-sm font-medium uppercase tracking-widest mb-4">
            Ireland&apos;s Housing Grant Finder
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
            Find every grant you&apos;re entitled to
          </h1>
          <p className="text-teal-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Grant information is scattered across SEAI, gov.ie, Revenue and
            local councils. We bring it all together so you don&apos;t have to.
          </p>
          <Link
            href="/finder"
            className="inline-block bg-white text-teal-800 font-bold text-base px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
          >
            Find my grants →
          </Link>
          <p className="mt-4 text-teal-200 text-sm">
            Takes under 2 minutes · Free · No sign-up needed
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50"
              >
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center text-lg font-bold mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Some of the grants available
            </h2>
            <Link
              href="/grants"
              className="text-sm text-teal-700 font-medium hover:underline"
            >
              See all {grants.length} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Not sure where to start?
          </h2>
          <p className="text-gray-500 mb-6">
            Answer three quick questions and we&apos;ll show you every grant
            that applies to your situation — including ones you might not have
            heard of.
          </p>
          <Link
            href="/finder"
            className="inline-block bg-teal-700 text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-teal-800 transition-colors"
          >
            Find my grants →
          </Link>
        </div>
      </section>
    </>
  );
}
