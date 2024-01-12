import React from "react";
import Image from "next/image";
import {
  quarterData,
  annualData,
  miscellaneousData,
} from "../data/ResourceData";
import Dropdown from "../components/Dropdown";

export default function resources() {
  return (
    <main className="overflow-x-hidden w-full mb-[8rem]">
      <section
        className={`relative flex flex-col gap-12 px-[8rem] h-full`}
        data-aos="fade-right"
      >
        <div className="absolute right-0 z-0" data-aos="fade-left">
          <div className="relative">
            <div className="relative overflow-hidden w-[43vw] h-auto max-lg:hidden">
              <Image
                alt="hexagons"
                src="./elements/background hexagons.svg"
                width={0}
                height={0}
                className="w-full h-full"
              />
              <div className="absolute inset-0">
                <div className="h-1/2 bg-white opacity-50 filter blur-md" />
              </div>
            </div>
          </div>
        </div>
        <h1 className="mt-[8rem] text-semiblack font-bold text-6xl z-[10] max-lg:text-5xl">
          Marble Investment Resources
        </h1>
        <div className="text-airforce font-cairo font-semibold tracking-wide text-3xl z-[10] max-lg:text-xl w-[50%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium
          error eum iusto qui harum temporibus tempore odit vel maiores placeat
          obcaecati ullam porro aut repudiandae, eius aspernatur dolorum, quod
          non?
        </div>
        <section className="flex justify-between items-center my-[4rem]">
          <div className="flex flex-col">
            <h2 className=" text-semiblack font-bold text-3xl mb-[2rem]">
              QUARTERLY LETTERS
            </h2>
            <Dropdown
              title={"2023 Quarterly Reports"}
              options={quarterData}
            ></Dropdown>
          </div>
          <div className="flex flex-col">
            <h2 className=" text-semiblack font-bold text-3xl mb-[2rem]">
              ANNUAL REPORTS
            </h2>
            <Dropdown title={"Coming Soon..."} options={annualData}></Dropdown>
          </div>
          <div className="flex flex-col">
            <h2 className=" text-semiblack font-bold text-3xl mb-[2rem]">
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
