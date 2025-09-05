import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import Link from 'next/link';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto relative">
        {/* Close button - positioned absolutely in top right */}
        <div className="absolute top-4 right-4 z-10">
          <Link 
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background-settings border shadow-container-small-n hover:bg-hover"
            title="Close Settings"
          >
            <svg 
              className="w-5 h-5 text-gray-500 group-hover:text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
