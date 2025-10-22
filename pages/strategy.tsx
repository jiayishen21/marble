import React from "react";
import Image from "next/image";
import useMobile from "../hooks/useMobile";

export default function strategy() {
  const { mobile } = useMobile();

  if (mobile) {
    return (
      <main className="w-full my-[3rem] mx-[1.5rem]">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold">Strategy</h1>
          <p className="text-md mt-[1rem]">
            Placeholder description of our investment strategy and philosophy.
          </p>
        </div>
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
            Strategy
          </h1>
          <div className="text-semiblack text-base md:text-lg xl:text-xl w-[50%]">
            Placeholder overview of Marble Investments' strategy, including
            process, research focus, risk management, and time horizon. More
            details coming soon.
          </div>
        </div>
      </section>
    </main>
  );
}
