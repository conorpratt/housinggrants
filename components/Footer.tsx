import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-white font-semibold text-base mb-2">
              housinggrants.ie
            </p>
            <p className="text-sm text-gray-400">
              A free, independent guide to housing grants and schemes in
              Ireland.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Navigate</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/finder"
                  className="hover:text-white transition-colors"
                >
                  Find my grants
                </Link>
              </li>
              <li>
                <Link
                  href="/grants"
                  className="hover:text-white transition-colors"
                >
                  All grants
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">
              Official Sources
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.seai.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  SEAI
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.ie/en/organisation/department-of-housing-local-government-and-heritage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Dept. of Housing
                </a>
              </li>
              <li>
                <a
                  href="https://www.citizensinformation.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Citizens Information
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            housinggrants.ie is an independent information resource. Always
            verify grant details directly with the scheme provider before
            applying. Grant values, eligibility criteria, and availability are
            subject to change. Last data review: January 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}
