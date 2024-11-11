import React from "react";
import Image from "next/image";
import {
  quarterData23,
  quarterData24,
  annualData,
  miscellaneousData,
  writeUps,
} from "../data/ResourceData";
import Dropdown from "../components/Dropdown";
import useMobile from "../hooks/useMobile";

export default function resources() {
  const { mobile } = useMobile();

  if (mobile) {
    return (
      <main className="w-full my-[3rem] mx-[1.5rem]">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-md mt-[1rem]">
            {/* We are committed to your financial empowerment.  */}
            Access free, insightful resources on investor education, mutual
            growth, and financial literacy.
          </p>
        </div>
        <section className="flex flex-col gap-[1.5rem] items-center justify-center mt-[4rem] rounded-md">
          <div
            className="flex flex-col w-full items-center py-[2rem]"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-semiblack font-bold text-2xl mb-[1rem] ">
              QUARTERLY LETTERS
            </h2>
            <Dropdown
              title={"2023 Quarterly Reports "}
              options={quarterData23}
            />
            <Dropdown
              title={"2024 Quarterly Reports "}
              options={quarterData24}
            />
          </div>
          <div
            className="flex flex-col w-full items-center py-[2rem]"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-semiblack font-bold text-2xl mb-[1rem]">
              ANNUAL REPORTS
            </h2>
            <Dropdown title={"Coming Soon..."} options={annualData} />
          </div>
          <div
            className="flex flex-col w-full items-center py-[2rem]"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-semiblack font-bold text-2xl mb-[1rem]">
              MISCELLANEOUS
            </h2>
            <Dropdown title={"Coming soon."} options={miscellaneousData} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full mb-[8rem]">
      <section
        className={`relative flex flex-col gap-12 h-full px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem] xl:px-[4.5rem] 2xl:px-[6.5rem]`}
        data-aos="fade-right"
      >
        <div className="absolute right-0 z-0" data-aos="fade-left">
          <div className="relative overflow-hidden w-[43vw] h-auto max-lg:hidden">
            <div className="w-full h-full relative">
              <Image
                alt="hexagons"
                src="./elements/background hexagons.svg"
                width={0}
                height={0}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa] to-transparent opacity-90 h-[30%]"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1
            className="text-semiblack font-bold leading-[1.3] z-[10] text-2xl sm:text-3xl lg:text-4xl 
            2xl:text-5xl mt-[5rem]"
          >
            Resources
          </h1>
          <div className="text-semiblack text-base md:text-lg xl:text-xl w-[50%]">
            {/* We are committed to your financial empowerment.  */}
            Access free, insightful resources on investor education, mutual
            growth, and financial literacy. Note that Marble Investments does
            not claim to offer financial advice.
          </div>
        </div>
        <section
          className={`flex justify-between items-center my-[4rem]
          `}
        >
          <div className="flex flex-col relative items-center self-start">
            <h2
              className={`text-semiblack font-bold text-xl md:text-2xl z-10 xl:text-3xl`}
            >
              QUARTERLY LETTERS
            </h2>
            <div className="absolute top-[3rem]">
              <Dropdown
                title={"2023 Quarterly Reports "}
                options={quarterData23}
              />
              <Dropdown
                title={"2024 Quarterly Reports "}
                options={quarterData24}
              />
            </div>
          </div>
          <div className="flex flex-col relative items-center self-start">
            <h2
              className={`text-semiblack font-bold text-xl md:text-2xl z-10 xl:text-3xl`}
            >
              ANNUAL REPORTS
            </h2>
            <Dropdown title={"Coming Soon..."} options={annualData}></Dropdown>
          </div>
          <div className="flex flex-col relative items-center self-start">
            <h2
              className={`text-semiblack font-bold text-xl md:text-2xl z-10 xl:text-3xl`}
            >
              MISCELLANEOUS
            </h2>
            <Dropdown
              title={"Equity Reports"}
              options={miscellaneousData}
            ></Dropdown>
            <Dropdown title={"Write-ups"} options={writeUps}></Dropdown>
          </div>
        </section>
      </section>
    </main>
  );
}
