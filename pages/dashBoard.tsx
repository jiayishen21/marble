import React from "react";
import { Button } from "antd";
import DashBoardTabs from "../components/DashBoardTabs";

export default function dashBoard() {
  return (
    <main className="flex w-[70%] pt-[8rem] ml-[8rem]">
      <DashBoardTabs />
      <section className="flex flex-col gap-[3rem] w-full ml-[5rem]">
        <h1 className="text-2xl font-bold">Jessica's Marble Dashboard</h1>
        {/* place holder values until backend data is connected */}
        <article className="flex w-full h-[10%]">
          <div className="border-r-2 border-gray-300  flex-1 h-full flex flex-col justify-center items-start gap-[2rem]">
            <h2 className="text-xl">Total Investment value</h2>
            <p className="font-bold text-5xl">$XXX</p>
          </div>
          <div className="border-r-2 border-grey-700 flex-1 flex flex-col justify-center items-start h-full pl-[3rem] gap-[2rem]">
            <h2 className="text-xl">Total number of shares</h2>
            <p className="font-bold text-5xl">4</p>
          </div>
          <div className="border-r-2 border-grey-700 flex-1 flex flex-col justify-center items-start h-full pl-[3rem] gap-[2rem]">
            <h2 className="text-xl">Single share value</h2>
            <p className="font-bold text-5xl">$xxx</p>
          </div>
        </article>
        <div className="w-full h-[35%] bg-gray-300 rounded-md"></div>
        <div>
          <h2 className="text-2xl font-bold">Buy or Sell</h2>
          <p className="text-xl mt-[1rem]">
            The next open window to buy is{" "}
            <span className="font-bold">2029</span>
          </p>
        </div>
        <div className="flex gap-[3rem]">
          <Button className="text-lg flex justify-center items-center px-[2rem] h-20 text-white bg-[#26477C]">
            Buy shares
          </Button>
          <Button className="text-lg flex justify-center items-center px-[2rem] h-20 border-[#26477C] text-[#26477C]">
            Withdraw Shares
          </Button>
        </div>
      </section>
    </main>
  );
}
