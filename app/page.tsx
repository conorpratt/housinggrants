import Link from "next/link";
import { UserCheck, SlidersHorizontal, Banknote } from "lucide-react";
import GrantCard from "@/components/GrantCard";
import grantsData from "@/data/grants.json";
import type { Grant } from "@/lib/types";

const grants = grantsData as Grant[];
const featuredGrants = grants.slice(2, 5);

const steps = [
  {
    icon: UserCheck,
    title: "Tell us about yourself",
    description: "First-time buyer, existing homeowner, or somewhere in between.",
  },
  {
    icon: SlidersHorizontal,
    title: "What do you want to do?",
    description: "Buy, renovate, retrofit, solar — pick everything that applies.",
  },
  {
    icon: Banknote,
    title: "See your grants",
    description: "Every grant you qualify for, with amounts and how to apply.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden min-h-[520px] flex items-center"
        style={{ backgroundImage: "url('/images/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/90 via-teal-900/80 to-teal-700/60" />
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center py-28 sm:py-36 px-4 text-white">
          <p className="text-teal-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Ireland&apos;s Housing Grant Finder
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Find every grant<br className="hidden sm:block" /> you&apos;re entitled to
          </h1>
          <p className="text-teal-100/90 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Grant information is scattered across SEAI, gov.ie, Revenue and local
            councils. We bring it all together so you don&apos;t have to.
          </p>
          <Link
            href="/finder"
            className="inline-block bg-white text-teal-900 font-bold text-base px-9 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-xl shadow-teal-950/30"
          >
            Find my grants →
          </Link>
          <p className="mt-5 text-teal-300 text-sm">
            Takes under 2 minutes · Free · No sign-up needed
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-2xl mx-auto grid grid-cols-3 divide-x divide-gray-100 text-center">
          <div className="px-4">
            <p className="text-2xl font-extrabold text-teal-700">{grants.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">grants tracked</p>
          </div>
          <div className="px-4">
            <p className="text-2xl font-extrabold text-gray-900">2025</p>
            <p className="text-xs text-gray-500 mt-0.5">last updated</p>
          </div>
          <div className="px-4">
            <p className="text-2xl font-extrabold text-green-600">Free</p>
            <p className="text-xs text-gray-500 mt-0.5">always</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            How it works
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">Three questions. Two minutes. Done.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-7 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-teal-700" />
                  </div>
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">
                    Step {i + 1}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured grants */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular grants</h2>
              <p className="text-sm text-gray-500 mt-1">A sample of what&apos;s available — use the finder to see yours.</p>
            </div>
            <Link
              href="/grants"
              className="shrink-0 text-sm font-semibold text-teal-700 hover:underline"
            >
              All {grants.length} grants →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-teal-700 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Not sure where to start?</h2>
          <p className="text-teal-100 mb-8 leading-relaxed">
            Answer three quick questions and we&apos;ll show you every grant that
            applies to your situation — including ones you might not have heard of.
          </p>
          <Link
            href="/finder"
            className="inline-block bg-white text-teal-900 font-bold text-base px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
          >
            Find my grants →
          </Link>
        </div>
      </section>
    </>
  );
}
