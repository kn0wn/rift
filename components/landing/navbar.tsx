import Link from "next/link";
import { Button } from "@/components/ai/ui/button";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">LOOP</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Pricing
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Login
            </Link>
            <Link href="/sign-up">
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
