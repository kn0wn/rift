export default function AppearancePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Appearance</h1>
        <p className="text-gray-600 mb-8">
          Customize the look and feel of your workspace.
        </p>

        <div className="space-y-8">
          {/* Theme Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Theme</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="border-2 border-blue-500 rounded-lg p-4 cursor-pointer">
                <div className="bg-white rounded border h-20 mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-100 rounded"></div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900">Light</h3>
                  <p className="text-sm text-gray-500">Default light theme</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                <div className="bg-gray-900 rounded border h-20 mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-700 rounded"></div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900">Dark</h3>
                  <p className="text-sm text-gray-500">Dark theme for low light</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                <div className="bg-gradient-to-br from-white to-gray-900 rounded border h-20 mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 rounded"></div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900">Auto</h3>
                  <p className="text-sm text-gray-500">Follow system preference</p>
                </div>
              </div>
            </div>
          </div>

          {/* Color Scheme */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Accent Color</h2>
            <div className="grid grid-cols-8 gap-3">
              <button className="w-8 h-8 rounded-full bg-blue-500 ring-2 ring-blue-500 ring-offset-2"></button>
              <button className="w-8 h-8 rounded-full bg-green-500 hover:ring-2 hover:ring-green-500 hover:ring-offset-2"></button>
              <button className="w-8 h-8 rounded-full bg-purple-500 hover:ring-2 hover:ring-purple-500 hover:ring-offset-2"></button>
              <button className="w-8 h-8 rounded-full bg-red-500 hover:ring-2 hover:ring-red-500 hover:ring-offset-2"></button>
              <button className="w-8 h-8 rounded-full bg-yellow-500 hover:ring-2 hover:ring-yellow-500 hover:ring-offset-2"></button>
              <button className="w-8 h-8 rounded-full bg-pink-500 hover:ring-2 hover:ring-pink-500 hover:ring-offset-2"></button>
              <button className="w-8 h-8 rounded-full bg-indigo-500 hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2"></button>
              <button className="w-8 h-8 rounded-full bg-gray-500 hover:ring-2 hover:ring-gray-500 hover:ring-offset-2"></button>
            </div>
          </div>

          {/* Font Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Typography</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Inter (Default)</option>
                  <option>Helvetica</option>
                  <option>Arial</option>
                  <option>Times New Roman</option>
                  <option>Georgia</option>
                  <option>Courier New</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Small</span>
                  <input
                    type="range"
                    min="12"
                    max="18"
                    defaultValue="14"
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">Large</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Current size: 14px
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sidebar</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Compact sidebar</h3>
                  <p className="text-sm text-gray-500">Use a more compact sidebar layout</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Show sidebar icons</h3>
                  <p className="text-sm text-gray-500">Display icons next to sidebar items</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Animation Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Animations</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Reduce motion</h3>
                  <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
