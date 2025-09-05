import Link from "next/link";
import { Button } from "@/components/ai/ui/button";
import CalendarTodosSection from "@/components/landing/calendar-todos-section";
import CalendarTodosSection2 from "@/components/landing/calendar-todos-section-2";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                AI Chat
              </span>
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

      {/* Hero Section */}
      <section className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col">
            <div>
              <div className="text-[56px] leading-[64px] tracking-[-0.7px] font-bold">
                <span className="inline-flex items-center flex-wrap">
                  Turn conversations into
                  <span className="text-[color(display-p3_0.792157_0.572549_0.188235)] px-1 bg-[rgba(255,215,0,0.3)] rounded-[4px] block relative ml-1">
                    intelligent insights
                  </span>
                </span>
              </div>
            </div>

            <div className="flex gap-[10px] mt-5">
              <Link
                href="/sign-up"
                className="text-base leading-[25.6px] cursor-pointer text-white tracking-[-0.2px] font-semibold py-3 px-7 bg-[rgb(17,168,255)] rounded-[12px] flex justify-center items-center no-underline"
              >
                Get started
              </Link>
              <Link
                href="#demo"
                className="text-base leading-[25.6px] cursor-pointer shadow-[rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.06)_0px_1px_1px_-0.5px,rgba(0,0,0,0.06)_0px_3px_3px_-1.5px] text-[rgb(92,92,92)] tracking-[-0.2px] font-semibold py-3 px-7 bg-white rounded-[12px] gap-2 items-center flex no-underline"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[rgb(160,160,160)] block"
                >
                  <path
                    d="M13.25 8.25V11H16.5385C18.4502 11 20 12.5498 20 14.4615V16.2308C20 19.417 17.417 22 14.2308 22H13.1665C11.607 22 10.1529 21.2124 9.30087 19.9063L6.28135 15.2775C6.1048 15.0068 6.06991 14.6675 6.18769 14.3666L6.27412 14.1458C6.75826 12.9088 8.18408 12.335 9.39013 12.8916L9.75 13.0577V8.25C9.75 7.2835 10.5335 6.5 11.5 6.5C12.4665 6.5 13.25 7.2835 13.25 8.25Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5 4C8.73858 4 6.5 6.23858 6.5 9C6.5 9.28505 6.52375 9.56379 6.56918 9.83454C6.66055 10.3792 6.29309 10.8948 5.74841 10.9862C5.20374 11.0776 4.68812 10.7101 4.59674 10.1655C4.53305 9.78579 4.5 9.39638 4.5 9C4.5 5.13401 7.63401 2 11.5 2C14.9695 2 17.8477 4.52312 18.4033 7.83454C18.4946 8.37922 18.1272 8.89484 17.5825 8.98622C17.0378 9.0776 16.5222 8.71013 16.4308 8.16546C16.0342 5.80145 13.9765 4 11.5 4Z"
                    fill="currentColor"
                  />
                </svg>
                Request a demo
              </Link>
            </div>

            <div className="flex flex-col gap-3 mt-12">
              <Link
                href="#changelog"
                className="cursor-pointer backdrop-blur-[8px] text-[rgb(92,92,92)] font-medium text-xs leading-[15.84px] rounded-full gap-[6px] justify-center items-center w-fit flex no-underline"
              >
                <span className="text-[rgb(160,160,160)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    className="block"
                  >
                    <path
                      fill="currentColor"
                      d="M6.479 1.356a.5.5 0 0 0-.958 0c-.36 1.2-.826 2.054-1.468 2.697-.643.642-1.498 1.108-2.697 1.468a.5.5 0 0 0 0 .958c1.2.36 2.054.826 2.697 1.468.642.643 1.108 1.498 1.468 2.697a.5.5 0 0 0 .958 0c.36-1.2.826-2.054 1.468-2.697.643-.642 1.498-1.108 2.697-1.468a.5.5 0 0 0 0-.958c-1.2-.36-2.054-.826-2.697-1.468C7.305 3.41 6.84 2.555 6.48 1.356Z"
                    />
                  </svg>
                </span>
                <span className="flex items-center gap-[6px] -mr-1">
                  Latest: Advanced conversation analysis, better context
                  understanding
                </span>
              </Link>

              <div className="w-full flex">
                <div className="shadow-[rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.06)_0px_1px_1px_-0.5px,rgba(0,0,0,0.06)_0px_3px_3px_-1.5px,rgba(0,0,0,0.06)_0px_6px_6px_-3px,rgba(0,0,0,0.04)_0px_12px_12px_-6px,rgba(0,0,0,0.04)_0px_24px_24px_-12px,rgba(0,0,0,0.1)_0px_24px_24px_2px] rounded-[6px] overflow-hidden flex">
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            AI Chat Session
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Updated 2 minutes ago</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-blue-500 text-white px-3 py-1 text-xs"
                          >
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                Recent Conversations
                              </h4>
                              <div className="space-y-2">
                                {[
                                  {
                                    title: "Product Strategy",
                                    time: "2h ago",
                                    active: true,
                                  },
                                  {
                                    title: "Market Analysis",
                                    time: "1d ago",
                                    active: false,
                                  },
                                  {
                                    title: "User Research",
                                    time: "3d ago",
                                    active: false,
                                  },
                                ].map((item, index) => (
                                  <div
                                    key={index}
                                    className={`p-3 rounded-lg cursor-pointer ${
                                      item.active
                                        ? "bg-blue-50 border-l-4 border-blue-500"
                                        : "hover:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <span
                                        className={`font-medium ${
                                          item.active
                                            ? "text-blue-900"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {item.title}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {item.time}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main content */}
                        <div className="lg:col-span-2">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Product Strategy Session
                              </h2>
                              <p className="text-gray-600 mb-6">
                                Analyzing market positioning and competitive
                                advantages for Q2 product launch.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">
                                  Key Insights
                                </span>
                              </div>

                              {[
                                {
                                  icon: "📈",
                                  title: "Market growth potential identified",
                                  subtitle:
                                    "23% increase opportunity in target segment",
                                  time: "Mar 24, 16:45",
                                },
                                {
                                  icon: "🎯",
                                  title: "Strategic positioning refined",
                                  subtitle:
                                    "Focus on enterprise customers for higher conversion",
                                  time: "Mar 24, 16:42",
                                },
                                {
                                  icon: "💡",
                                  title: "Feature prioritization completed",
                                  subtitle:
                                    "AI-powered analytics ranked as top priority",
                                  time: "Mar 17, 17:30",
                                },
                              ].map((insight, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                                >
                                  <span className="text-2xl">
                                    {insight.icon}
                                  </span>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                      {insight.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-2">
                                      {insight.subtitle}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                      {insight.time}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-gray-500 bg-gray-100 px-1 rounded relative inline-block z-10">
              Within 47 seconds:
            </span>{" "}
            Share summary. Keep CRM updated. Plan action items. Schedule next
            meeting.
            <div className="flex gap-2.5 mt-5">
              <Link
                href="/sign-up"
                className="text-sm sm:text-md md:text-base bg-blue-500 font-semibold text-white px-7 py-3 rounded-xl tracking-[-0.0125em] inline-flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Notes Features Section */}
      <section className="mb-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2 w-full -mb-4">
            <span className="text-[rgb(1,202,69)] font-semibold gap-1.5 flex items-center transition-opacity duration-150">
              Meeting Notes
            </span>
            <h4 className="text-[40px] leading-[54.4px] tracking-[-0.5px] font-bold m-0">
              Summarize any meeting, without a bot
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Replaces:</span>
            <div className="flex gap-1.5">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 grayscale opacity-80 bg-gray-200 rounded"></div>
                <span className="text-[rgb(92,92,92)]">Fireflies</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 grayscale opacity-80 bg-gray-200 rounded"></div>
                <span className="text-[rgb(92,92,92)]">Otter</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 grayscale opacity-80 bg-gray-200 rounded"></div>
                <span className="text-[rgb(92,92,92)]">Fathom</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
            <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
              Why AI Chat?
            </h4>
          </div>

          <p className="text-[rgb(92,92,92)] m-0">
            There are 27 AI chat apps out there. If conversations is all you
            need, any of them will do. Many of them will even be cheaper.
          </p>

          <p className="text-[rgb(92,92,92)] m-0">
            If you want to use them to become better at your job, you'll need AI
            Chat. An app that knows your conversations, should be able to take
            over your busy work.
          </p>

          <div className="bg-[rgba(235,235,235,0.5)] w-full h-px"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-2 -mb-6">
            {/* First Testimonial */}
            <div className="w-full flex relative">
              <div className="absolute top-0 right-1.5">
                <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
              </div>
              <div className="pt-0.5 flex flex-col">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      className="block"
                    >
                      <path
                        fill="#FF9D00"
                        d="M10.433 1.647c-.577-1.196-2.289-1.196-2.865 0L6.056 4.783a.088.088 0 0 1-.068.048l-3.48.454C1.192 5.457.643 7.079 1.624 8l2.545 2.392c.02.02.028.045.024.069l-.64 3.417c-.247 1.323 1.159 2.302 2.318 1.68L8.955 13.9a.096.096 0 0 1 .09 0l3.085 1.657c1.159.623 2.564-.356 2.317-1.68l-.64-3.416a.076.076 0 0 1 .024-.07l2.546-2.391c.98-.922.431-2.544-.885-2.716l-3.479-.454a.088.088 0 0 1-.069-.048l-1.511-3.136Z"
                      />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-gray-300 rounded-full overflow-hidden flex-shrink-0 w-5 h-5">
                    <div className="w-full h-full bg-gray-400"></div>
                  </div>
                  <div className="flex gap-0.5">
                    <span className="font-medium text-sm leading-5">
                      Sarah Johnson
                    </span>
                    <span className="text-[rgb(92,92,92)] font-medium text-sm leading-5">
                      Product Manager • TechCorp
                    </span>
                  </div>
                </div>
                <span className="text-[rgb(92,92,92)] leading-6">
                  We use AI Chat daily, and without it, we'd be at least 50%
                  less productive. It helps me to follow-up faster, which
                  directly translates into more revenue closed.
                </span>
              </div>
            </div>

            {/* Second Testimonial */}
            <div className="w-full flex relative">
              <div className="absolute top-0 right-1.5">
                <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
              </div>
              <div className="pt-0.5 flex flex-col">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      className="block"
                    >
                      <path
                        fill="#FF9D00"
                        d="M10.433 1.647c-.577-1.196-2.289-1.196-2.865 0L6.056 4.783a.088.088 0 0 1-.068.048l-3.48.454C1.192 5.457.643 7.079 1.624 8l2.545 2.392c.02.02.028.045.024.069l-.64 3.417c-.247 1.323 1.159 2.302 2.318 1.68L8.955 13.9a.096.096 0 0 1 .09 0l3.085 1.657c1.159.623 2.564-.356 2.317-1.68l-.64-3.416a.076.076 0 0 1 .024-.07l2.546-2.391c.98-.922.431-2.544-.885-2.716l-3.479-.454a.088.088 0 0 1-.069-.048l-1.511-3.136Z"
                      />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-gray-300 rounded-full overflow-hidden flex-shrink-0 w-5 h-5">
                    <div className="w-full h-full bg-gray-400"></div>
                  </div>
                  <div className="flex gap-0.5">
                    <span className="font-medium text-sm leading-5">
                      Mike Chen
                    </span>
                    <span className="text-[rgb(92,92,92)] font-medium text-sm leading-5">
                      Co-founder • StartupXYZ
                    </span>
                  </div>
                </div>
                <span className="text-[rgb(92,92,92)] leading-6">
                  Because of AI Chat we understand our customer's projects
                  better: It summarizes all our conversations and we ask AI
                  questions to speed up our workflow. There is no tool better
                  than AI Chat to save time. And that is priceless.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summaries & Action Items Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col">
          <div className="bg-[rgba(235,235,235,0.5)] w-full h-px"></div>

          <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
            <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
              Summaries & Action Items
            </h4>
          </div>

          <p className="text-[rgb(92,92,92)] m-0">
            When meetings go undocumented, progress rarely happens. Topics
            resurface week after week. But every conversation should move your
            team forward. AI summaries often miss the mark because they don't
            understand your business. Ours do, and turn every meeting into clear
            next steps.
          </p>

          <p className="text-[rgb(92,92,92)] m-0">
            The common problem with AI summaries is that they don't know the
            context of your meeting and company. We ensure great summaries in
            two ways.
          </p>

          <div className="shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px] rounded-xl overflow-hidden flex flex-col relative">
            <div className="shadow-[rgb(255,255,255)_0px_0px_0px_0px_inset,rgba(0,0,0,0.1)_0px_0px_0px_1px_inset] rounded-xl z-30 absolute inset-0 pointer-events-none"></div>

            <div className="grid grid-cols-3 backdrop-blur-[16px] bg-[rgba(0,0,0,0.2)] border-[rgba(0,0,0,0.05)] border-b-[1.5px] rounded-t-lg z-20 relative">
              <div className="p-3 flex justify-center items-center w-full">
                <div className="pr-4 pl-3 py-1.5 rounded-xl gap-2 justify-center items-center w-full flex">
                  <div className="text-white rounded justify-center items-center w-6 h-6 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      className="block"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 10a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0H8m8 0a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0h-1m-3-5V3M3.5 9a1 1 0 0 0 0 2m17-2a1 1 0 1 1 0 2M10 14.5h4M3.5 16V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3Z"
                      />
                    </svg>
                  </div>
                  <h5 className="text-white font-semibold m-0 text-base">
                    No bots in calls
                  </h5>
                </div>
              </div>
              <div className="p-3 border-l-[1.5px] border-[rgba(0,0,0,0.05)] flex justify-center items-center w-full">
                <div className="pr-4 pl-3 py-1.5 rounded-xl gap-2 justify-center items-center w-full flex">
                  <div className="text-white rounded justify-center items-center w-6 h-6 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      className="block"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h8M8 6V4M12 14c-3.886-.971-5.884-3.36-6.453-7.622"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 14c3.885-.971 5.883-3.357 6.453-7.616M14.5 17h5M13 19l3.078-7.31c.344-.817 1.5-.817 1.844 0L21 19"
                      />
                    </svg>
                  </div>
                  <h5 className="text-white font-semibold m-0 text-base">
                    Summary
                  </h5>
                </div>
              </div>
              <div className="p-3 border-l-[1.5px] border-[rgba(0,0,0,0.05)] flex justify-center items-center w-full">
                <div className="pr-4 pl-3 py-1.5 rounded-xl gap-2 justify-center items-center w-full flex">
                  <div className="text-white rounded justify-center items-center w-6 h-6 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      className="block"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m4.172 8.07 2.682 2.013a1.315 1.315 0 0 0 1.964-.46c.172-.341.484-.59.854-.684l1.608-.404a2.919 2.919 0 0 0 2.12-2.123l.726-2.903M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9.749 3.738-.649-.974a1.197 1.197 0 0 1 1.073-1.859l.643.041c.464.03.912.182 1.298.441l1.218.82a1.453 1.453 0 0 1-.81 2.658h-.666a2.531 2.531 0 0 1-2.107-1.127Z"
                      />
                    </svg>
                  </div>
                  <h5 className="text-white font-semibold m-0 text-base">
                    Action items
                  </h5>
                </div>
              </div>
            </div>

            <div className="w-full h-[671px] flex absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100"></div>
            </div>

            <div className="w-full h-[605px] flex relative">
              <div className="pt-2 pr-4 z-10 relative">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Meeting Summary
                        </h3>
                        <p className="text-gray-600">
                          Product Strategy Discussion
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Key Decisions
                        </h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Launch Q2 feature set as planned</li>
                          <li>• Focus on enterprise customer segment</li>
                          <li>• Increase marketing budget by 20%</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Action Items
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">
                              Sarah: Update pricing strategy by Friday
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-700">
                              Mike: Schedule customer interviews
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-7 w-full mb-8">
            <div className="overflow-hidden w-full h-8 mask-image-[linear-gradient(90deg,transparent,black_40px,black_calc(100%-80px),transparent)]">
              <div className="bg-repeat-x bg-[length:200%] opacity-40 w-full h-8 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 animate-[scroll_70s_linear_infinite]"></div>
            </div>
            <span className="text-xs leading-4 text-[rgb(160,160,160)]">
              We speak{" "}
              <span className="underline cursor-help">17 languages</span>{" "}
              <span className="underline cursor-help">82 more</span>
            </span>
          </div>

          <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
            <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
              No more bot in your calls
            </h4>
          </div>

          <p className="text-[rgb(92,92,92)] m-0">
            When you record with AI Chat, you control everything from your
            interface. Without the weird bots joining, we can offer a better
            experience:
          </p>

          <div className="mt-4">
            <div className="flex items-start">
              <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-[rgb(16,161,66)] w-3 h-3 block"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                Pause recording to speak off the record
              </div>
            </div>
            <div className="flex items-start mt-3">
              <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-[rgb(16,161,66)] w-3 h-3 block"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                Stops automatically if microphone is unused
              </div>
            </div>
            <div className="flex items-start mt-3">
              <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-[rgb(16,161,66)] w-3 h-3 block"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                Split recordings if you're staying in the same room
              </div>
            </div>
            <div className="flex items-start mt-3 mb-0">
              <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-[rgb(16,161,66)] w-3 h-3 block"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                Separates speakers and remembers their names
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mac Interface Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="px-10 h-[290px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] pt-10 bg-gradient-to-tr from-[rgb(207,238,255)] to-[rgb(65,186,255)] rounded-xl overflow-hidden flex justify-center w-full relative">
              <div className="shadow-[rgb(255,255,255)_0px_0px_0px_0px_inset,rgba(0,0,0,0.1)_0px_0px_0px_1px_inset] rounded-xl w-full h-[290px] z-30 absolute inset-0 pointer-events-none"></div>

              <div className="flex justify-center w-full relative pointer-events-none">
                <div className="w-[600px] h-[400px] z-10 -top-[190px] -right-[130px] absolute">
                  <div className="w-full h-[400px] flex absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 opacity-60"></div>
                  </div>
                </div>

                <div className="w-full z-20 relative pointer-events-none">
                  <div className="rounded-t-[32px] border-[rgb(181,181,183)] border-[1.5px] w-[calc(100%+2px)] h-[292px] z-30 -top-px -left-px absolute"></div>
                  <div className="rounded-t-[32px] border-[rgb(46,46,46)] border-[4.5px] w-full h-[310px] z-20 absolute"></div>
                  <div className="border-[15px] rounded-t-[32px] border-black w-full h-[280px] z-10 absolute"></div>

                  <div className="rounded-t-[32px] overflow-hidden w-full h-[290px] flex absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-300"></div>
                  </div>

                  <div className="pt-24 px-20 rounded-t-[32px] w-full h-[290px] flex absolute">
                    <div className="w-full h-[220px] relative">
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                AI Chat Notes
                              </h3>
                              <p className="text-sm text-gray-600">
                                Meeting in progress
                              </p>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-1">
                              Key Points
                            </h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Product roadmap discussion</li>
                              <li>• Q2 goals alignment</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top-2.5 px-5 flex justify-center w-full z-20 absolute pointer-events-auto">
                  <div className="rounded-b-2xl h-10 bg-black overflow-hidden flex justify-center items-center w-fit">
                    <div className="px-2.5 overflow-hidden items-center w-full h-10 flex">
                      <span className="text-white flex justify-center items-center w-7 h-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 40 40"
                          fill="none"
                          className="block"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M13.25 2A11.2 11.2 0 0 1 20 4.25 11.2 11.2 0 0 1 26.75 2C32.963 2 38 7.037 38 13.25A11.2 11.2 0 0 1 35.75 20 11.2 11.2 0 0 1 38 26.75C38 32.963 32.963 38 26.75 38A11.2 11.2 0 0 1 20 35.75 11.2 11.2 0 0 1 13.25 38C7.037 38 2 32.963 2 26.75A11.2 11.2 0 0 1 4.25 20 11.2 11.2 0 0 1 2 13.25C2 7.037 7.037 2 13.25 2ZM16 12a2 2 0 1 0-4 0v4a2 2 0 1 0 4 0v-4Zm10-2a2 2 0 0 1 2 2v4a2 2 0 1 1-4 0v-4a2 2 0 0 1 2-2ZM14.804 23a2 2 0 1 0-3.464 2 10 10 0 0 0 17.32 0 2 2 0 0 0-3.464-2 6.002 6.002 0 0 1-10.392 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <div className="w-[170px] flex-grow-0 h-10"></div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-xs">
                          41:52
                        </span>
                        <span className="text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            className="block"
                          >
                            <path
                              fill="currentColor"
                              d="M7.5 3.333a.833.833 0 0 0-1.667 0v13.334a.833.833 0 0 0 1.667 0V3.333ZM14.167 5A.833.833 0 0 0 12.5 5v10a.833.833 0 0 0 1.667 0V5ZM10.834 6.667a.833.833 0 0 0-1.667 0v6.666a.833.833 0 0 0 1.667 0V6.667ZM4.167 8.333a.833.833 0 0 0-1.667 0v3.334a.833.833 0 0 0 1.667 0V8.333ZM17.5 8.333a.833.833 0 0 0-1.667 0v3.334a.833.833 0 0 0 1.667 0V8.333Z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="text-[rgb(160,160,160)] text-xs leading-4">
              If you don't have a notch, you'll instead see a floating UI. It's
              a good reason to upgrade your Mac though.
            </span>
          </div>

          <div className="pl-4 border-l-[3px] border-[rgb(1,202,69)] w-full mt-6 mb-6 relative">
            <div className="text-base leading-[25.6px]">
              The notch-like overlay UI is super neat and out of the way, the
              transcription works great and is multilingual which is super
              powerful. The automatic todo suggestions that can just add to my
              tasks in one click is a killer feature.
            </div>
            <div className="text-[rgb(92,92,92)] text-sm leading-5 flex items-center gap-1 mt-2">
              <span className="font-medium">Gabriel Saillard</span>
              <span>•</span>
              <span>Software Engineer</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
            <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
              Works wherever you have meetings
            </h4>
          </div>

          <p className="text-[rgb(92,92,92)] m-0">
            Recording works for calls across all providers. Whether you use
            Zoom, Google Meet, Slack Huddle, or Microsoft Teams, we'll get the
            notes.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 w-full mb-3">
            <div className="shadow-[rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.06)_0px_1px_1px_-0.5px,rgba(0,0,0,0.06)_0px_3px_3px_-1.5px] bg-white rounded-xl overflow-hidden flex justify-center flex-wrap w-full">
              <div className="p-5 w-auto flex justify-center items-center flex-grow">
                <div className="w-12 h-12 max-w-[52px] bg-gray-200 rounded"></div>
              </div>
              <div className="p-5 border-l-[1.5px] border-[rgba(0,0,0,0.04)] w-auto flex justify-center items-center flex-grow">
                <div className="w-12 h-12 max-w-[52px] bg-gray-200 rounded"></div>
              </div>
              <div className="p-5 border-l-[1.5px] border-[rgba(0,0,0,0.04)] w-auto flex justify-center items-center flex-grow">
                <div className="w-12 h-12 max-w-[52px] bg-gray-200 rounded"></div>
              </div>
              <div className="p-5 border-l-[1.5px] border-[rgba(0,0,0,0.04)] w-auto flex justify-center items-center flex-grow">
                <div className="w-12 h-12 max-w-[52px] bg-gray-200 rounded"></div>
              </div>
              <div className="p-5 border-l-[1.5px] border-[rgba(0,0,0,0.04)] w-auto flex justify-center items-center flex-grow">
                <div className="w-12 h-12 max-w-[52px] bg-gray-200 rounded"></div>
              </div>
              <div className="p-5 border-l-[1.5px] border-[rgba(0,0,0,0.04)] w-auto flex justify-center items-center flex-grow">
                <div className="w-12 h-12 max-w-[52px] bg-gray-200 rounded"></div>
              </div>
              <div className="p-5 border-l-[1.5px] border-[rgba(0,0,0,0.04)] w-auto flex justify-center items-center flex-grow hidden sm:flex">
                <div className="w-12 h-12 max-w-[52px] bg-gray-200 rounded"></div>
              </div>
            </div>
            <span className="text-[rgb(160,160,160)] font-medium text-xs leading-4">
              AI Chat works with any video call provider.
            </span>
          </div>

          <p className="text-[rgb(92,92,92)] m-0">
            When you join meetings through AI Chat, we'll automatically record
            them. If you join them through eg. Google Calendar, we'll
            automatically ask you to start recording the call. We'll also
            auto-stop the recording.
          </p>

          <p className="text-[rgb(92,92,92)] m-0">
            If you want AI Chat to work fully in the background, you can enable
            fully-automatic recordings. This will record every call without you
            having to do anything.
          </p>

          <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
            <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
              Customize the summary with private notes
            </h4>
          </div>

          <p className="text-[rgb(92,92,92)] m-0">
            Take notes in private, before or during the meeting. We'll then use
            those raw notes as focus points for the summary. You can define the
            headings we should use. List out key numbers as emphasis. Or use it
            to prepare the agenda.
          </p>

          <p className="text-[rgb(92,92,92)] m-0 mb-0">
            Private notes taking in the dedicated tab are not visible to anyone
            else. This makes them great for time-based notetaking.
          </p>
        </div>
      </section>

      {/* 7-Day Journey Section */}
      <section className="mb-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center w-full mb-12">
            <p className="text-[rgb(92,92,92)] text-center mb-0 m-0 hidden">
              Meetings take a lot of time, follow-ups workflows shouldn't
            </p>
            <div className="flex flex-col items-center justify-center gap-2 w-full -mb-4">
              <h4 className="text-[40px] leading-[54.4px] tracking-[-0.5px] font-bold text-center m-0">
                What you can achieve with
                <br />
                AI Chat{" "}
                <span className="text-[rgb(44,118,160)] px-1 bg-[rgb(207,238,255)] rounded inline-block relative">
                  in just 7 days
                </span>
              </h4>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="grid grid-cols-3 w-full mb-10 relative">
              <div className="bg-[rgb(235,235,235)] h-px absolute top-[22px] left-[162.68px] right-[162.68px]"></div>
              <div className="flex justify-center">
                <div className="text-white font-medium text-sm leading-5 py-3 px-6 bg-[rgb(115,115,115)] rounded-full z-10">
                  Today
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-white font-medium text-sm leading-5 py-3 px-6 bg-[rgb(205,205,205)] rounded-full z-10">
                  Day 3
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-white font-medium text-sm leading-5 py-3 px-6 bg-[rgb(205,205,205)] rounded-full z-10">
                  Day 7
                </div>
              </div>
            </div>

            <div className="shadow-[rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.06)_0px_1px_1px_-0.5px,rgba(0,0,0,0.06)_0px_3px_3px_-1.5px] bg-white rounded-xl overflow-hidden w-full h-[308px] flex">
              <div className="flex flex-row w-full">
                <div className="border-r-[1.5px] border-[rgb(235,235,235)] p-8 flex-1">
                  <div className="hidden justify-center mb-3">
                    <div className="text-white font-medium text-xs leading-4 py-1 px-4 bg-[rgb(115,115,115)] rounded-full">
                      Today
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl leading-7 text-center mb-4 m-0">
                    Start recording
                  </h3>
                  <div>
                    <div className="flex items-start">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">
                        Record your first meeting in seconds
                      </p>
                    </div>
                    <div className="flex items-start mt-4 mb-0">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">Get AI summaries and ask questions</p>
                    </div>
                    <div className="flex items-start mt-4 mb-0">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">
                        Connect with your calendar, email, and task apps
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-r-[1.5px] border-[rgb(235,235,235)] p-8 flex-1">
                  <div className="hidden justify-center mb-3">
                    <div className="text-white font-medium text-xs leading-4 py-1 px-4 bg-[rgb(205,205,205)] rounded-full">
                      Day 3
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl leading-7 text-center mb-4 m-0">
                    Get organized
                  </h3>
                  <div>
                    <div className="flex items-start">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">Connect Hubspot, Notion, Slack etc.</p>
                    </div>
                    <div className="flex items-start mt-4 mb-0">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">
                        Auto-create action items and have AI plan them
                      </p>
                    </div>
                    <div className="flex items-start mt-4 mb-0">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">
                        Search your knowledge base from meetings
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1">
                  <div className="hidden justify-center mb-3">
                    <div className="text-white font-medium text-xs leading-4 py-1 px-4 bg-[rgb(205,205,205)] rounded-full">
                      Day 7
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl leading-7 text-center mb-4 m-0">
                    Automate your workflows
                  </h3>
                  <div>
                    <div className="flex items-start">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">
                        Automate 90% of meeting follow-up tasks
                      </p>
                    </div>
                    <div className="flex items-start mt-4 mb-0">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">
                        Generate meeting preparation 10x faster
                      </p>
                    </div>
                    <div className="flex items-start mt-4 mb-0">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="text-[rgb(1,202,69)] w-5 h-5 mt-1 mr-3 block"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="m-0">
                        Win back hours per week, per team member
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <div className="flex gap-2.5 mt-5">
                <Link
                  href="/sign-up"
                  className="text-base leading-[25.6px] cursor-pointer text-white tracking-[-0.2px] font-semibold py-3 px-7 bg-[rgb(17,168,255)] rounded-xl flex justify-center items-center no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Functionality Section */}
      <section className="mb-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2 w-full -mb-4">
            <span className="text-[rgb(17,168,255)] font-semibold gap-1.5 flex items-center transition-opacity duration-150">
              AI Chat
            </span>
            <h4 className="text-[40px] leading-[54.4px] tracking-[-0.5px] font-bold m-0">
              Ask AI Chat to do or find anything
            </h4>
          </div>

          <div className="w-1/2 mt-6 mb-6 relative">
            <div className="block text-[rgb(205,205,205)] absolute top-0 -left-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="none"
                className="block"
              >
                <path
                  fill="currentColor"
                  d="M30.632 33.25c4.345 0 7.868-3.526 7.868-7.875 0-4.35-3.523-7.875-7.868-7.875-1.085 0-2.12.22-3.06.618.187-.343.39-.666.608-.974 1.374-1.945 3.406-3.427 6.044-5.188a1.751 1.751 0 0 0 .485-2.427 1.747 1.747 0 0 0-2.424-.485c-2.606 1.74-5.164 3.538-6.96 6.078-1.845 2.611-2.787 5.85-2.56 10.301.026 4.327 3.538 7.827 7.867 7.827ZM11.4 33.25c4.346 0 7.868-3.526 7.868-7.875 0-4.35-3.522-7.875-7.867-7.875-1.086 0-2.12.22-3.061.618.187-.343.391-.666.609-.974 1.374-1.945 3.405-3.427 6.044-5.188a1.751 1.751 0 0 0 .485-2.427 1.747 1.747 0 0 0-2.425-.485c-2.606 1.74-5.164 3.538-6.959 6.078-1.845 2.611-2.788 5.85-2.56 10.301.025 4.327 3.538 7.827 7.867 7.827Z"
                />
              </svg>
            </div>
            <div className="font-medium text-base leading-[25.6px] p-2 px-4 bg-[rgb(235,235,235)] rounded-2xl gap-2 max-w-full inline-flex relative">
              <span className="max-w-full">
                It's like ChatGPT, but it has full context about my company and
                job. It's integrated with Gcal and Gmail. So no more
                copy+pasting.
              </span>
              <span className="bg-[rgb(235,235,235)] rounded-full w-[18px] h-[18px] absolute -top-0.5 -left-0.5"></span>
              <span className="bg-[rgb(235,235,235)] rounded-full w-1.5 h-1.5 absolute -top-1.5 -left-1.5"></span>
            </div>
            <div className="text-[rgb(92,92,92)] text-sm leading-5 flex items-center gap-1 mt-2">
              <span className="font-medium">Dennis Müller</span>
              <span>•</span>
              <span>Founder, AI Chat</span>
            </div>
          </div>

          <div className="flex -mt-3 -mb-7 z-20">
            <div className="w-[300px] max-w-full h-auto bg-gray-100 rounded"></div>
          </div>

          <div className="flex flex-col items-center justify-center gap-5 w-full mb-3">
            <div className="shadow-[rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.06)_0px_1px_1px_-0.5px,rgba(0,0,0,0.06)_0px_3px_3px_-1.5px] bg-[rgb(250,250,250)] rounded-xl overflow-hidden flex-col flex-shrink-0 max-w-[600px] w-full flex mx-auto">
              <div className="py-2.5 px-3 flex justify-between w-full">
                <div className="flex items-center gap-[5px]">
                  <div className="bg-gradient-to-tr from-[rgb(17,168,255)] to-[rgb(65,186,255)] rounded justify-center items-center w-3.5 h-3.5 flex">
                    <div className="opacity-90 text-white flex justify-center items-center w-2.5 h-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        className="block"
                      >
                        <path d="M17.837 13.407c.09-1.071.163-2.285.163-3.407v-.862a.348.348 0 0 0-.537-.293C15.125 10.355 12.648 12 10 12c-2.648 0-5.125-1.646-7.463-3.155A.348.348 0 0 0 2 9.138V10c0 1.122.073 2.336.163 3.407.154 1.824 1.61 3.235 3.435 3.38C7.018 16.897 8.675 17 10 17c1.325 0 2.983-.102 4.402-.214 1.825-.144 3.281-1.555 3.435-3.379Z" />
                        <path d="M10 10c-1.812 0-5.461-2.1-7.334-3.257A1.1 1.1 0 0 1 2.48 5.02a3.563 3.563 0 0 1 1.197-.813A17.668 17.668 0 0 1 10 3c2.868 0 5.222.771 6.324 1.208.454.18.852.468 1.197.813a1.1 1.1 0 0 1-.187 1.722C15.46 7.899 11.812 10 10 10Z" />
                      </svg>
                    </div>
                  </div>
                  <span className="font-medium text-xs leading-4">Email</span>
                </div>
              </div>
              <div className="bg-white border-t-[1.5px] border-[rgba(0,0,0,0.1)] rounded-t-xl overflow-hidden flex-col flex-shrink-0 w-full flex">
                <div className="flex flex-col w-full">
                  <div className="px-4 border-b-[1.5px] border-[rgba(0,0,0,0.04)] flex items-center gap-2 h-10">
                    <span className="text-[rgb(92,92,92)] text-sm leading-5 w-[58px]">
                      From
                    </span>
                    <p className="text-sm leading-5 flex-grow m-0">
                      Nish Budhraja
                    </p>
                  </div>
                  <div className="px-4 border-b-[1.5px] border-[rgba(0,0,0,0.04)] flex items-center gap-2 h-10">
                    <span className="text-[rgb(92,92,92)] text-sm leading-5 w-[58px]">
                      Subject
                    </span>
                    <p className="text-sm leading-5 flex-grow m-0">
                      Feedback - Loving the new AI Chat!
                    </p>
                  </div>
                </div>
                <div className="leading-[21px] text-sm pr-12 pl-4 pt-4 pb-4 whitespace-pre-wrap flex flex-col gap-2 w-full">
                  <p className="m-0">
                    You absolutely cooked - loving the new AI Chat. Was an
                    instant upgrade to Business for me. I had churned last year
                    but you won me back.
                  </p>
                  <p className="m-0">
                    With tasks / calendar / meeting recordings, you replaced
                    Superlist, Notion Calendar, and Granola for me.
                  </p>
                  <p className="font-semibold m-0">
                    All-in-one solution has enabled some pretty magical
                    workflows for me:
                  </p>
                  <ol className="pt-1 pb-1 list-decimal list-inside m-0 p-1">
                    <li className="py-0.5">
                      Record meeting → follow up tasks logged → add tasks to my
                      lists → add to calendar
                    </li>
                    <li className="py-0.5">
                      Have a meeting → have AI assistant write follow up email →
                      AI assistant has all of the context needed → writes
                      amazing email → send directly from AI Chat
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <span className="text-[rgb(160,160,160)] text-xs leading-4 max-w-[600px] mx-auto">
              Nish really was too kind with his review.
            </span>
          </div>

          <div className="bg-[rgba(235,235,235,0.5)] w-full h-px mt-4 mb-4"></div>

          <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
            <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
              Chat Actions
            </h4>
          </div>

          <p className="text-[rgb(92,92,92)] m-0">
            Saving you time is our priority. And chat actions is the way we
            achieve that. You can ask AI Chat to draft emails, create or update
            meetings, rewrite summaries, create mind maps from summaries, and
            more.
          </p>

          <p className="text-[rgb(92,92,92)] m-0 mb-0">
            <span className="text-[rgb(44,118,160)] px-1 bg-[rgb(207,238,255)] rounded inline-block relative">
              One of my favorite use cases:
            </span>{" "}
            "I'm sick, move everything to Thursday." and AI Chat will do it for
            you.
          </p>

          <div className="shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px] rounded-xl overflow-hidden flex flex-col relative">
            <div className="shadow-[rgb(255,255,255)_0px_0px_0px_0px_inset,rgba(0,0,0,0.1)_0px_0px_0px_1px_inset] rounded-xl z-30 absolute inset-0 pointer-events-none"></div>

            <div className="grid grid-cols-3 backdrop-blur-[16px] bg-[rgba(0,0,0,0.2)] border-b-[1.5px] border-[rgba(0,0,0,0.05)] rounded-t-lg z-20 relative">
              <div className="p-3 flex justify-center items-center w-full">
                <div className="pr-4 pl-3 py-1.5 rounded-xl gap-2 justify-center items-center w-full flex">
                  <div className="text-white rounded justify-center items-center w-6 h-6 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      className="block"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 10a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0H8m8 0a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0h-1m-3-5V3M3.5 9a1 1 0 0 0 0 2m17-2a1 1 0 1 1 0 2M10 14.5h4M3.5 16V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3Z"
                      />
                    </svg>
                  </div>
                  <h5 className="text-white font-semibold m-0 text-base">
                    Send follow-up emails
                  </h5>
                </div>
              </div>
              <div className="p-3 border-l-[1.5px] border-[rgba(0,0,0,0.05)] flex justify-center items-center w-full">
                <div className="pr-4 pl-3 py-1.5 rounded-xl gap-2 justify-center items-center w-full flex">
                  <div className="text-white rounded justify-center items-center w-6 h-6 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      className="block"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h8M8 6V4M12 14c-3.886-.971-5.884-3.36-6.453-7.622"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 14c3.885-.971 5.883-3.357 6.453-7.616M14.5 17h5M13 19l3.078-7.31c.344-.817 1.5-.817 1.844 0L21 19"
                      />
                    </svg>
                  </div>
                  <h5 className="text-white font-semibold m-0 text-base">
                    Combine actions
                  </h5>
                </div>
              </div>
              <div className="p-3 border-l-[1.5px] border-[rgba(0,0,0,0.05)] flex justify-center items-center w-full">
                <div className="pr-4 pl-3 py-1.5 rounded-xl gap-2 justify-center items-center w-full flex">
                  <div className="text-white rounded justify-center items-center w-6 h-6 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      className="block"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m4.172 8.07 2.682 2.013a1.315 1.315 0 0 0 1.964-.46c.172-.341.484-.59.854-.684l1.608-.404a2.919 2.919 0 0 0 2.12-2.123l.726-2.903M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9.749 3.738-.649-.974a1.197 1.197 0 0 1 1.073-1.859l.643.041c.464.03.912.182 1.298.441l1.218.82a1.453 1.453 0 0 1-.81 2.658h-.666a2.531 2.531 0 0 1-2.107-1.127Z"
                      />
                    </svg>
                  </div>
                  <h5 className="text-white font-semibold m-0 text-base">
                    Create Linear tickets
                  </h5>
                </div>
              </div>
            </div>

            <div className="w-full h-[748px] flex absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100"></div>
            </div>

            <div className="w-full h-[683px] flex relative">
              <div className="pt-2 pl-2 pr-2 z-10 relative">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          AI Chat Actions
                        </h3>
                        <p className="text-gray-600">Automate your workflow</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Available Actions
                        </h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Draft and send follow-up emails</li>
                          <li>• Create calendar events and meetings</li>
                          <li>• Generate action items from conversations</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Smart Integrations
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">
                              Email integration active
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">
                              Calendar sync enabled
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Integrations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              gap: "32px",
              flexDirection: "column",
              display: "flex",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "8px",
                flexDirection: "column",
                width: "100%",
                display: "flex",
                marginBottom: "-16px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <span
                style={{
                  userSelect: "none",
                  cursor: "default",
                  transitionProperty: "opacity",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "0.15s",
                  color: "rgb(17, 168, 255)",
                  fontWeight: 600,
                  gap: "6px",
                  alignItems: "center",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                Integrations
              </span>
              <h4
                style={{
                  fontSize: "40px",
                  lineHeight: "54.4px",
                  letterSpacing: "-0.5px",
                  userSelect: "none",
                  cursor: "default",
                  fontWeight: 700,
                  margin: "0px",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                Keep your tools updated, with one click
              </h4>
            </div>
            <p
              style={{
                userSelect: "text",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                textWrap: "pretty",
                margin: "0px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              Too many tools require you to use them all the time to be useful.
              Amie works just as well in the background. The integrations with
              Google and Apple Calendar make sure every meeting gets recorded.
            </p>
            <p
              style={{
                userSelect: "text",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                textWrap: "pretty",
                margin: "0px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              The Gmail integration lets us re-create your writing style. To
              AI-draft your emails just like you wrote it.
            </p>
            <p
              style={{
                marginBottom: "0px",
                userSelect: "text",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                textWrap: "pretty",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              We know that you likely have a system of record already. We've
              built integrations with Slack, Notion, Hubspot and Pipedrive. So
              that you can get the summaries there with a few clicks.
            </p>
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "32px",
                flexDirection: "column",
                display: "flex",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  gap: "28px",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  display: "flex",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    userSelect: "none",
                    cursor: "default",
                    boxShadow:
                      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    width: "100%",
                    height: "600px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <img
                    alt="Integrations Flow"
                    loading="lazy"
                    width="1956"
                    height="1200"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparentuser-select:none",
                      cursor: "default",
                      objectFit: "cover",
                      width: "100%",
                      height: "600px",
                      maxWidth: "100%",
                      display: "block",
                      verticalAlign: "middle",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                      userSelect: "none",
                    }}
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrations-flow.87abf11f.png&amp;w=2048&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrations-flow.87abf11f.png&amp;w=3840&amp;q=75 2x"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrations-flow.87abf11f.png&amp;w=3840&amp;q=75"
                  />
                </div>
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    color: "rgb(160, 160, 160)",
                    fontSize: "12px",
                    lineHeight: "15.84px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Export meeting notes to Pipedrive, Notion, Slack, Hubspot,
                  Linear. Request integrations at care@amie.so
                </span>
              </div>
              <div
                style={{
                  gridTemplateColumns: "312px 312px 312px",
                  userSelect: "none",
                  cursor: "default",
                  rowGap: "32px",
                  columnGap: "20px",
                  display: "grid",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Hubspot"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhubspot.61bc1514.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhubspot.61bc1514.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhubspot.61bc1514.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Hubspot
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Add to leads/meetings
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Notion"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnotion.4644ec05.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnotion.4644ec05.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnotion.4644ec05.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Notion
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Add to databases
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Slack"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslack.ee2a778a.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslack.ee2a778a.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslack.ee2a778a.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Slack
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Send to any channel or person
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Linear"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinear.3963e44e.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinear.3963e44e.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinear.3963e44e.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Linear
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Create tickets from transcripts
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Pipedrive"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpipedrive.d0cf7dc1.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpipedrive.d0cf7dc1.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpipedrive.d0cf7dc1.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Pipedrive
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Add to leads/customers
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    opacity: "0.4",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Attio"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fattio.00d8eab7.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fattio.00d8eab7.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fattio.00d8eab7.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Attio
                        <span
                          style={{
                            userSelect: "none",
                            cursor: "default",
                            color: "rgb(160, 160, 160)",
                            fontSize: "14px",
                            lineHeight: "20px",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        >
                          Soon
                        </span>
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Add to leads/customers
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    opacity: "0.4",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Personio"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpersonio.f79a6cb0.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpersonio.f79a6cb0.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpersonio.f79a6cb0.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Personio
                        <span
                          style={{
                            userSelect: "none",
                            cursor: "default",
                            color: "rgb(160, 160, 160)",
                            fontSize: "14px",
                            lineHeight: "20px",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        >
                          Soon
                        </span>
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Add to applicants
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    opacity: "0.4",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Ashby"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fashby.a9b70967.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fashby.a9b70967.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fashby.a9b70967.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Ashby
                        <span
                          style={{
                            userSelect: "none",
                            cursor: "default",
                            color: "rgb(160, 160, 160)",
                            fontSize: "14px",
                            lineHeight: "20px",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        >
                          Soon
                        </span>
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Add to applicants
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    opacity: "0.4",
                    gap: "8px",
                    flexDirection: "column",
                    flexShrink: 0,
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      gap: "12px",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexShrink: 0,
                        width: "2.5rem",
                        height: "39.9844px",
                        display: "flex",
                        top: "4px",
                        position: "relative",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <img
                        alt="Greenhouse"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        style={{
                          color: "transparentuser-select:none",
                          cursor: "default",
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: "2.5rem",
                          height: "39.9844px",
                          maxWidth: "100%",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          userSelect: "none",
                        }}
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgreenhouse.4b29d305.png&amp;w=96&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgreenhouse.4b29d305.png&amp;w=256&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgreenhouse.4b29d305.png&amp;w=256&amp;q=75"
                      />
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          boxShadow:
                            "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          inset: "0px",
                          position: "absolute",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        flexDirection: "column",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          fontWeight: 500,
                          gap: "4px",
                          alignItems: "baseline",
                          display: "flex",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Greenhouse
                        <span
                          style={{
                            userSelect: "none",
                            cursor: "default",
                            color: "rgb(160, 160, 160)",
                            fontSize: "14px",
                            lineHeight: "20px",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        >
                          Soon
                        </span>
                      </span>
                      <div
                        style={{
                          userSelect: "none",
                          cursor: "default",
                          color: "rgb(92, 92, 92)",
                          lineHeight: "19.5px",
                          fontSize: "13px",
                          display: "flex",
                          marginTop: "-2px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        Add to applicants
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shareable Pages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              marginBottom: "192px",
              userSelect: "none",
              cursor: "default",
              gap: "32px",
              flexDirection: "column",
              display: "flex",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "8px",
                flexDirection: "column",
                width: "100%",
                display: "flex",
                marginBottom: "-16px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <span
                style={{
                  userSelect: "none",
                  cursor: "default",
                  transitionProperty: "opacity",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "0.15s",
                  color: "rgb(160, 80, 255)",
                  fontWeight: 600,
                  gap: "6px",
                  alignItems: "center",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                Shareable Pages
              </span>
              <h4
                style={{
                  fontSize: "40px",
                  lineHeight: "54.4px",
                  letterSpacing: "-0.5px",
                  userSelect: "none",
                  cursor: "default",
                  fontWeight: 700,
                  margin: "0px",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                Shared with colleagues and customers
              </h4>
            </div>
            <p
              style={{
                userSelect: "text",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                textWrap: "pretty",
                margin: "0px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              Recording all your meetings is a great start. And most tools stop
              there. The context that many notes create over time is a goldmine.
            </p>
            <p
              style={{
                marginBottom: "0px",
                userSelect: "text",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                textWrap: "pretty",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              When you ask the AI chat questions, we pull in all the context
              from the pages. Wherever you are, you can always ask questions
              about any meeting.
            </p>
            <div
              style={{
                width: "75%",
                userSelect: "none",
                cursor: "default",
                paddingLeft: "16px",
                borderColor: "rgb(160, 80, 255)",
                borderLeftWidth: "3px",
                marginTop: "24px",
                marginBottom: "24px",
                position: "relative",
                boxSizing: "border-box",
                borderWidth: "0px 0px 0px 3px",
                borderStyle: "solid",
              }}
            >
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  fontSize: "16px",
                  lineHeight: "25.6px",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                Wow, auto-generated pages are the kind of thing that you don't
                even know you need until you see it. It's like an AI-native CRM.
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  color: "rgb(92, 92, 92)",
                  fontSize: "14px",
                  lineHeight: "20px",
                  gap: "4px",
                  alignItems: "center",
                  display: "flex",
                  marginTop: "8px",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    fontWeight: 500,
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Victor Fteha
                </span>
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  •
                </span>
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Founder, Fundmore
                </span>
              </div>
            </div>
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                boxShadow:
                  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px",
                borderRadius: "12px",
                overflow: "hidden",
                flexDirection: "column",
                display: "flex",
                position: "relative",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  boxShadow:
                    "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
                  borderRadius: "12px",
                  zIndex: 30,
                  inset: "0px",
                  position: "absolute",
                  pointerEvents: "none",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              ></div>
              <div
                style={{
                  gridTemplateColumns: "325.312px 325.336px 325.336px",
                  display: "grid",
                  userSelect: "none",
                  cursor: "default",
                  backdropFilter: "blur(16px)",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderColor: "rgba(0, 0, 0, 0.05)",
                  borderBottomWidth: "1.5px",
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  borderRadius: "8px 8px 0px 0px",
                  zIndex: 20,
                  position: "relative",
                  boxSizing: "border-box",
                  borderWidth: "0px 0px 1.5px",
                  borderStyle: "solid",
                }}
              >
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    padding: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      paddingRight: "16px",
                      paddingLeft: "12px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      borderRadius: "12px",
                      gap: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        color: "rgb(255, 255, 255)",
                        borderRadius: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "1.5rem",
                        height: "24px",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        style={{
                          cursor: "default",
                          userSelect: "none",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m4.172 8.07 2.682 2.013a1.315 1.315 0 0 0 1.964-.46c.172-.341.484-.59.854-.684l1.608-.404a2.919 2.919 0 0 0 2.12-2.123l.726-2.903M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9.749 3.738-.649-.974a1.197 1.197 0 0 1 1.073-1.859l.643.041c.464.03.912.182 1.298.441l1.218.82a1.453 1.453 0 0 1-.81 2.658h-.666a2.531 2.531 0 0 1-2.107-1.127Z"
                          style={{
                            cursor: "default",
                            userSelect: "none",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        ></path>
                      </svg>
                    </div>
                    <h5
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        color: "rgb(255, 255, 255)",
                        fontWeight: 600,
                        margin: "0px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      Share with anyone
                    </h5>
                  </div>
                </div>
                <div
                  style={{
                    borderTopWidth: "0px",
                    borderBottomWidth: "0px",
                    borderRightWidth: "0px",
                    borderLeftWidth: "1.5px",
                    userSelect: "none",
                    cursor: "default",
                    padding: "12px",
                    borderColor: "rgba(0, 0, 0, 0.05)",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px 0px 0px 1.5px",
                    borderStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      paddingRight: "16px",
                      paddingLeft: "12px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      borderRadius: "12px",
                      gap: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        color: "rgb(255, 255, 255)",
                        borderRadius: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "1.5rem",
                        height: "24px",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        style={{
                          cursor: "default",
                          userSelect: "none",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 10a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0H8m8 0a.5.5 0 0 1-1 0m1 0a.5.5 0 0 0-1 0m1 0h-1m-3-5V3M3.5 9a1 1 0 0 0 0 2m17-2a1 1 0 1 1 0 2M10 14.5h4M3.5 16V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3Z"
                          style={{
                            cursor: "default",
                            userSelect: "none",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        ></path>
                      </svg>
                    </div>
                    <h5
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        color: "rgb(255, 255, 255)",
                        fontWeight: 600,
                        margin: "0px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      Share like a document
                    </h5>
                  </div>
                </div>
                <div
                  style={{
                    borderTopWidth: "0px",
                    borderBottomWidth: "0px",
                    borderRightWidth: "0px",
                    borderLeftWidth: "1.5px",
                    userSelect: "none",
                    cursor: "default",
                    padding: "12px",
                    borderColor: "rgba(0, 0, 0, 0.05)",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px 0px 0px 1.5px",
                    borderStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      paddingRight: "16px",
                      paddingLeft: "12px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      borderRadius: "12px",
                      gap: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      display: "flex",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        color: "rgb(255, 255, 255)",
                        borderRadius: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "1.5rem",
                        height: "24px",
                        display: "flex",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        style={{
                          cursor: "default",
                          userSelect: "none",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h8M8 6V4M12 14c-3.886-.971-5.884-3.36-6.453-7.622"
                          style={{
                            cursor: "default",
                            userSelect: "none",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        ></path>
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 14c3.885-.971 5.883-3.357 6.453-7.616M14.5 17h5M13 19l3.078-7.31c.344-.817 1.5-.817 1.844 0L21 19"
                          style={{
                            cursor: "default",
                            userSelect: "none",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        ></path>
                      </svg>
                    </div>
                    <h5
                      style={{
                        userSelect: "none",
                        cursor: "default",
                        color: "rgb(255, 255, 255)",
                        fontWeight: 600,
                        margin: "0px",
                        fontSize: "16px",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      Ask in context
                    </h5>
                  </div>
                </div>
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  width: "100%",
                  height: "670.992px",
                  display: "flex",
                  inset: "0px",
                  position: "absolute",
                  pointerEvents: "none",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <img
                  alt="Background"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: "transparentuser-select:none",
                    cursor: "default",
                    objectFit: "cover",
                    maxWidth: "100%",
                    display: "block",
                    verticalAlign: "middle",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                    userSelect: "none",
                  }}
                  sizes="100vw"
                  srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=640&amp;q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=3840&amp;q=75 3840w"
                  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg8.ced56b87.jpg&amp;w=3840&amp;q=75"
                />
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  width: "100%",
                  height: "605.484px",
                  display: "flex",
                  position: "relative",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    paddingTop: "8px",
                    paddingLeft: "16px",
                    zIndex: 10,
                    position: "relative",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <img
                    alt="Collections"
                    loading="lazy"
                    width="3952"
                    height="2460"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparentuser-select:none",
                      cursor: "default",
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                      verticalAlign: "middle",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                      userSelect: "none",
                    }}
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollections.5f9b20b5.png&amp;w=3840&amp;q=75 1x"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollections.5f9b20b5.png&amp;w=3840&amp;q=75"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                gridTemplateColumns: "293.32px 293.32px 293.32px",
                userSelect: "none",
                cursor: "default",
                gap: "48px",
                display: "grid",
                marginBottom: "24px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  gap: "32px",
                  flexDirection: "column",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    width: "100%",
                    display: "flex",
                    marginTop: "16px",
                    marginBottom: "-24px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <h4
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      letterSpacing: "-0.5px",
                      fontWeight: 600,
                      fontSize: "20px",
                      lineHeight: "28px",
                      margin: "0px",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    By recurring event
                  </h4>
                </div>
                <p
                  style={{
                    marginBottom: "0px",
                    userSelect: "text",
                    cursor: "default",
                    color: "rgb(92, 92, 92)",
                    textWrap: "pretty",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  See how your project is progressing over time.
                </p>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    flexDirection: "column",
                    width: "100%",
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <img
                    alt="Feature grid image"
                    loading="lazy"
                    width="1395"
                    height="381"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparentuser-select:none",
                      cursor: "default",
                      objectFit: "contain",
                      width: "100%",
                      height: "80.1094px",
                      maxWidth: "100%",
                      display: "block",
                      verticalAlign: "middle",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                      userSelect: "none",
                    }}
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-event.ff8b5952.png&amp;w=1920&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-event.ff8b5952.png&amp;w=3840&amp;q=75 2x"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-event.ff8b5952.png&amp;w=3840&amp;q=75"
                  />
                </div>
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  gap: "32px",
                  flexDirection: "column",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    width: "100%",
                    display: "flex",
                    marginTop: "16px",
                    marginBottom: "-24px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <h4
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      letterSpacing: "-0.5px",
                      fontWeight: 600,
                      fontSize: "20px",
                      lineHeight: "28px",
                      margin: "0px",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    By domain
                  </h4>
                </div>
                <p
                  style={{
                    marginBottom: "0px",
                    userSelect: "text",
                    cursor: "default",
                    color: "rgb(92, 92, 92)",
                    textWrap: "pretty",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Make sure your customers get the care they deserve.
                </p>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    flexDirection: "column",
                    width: "100%",
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <img
                    alt="Feature grid image"
                    loading="lazy"
                    width="1395"
                    height="381"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparentuser-select:none",
                      cursor: "default",
                      objectFit: "contain",
                      width: "100%",
                      height: "80.1094px",
                      maxWidth: "100%",
                      display: "block",
                      verticalAlign: "middle",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                      userSelect: "none",
                    }}
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-domain.203c7ca9.png&amp;w=1920&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-domain.203c7ca9.png&amp;w=3840&amp;q=75 2x"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-domain.203c7ca9.png&amp;w=3840&amp;q=75"
                  />
                </div>
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  gap: "32px",
                  flexDirection: "column",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    gap: "8px",
                    flexDirection: "column",
                    width: "100%",
                    display: "flex",
                    marginTop: "16px",
                    marginBottom: "-24px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <h4
                    style={{
                      userSelect: "none",
                      cursor: "default",
                      letterSpacing: "-0.5px",
                      fontWeight: 600,
                      fontSize: "20px",
                      lineHeight: "28px",
                      margin: "0px",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    Manually
                  </h4>
                </div>
                <p
                  style={{
                    marginBottom: "0px",
                    userSelect: "text",
                    cursor: "default",
                    color: "rgb(92, 92, 92)",
                    textWrap: "pretty",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Keep track of topics, projects, or anything else.
                </p>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    flexDirection: "column",
                    width: "100%",
                    display: "flex",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <img
                    alt="Feature grid image"
                    loading="lazy"
                    width="1395"
                    height="381"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparentuser-select:none",
                      cursor: "default",
                      objectFit: "contain",
                      width: "100%",
                      height: "80.1094px",
                      maxWidth: "100%",
                      display: "block",
                      verticalAlign: "middle",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                      userSelect: "none",
                    }}
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-manual.df128284.png&amp;w=1920&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-manual.df128284.png&amp;w=3840&amp;q=75 2x"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollection-recurring-manual.df128284.png&amp;w=3840&amp;q=75"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your conversations?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals using AI Chat to enhance their
            productivity and insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base w-full sm:w-auto"
              >
                Get started free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold text-base w-full sm:w-auto"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Calendar & Todos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CalendarTodosSection />
      </section>

      {/* Calendar & Todos Section 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CalendarTodosSection2 />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <span className="font-semibold text-gray-900">AI Chat</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 AI Chat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
