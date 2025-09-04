import { SettingsSidebar } from "@/components/settings/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
