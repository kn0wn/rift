export default function ChatActionsShowcase() {
  return (
    <section>
      {/*<div className="flex flex-col gap-8">
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
      </div>*/}
    </section>
  );
}
