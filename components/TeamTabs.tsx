import React from "react";
import { teamOptions } from "../data/TeamData";
import { Button } from "antd";
import { useRouter } from "next/router";

export default function TeamTabs() {
  const router = useRouter();
  return (
    <div>
      <section className="gap-[2rem] px-[3rem]">
        <div className="flex flex-col gap-6" data-aos="fade-right">
          <span className="text-semiblack mt-[5rem] font-bold text-6xl">
            Meet Our Team
          </span>
          <span className="text-semiblack text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut sint{" "}
            <br />
            maiores dicta corrupti quae eaque magni praesentium labore, <br />
            numquam cupiditate saepe architecto necessitatibus cumque minima{" "}
            <br />
            culpa sequi. Aliquid, quia non. <br />
          </span>
        </div>
      </section>
      <section className="w-[50%] flex gap-[1rem] pl-[3rem] mt-[3rem]">
        {teamOptions.map((item, key) => (
          <Button
            key={key}
            className={`flex items-center justify-center w-fit rounded-full gap-[0.5rem] px-[3rem] py-[1.5rem] text-lg text-[#17499A] ${
              router.pathname === item.link
                ? "bg-[#E7F6F9] border-4"
                : "bg-none"
            }`}
            onClick={() => router.push(item.link)}
          >
            {item.title}
          </Button>
        ))}
      </section>
    </div>
  );
}
