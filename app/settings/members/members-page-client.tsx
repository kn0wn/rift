import { 
  SettingsSection, 
  MembersTable
} from '@/components/settings';

export default function MembersPageClient() {
  return (
    <SettingsSection
      title="Legacy Members Table"
      description="This is the old members table component (kept for reference)."
    >
      <MembersTable
        members={[]}
        onEditMember={() => {}}
        onRemoveMember={() => {}}
      />
    </SettingsSection>
  );
}
