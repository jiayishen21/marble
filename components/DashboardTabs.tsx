import { useRouter } from "next/router";
import { dashboardOptions } from "../data/DashboardOptions";
import { Button } from "antd";
import React from "react";

export default function DashboardTabs() {
  const router = useRouter();

  return (
    <section className="w-[25%] h-full flex flex-col items-start gap-[1.5rem]">
      {dashboardOptions.map((item, key) => (
        <Button
          key={key}
          className={`flex items-center justify-center w-fit rounded-full gap-[0.5rem] px-[3rem] py-[1.5rem] text-lg text-[#17499A] ${
            router.pathname === item.link ? "bg-[#E7F6F9] border-4" : "bg-none"
          }`}
          onClick={() => router.push(item.link)}
        >
          {item.icon} {item.title}
        </Button>
      ))}
    </section>
  );
}
