import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — housinggrants.ie",
  description:
    "About housinggrants.ie — an independent guide to housing grants and schemes in Ireland.",
};

const sources = [
  {
    name: "SEAI (Sustainable Energy Authority of Ireland)",
    url: "https://www.seai.ie/grants/home-energy-grants/",
  },
  {
    name: "Gov.ie — Housing schemes and grants",
    url: "https://www.gov.ie/en/collection/d8d7fe-housing-grants-and-schemes/",
  },
  {
    name: "Revenue — Help to Buy",
    url: "https://www.revenue.ie/en/property/help-to-buy-incentive/index.aspx",
  },
  {
    name: "Citizens Information — Housing",
    url: "https://www.citizensinformation.ie/en/housing/",
  },
  {
    name: "First Home Scheme",
    url: "https://www.firsthomescheme.ie/",
  },
  {
    name: "Local Authority Home Loan",
    url: "https://localauthorityhomeloan.ie/",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          About housinggrants.ie
        </h1>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-8">
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              What is this?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              housinggrants.ie is a free, independent tool to help Irish
              homeowners and buyers find housing grants and schemes they may be
              entitled to. Grant information in Ireland is spread across multiple
              government agencies, local authorities, and scheme-specific
              websites — this site brings it together in one place.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Is the information accurate?
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We aim to keep grant information as current as possible, but grant
              values, eligibility criteria, and availability can change without
              notice. Each grant shows a &quot;last verified&quot; date.{" "}
              <strong>
                Always verify details directly with the scheme provider before
                applying.
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Data sources
            </h2>
            <ul className="space-y-2">
              {sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-700 hover:underline"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Disclaimer
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed bg-amber-50 border border-amber-200 rounded-xl p-4">
              housinggrants.ie is an independent information resource. It is not
              affiliated with any government body, SEAI, Revenue, or any scheme
              provider. Always verify grant details directly with the scheme
              provider before applying. This site does not provide financial or
              legal advice.
            </p>
          </section>

          <div className="pt-2">
            <Link
              href="/finder"
              className="inline-block bg-teal-700 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-teal-800 transition-colors"
            >
              Find my grants →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
