import React from "react";
import Image from "next/image";
import { companyData } from "../../data/SuccessData";

export default function RecruitingSucess() {
  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <section className="flex flex-col items-center justify-center w-full h-[30%]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Recruiting Success
        </h1>
      </section>
      <section className="mt-[1rem] w-full max-w-6xl mx-auto flex-1 flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5rem] p-[2rem] place-items-center">
          {companyData.map((company) => {
            return (
              <div
                key={company.name}
                className="flex items-center justify-center"
              >
                <Image
                  alt={company.name}
                  width={300}
                  height={300}
                  src={company.logo}
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
