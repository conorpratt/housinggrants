import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-teal-700 tracking-tight"
        >
          housinggrants.ie
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/grants"
            className="text-sm text-gray-600 hover:text-teal-700 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            All Grants
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-teal-700 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            About
          </Link>
          <Link
            href="/finder"
            className="text-sm font-medium bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
          >
            Find my grants
          </Link>
        </nav>
      </div>
    </header>
  );
}
