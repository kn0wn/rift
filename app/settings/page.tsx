import { 
  SettingsSection, 
  StatusBadge, 
  SettingRow, 
  OrganizationIcon, 
  SettingsInput, 
  SettingsDivider 
} from '@/components/settings';

export default function SettingsPage() {
  return (
    <div className="pt-12 pb-12 pl-12 pr-12 flex flex-col max-w-4xl min-w-[520px] w-full min-h-full box-border">
      {/* Header */}
      <h3 className="font-semibold text-xl leading-7 flex items-center mb-5">
        <button className="font-semibold text-left transition-transform duration-150 text-gray-500 hover:text-gray-700">
          Arisay's Workspace<span className="px-1">/</span>
        </button>
        Overview
      </h3>

      {/* Organization Icon Section */}
      <SettingsSection
        title="Organization Icon"
        description="Organization branding visible to all members."
      >
        <OrganizationIcon name="Arisay's Workspace" />
      </SettingsSection>

      <SettingsDivider />

      {/* Organization Name Section */}
      <SettingsSection
        title="Organization Name"
        description="The name of your organization visible to all members."
      >
        <SettingsInput
          defaultValue="Arisay's Workspace"
          maxLength={50}
        />
      </SettingsSection>

      <SettingsDivider />

      {/* Organization Policy Section */}
      <SettingsSection
        title="Organization Policy"
        description="Applies to all members authenticating to this organization."
      >
        <div className="space-y-4">
          <SettingRow label="Single Sign-On (SSO) for domain members">
            <StatusBadge status="not-required">Not required</StatusBadge>
          </SettingRow>
          
          <SettingRow label="Single Sign-On (SSO) for guest members">
            <StatusBadge status="not-required">Not required</StatusBadge>
          </SettingRow>
          
          <SettingRow label="Multi-Factor Authentication">
            <StatusBadge status="not-required">Not required</StatusBadge>
          </SettingRow>
        </div>
      </SettingsSection>

      <SettingsDivider />

      {/* Directory Sync Section */}
      <SettingsSection
        title="Directory Sync"
        description="Manage user provisioning and synchronization settings."
      >
        <div className="space-y-4">
          <SettingRow label="Directory Sync">
            <StatusBadge status="enabled">Enable</StatusBadge>
          </SettingRow>
          
          <SettingRow label="Just-in-time provisioning">
            <StatusBadge status="disabled">Disable</StatusBadge>
          </SettingRow>
        </div>
      </SettingsSection>

      <SettingsDivider />

      {/* Organization Stats Section */}
      <SettingsSection
        title="Organization Statistics"
        description="Current organization usage and member count."
      >
        <div className="space-y-4">
          <SettingRow label="Total Users">
            <span className="text-sm font-semibold text-gray-900">1,247</span>
          </SettingRow>
        </div>
      </SettingsSection>
    </div>
  );
}
