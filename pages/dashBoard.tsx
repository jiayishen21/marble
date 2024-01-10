import React from "react";
import { Button } from "antd";
import { dashBoardOptions } from "../data/DashBoardOptions";
import Link from "next/link";

export default function dashBoard() {
  return (
    <main className="flex flex-col w-full pt-[5rem] px-[8rem] gap-[6rem]">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <section>
        <h2 className="text-3xl">Overview</h2>
        <div className="flex gap-[3.5rem] justify-center items-center mt-[1rem]">
          {dashBoardOptions.map((item, key) => (
            <div
              className="bg-gray-300 flex-1 rounded-md flex justify-center items-center h-[12rem] text-2xl"
              key={key}
            >
              {item.title}
            </div>
          ))}
        </div>
      </section>
      <div className="flex gap-[3rem]">
        <Button className="text-lg flex justify-center items-center px-[2rem] h-20 text-white bg-[#26477C]">
          <Link href={"/"}>Buy shares</Link>
        </Button>
        <Button className="text-lg flex justify-center items-center px-[2rem] h-20 border-[#26477C] text-[#26477C]">
          <Link href={"/"}>Withdraw Shares</Link>
        </Button>
      </div>
    </main>
  );
}
