import { useRouter } from "next/router";
import { dashboardOptions } from "../data/DashboardOptions";
import { Button } from "antd";
import React from "react";
import useMobile from "../hooks/useMobile";

export default function DashboardTabs() {
  const router = useRouter();

  const {mobile} = useMobile()

  return (
    <section
      className={`h-full flex flex-col items-start gap-[1.5rem] ${
        mobile ? "w-[10%]" : "w-[25%]"
      }`}
    >
      {dashboardOptions.map((item, key) => (
        <Button
          key={key}
          className={`flex items-center justify-center rounded-full gap-[0.5rem] py-[1.5rem] text-lg text-[#17499A] ${
            router.pathname === item.link ? "bg-[#E7F6F9] border-4" : "bg-none"
          } ${mobile ? "w-[11rem]" : "w-[80%]"}`}
          onClick={() => router.push(item.link)}
        >
          {item.icon} {item.title}
        </Button>
      ))}
    </section>
  );
}
