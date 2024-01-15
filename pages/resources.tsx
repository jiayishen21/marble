import React from "react";
import Image from "next/image";
import {
  quarterData,
  annualData,
  miscellaneousData,
} from "../data/ResourceData";
import Dropdown from "../components/Dropdown";
import useMobile from "../hooks/useMobile";

export default function resources() {
  const {mobile} = useMobile()

  if (mobile) {
    return (
      <main className="w-full my-[3rem] mx-[1.5rem]">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold">Marble Investment Resources</h1>
          <p className="text-md mt-[1rem]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            quidem nam cupiditate pariatur enim repudiandae, ad reiciendis
            dolores rerum animi culpa laudantium dolorem minima, delectus sint
            tempore itaque eveniet eum?
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
            <Dropdown title={"2023 Quarterly Reports "} options={quarterData} />
          </div>
          <div
            className="flex flex-col w-full items-center py-[2rem]"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-semiblack font-bold text-2xl mb-[1rem]">
              ANNUAL LETTERS
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
            <Dropdown title={"2024 insights"} options={miscellaneousData} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full mb-[8rem]">
      <section
        className={`relative flex flex-col gap-12 h-full px-[8rem]`}
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
        <div>
          <h1 className="mt-[8rem] text-semiblack font-bold text-6xl z-[10]">
            Marble Investment Resources
          </h1>
          <div className="font-cairo font-semibold tracking-wide text-lg z-[10] max-lg:text-md w-[50%]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Accusantium error eum iusto qui harum temporibus tempore odit vel
            maiores placeat obcaecati ullam porro aut repudiandae, eius
            aspernatur dolorum, quod non?
          </div>
        </div>
        <section
          className={`flex justify-between items-center ${
            mobile ? "flex-col gap-[3rem] my-[2rem]" : "my-[4rem]"
          }`}
        >
          <div className="flex flex-col py-[2rem]">
            <h2
              className={`text-semiblack font-bold  ${
                mobile ? "text-2xl mb-[1rem]" : "text-3xl mb-[2rem]"
              }`}
            >
              QUARTERLY LETTERS
            </h2>
            <Dropdown
              title={"2023 Quarterly Reports "}
              options={quarterData}
            ></Dropdown>
          </div>
          <div className="flex flex-col">
            <h2
              className={`text-semiblack font-bold  ${
                mobile ? "text-2xl mb-[1rem]" : "text-3xl mb-[2rem]"
              }`}
            >
              ANNUAL REPORTS
            </h2>
            <Dropdown title={"Coming Soon..."} options={annualData}></Dropdown>
          </div>
          <div className="flex flex-col">
            <h2
              className={`text-semiblack font-bold  ${
                mobile ? "text-2xl mb-[1rem]" : "text-3xl mb-[2rem]"
              }`}
            >
              MISCELLANEOUS
            </h2>
            <Dropdown
              title={"2024 insights"}
              options={miscellaneousData}
            ></Dropdown>
          </div>
        </section>
      </section>
    </main>
  );
}
