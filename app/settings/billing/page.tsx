export default function BillingPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Arisay's Workspace / Billing
            </h1>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
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
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Subscriptions
          </h2>
          <p className="text-gray-600 mb-6">
            Here are your active subscriptions. Each subscription will be billed
            on the same billing cycle. Subscriptions can be updated or cancelled
            at any time.
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Active subscription
                </span>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Cancel
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Business Monthly
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white">
                    TRIAL
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  After your free trial ends on{" "}
                  <span className="font-medium">Sep 10, 2025</span>, your
                  subscription will continue automatically and be charged{" "}
                  <span className="font-medium">$50.00</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Download invoices and manage company information via Stripe
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Members
            </button>
            <span className="text-sm text-gray-400">Previous</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Next</span>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md">
              Plans
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
