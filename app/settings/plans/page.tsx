import { SettingsSection, SettingRow, StatusBadge } from '@/components/settings';

export default function PlansPage() {
  return (
    <div className="pt-12 pb-12 pl-12 pr-12 flex flex-col max-w-4xl min-w-[520px] w-full min-h-full box-border">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Plans</h1>
      <p className="text-gray-600 mb-8">
        Choose the plan that works best for your workspace.
      </p>

      <div className="space-y-6">

        {/* Pricing Cards */}
        <SettingsSection
          title="Available Plans"
          description="Choose the plan that works best for your workspace."
        >
          <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Hobby Plan */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
                {/* Title and Subtitle Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Hobby
                  </h3>
                  <p className="text-xs text-gray-600">
                    The perfect starting place for your web app or personal project.
                  </p>
                </div>
                
                {/* Pricing Section */}
                <div className="mb-4">
                  <span className="text-xl font-bold text-gray-900">Free forever.</span>
                </div>
                
                {/* Features Section */}
                <div className="flex-1 mb-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Import your repo, deploy in seconds
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Automatic CI/CD
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Web Application Firewall
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Global, automated CDN
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Fluid compute
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      DDoS Mitigation
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Traffic & performance insights
                    </li>
                  </ul>
                </div>
                
                {/* Button Section */}
                <div>
                  <button className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2">
                    Start Deploying
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
                {/* Title and Subtitle Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Pro
                  </h3>
                  <p className="text-xs text-gray-600">
                    Everything you need to build and scale your app.
                  </p>
                </div>
                
                {/* Pricing Section */}
                <div className="mb-4">
                  <span className="text-xl font-bold text-gray-900">$20/month</span>
                  <span className="text-xs text-gray-600"> + additional usage.</span>
                </div>
                
                {/* Features Section */}
                <div className="flex-1 mb-4">
                  <ul className="space-y-2">
                    <li className="text-xs text-gray-600 mb-2">
                      Everything in Hobby, plus:
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      10x more included usage
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Observability tools
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Faster builds
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Cold start prevention
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Advanced WAF Protection
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email support
                    </li>
                  </ul>
                </div>
                
                {/* Button Section */}
                <div>
                  <button className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                    Upgrade now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
                {/* Title and Subtitle Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Enterprise
                  </h3>
                  <p className="text-xs text-gray-600">
                    Critical security, performance, observability, platform SLAs, and support.
                  </p>
                </div>
                
                {/* Pricing Section - Empty to maintain alignment */}
                <div className="mb-4">
                  {/* Empty pricing section to maintain alignment with other cards */}
                </div>
                
                {/* Features Section */}
                <div className="flex-1 mb-4">
                  <ul className="space-y-2">
                    <li className="text-xs text-gray-600 mb-2 mt-4">
                      Everything in Pro, plus:
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Guest & Team access controls
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      SCIM & Directory Sync
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Managed WAF Rulesets
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Multi-region compute & failover
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      99.99% SLA
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                      </svg>
                      Advanced Support
                    </li>
                  </ul>
                </div>
                
                {/* Button Section */}
                <div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center justify-center gap-2">
                      Get a demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </SettingsSection>

      </div>
      
      {/* Billing Information */}
      <div className="mt-8">
        <SettingsSection
          title="Billing"
          description="Manage your billing information and payment methods."
        >
          <div className="space-y-4">
            <SettingRow label="Next Payment">
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">$50.00</span>
                <div className="text-xs text-gray-500">Due Sep 10, 2025</div>
              </div>
            </SettingRow>
            
            <SettingRow label="Payment Method">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">•••• 4242</span>
                <StatusBadge status="enabled">Active</StatusBadge>
              </div>
            </SettingRow>
            
            <SettingRow label="Billing Address">
              <span className="text-sm text-gray-700">123 Main Street, New York, NY 10001</span>
            </SettingRow>
            
            <SettingRow label="Invoice History">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">
                View Invoices
              </button>
            </SettingRow>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
