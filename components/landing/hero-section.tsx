import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ai/ui/button";

export default function HeroSection() {
  return (
    <section>
      <div>
        <div className="flex flex-col">
          <div>
            <div className="text-[56px] leading-[64px] tracking-[-0.7px] font-bold">
              <span className="inline-flex items-center flex-wrap">
                Un chat seguro para todas las IAs
                <span className="text-[color(display-p3_0.792157_0.572549_0.188235)] px-1 bg-[rgba(255,215,0,0.3)] rounded-[4px] block relative ml-1">
                  Increiblemente Rapido
                </span>
              </span>
            </div>
          </div>

          <div className="flex gap-[10px] mt-5">
            <Button asChild variant="accent" size="lg">
              <Link href="/sign-up">Get started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#demo">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[rgb(160,160,160)]"
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
            </Button>
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

            <div className="w-full flex justify-center">
              <Image
                src="/shot.png"
                alt="AI Chat Interface Screenshot"
                width={1200}
                height={800}
                className="w-full h-auto shadow-container border border-gray-300"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
