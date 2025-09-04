export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Overview</h1>
        <p className="text-gray-600 mb-8">
          Manage your workspace settings and preferences.
        </p>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Workspace Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workspace Name
              </label>
              <div className="text-sm text-gray-900">Arisay's Workspace</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Members
              </label>
              <div className="text-sm text-gray-900">1 member</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-900">Business Monthly</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  TRIAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
