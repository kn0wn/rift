import { AppLogo } from "@/components/ui/icons/svg-icons";
import NavbarAuthButtons from "./navbar-auth-buttons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:bg-popover-main/80 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <AppLogo className="h-8 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle size="md" />
            <NavbarAuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
