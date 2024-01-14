import React, { useState, useEffect } from "react";
import { Button } from "antd";
import DashboardTabs from "../../components/DashboardTabs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ShareChart from "../../components/ShareChart";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const shares = useSelector((state: RootState) => state.shares.shares);

  return (
    <main className="flex w-[70%] py-[8rem] ml-[8rem]" data-aos="fade-up">
      <DashboardTabs />
      <section className="flex flex-col gap-[3rem] w-full ml-[5rem] ">
        <h1 className="text-2xl font-bold">Investor Voting</h1>
        <article className="flex w-full h-[10%]">
          <div className="border-r-2 border-gray-300  flex-1 h-full flex flex-col justify-center items-start gap-[2rem]">
            <h2 className="text-xl">Total Investment value</h2>
            <p className="font-bold text-5xl">
              {shares.length > 0 && user
                ? `$${(user.shares * shares[0].price).toFixed(2)}`
                : "Could not find"}
            </p>
          </div>
          <div className="border-r-2 border-grey-700 flex-1 flex flex-col justify-center items-start h-full pl-[3rem] gap-[2rem]">
            <h2 className="text-xl">Total number of shares</h2>
            <p className="font-bold text-5xl">{user?.shares}</p>
          </div>
          <div className="border-r-2 border-grey-700 flex-1 flex flex-col justify-center items-start h-full pl-[3rem] gap-[2rem]">
            <h2 className="text-xl">Single share value</h2>
            <p className="font-bold text-5xl">
              {shares.length > 0
                ? `$${shares[0].price.toFixed(2)}`
                : "Could not find"}
            </p>
          </div>
        </article>
        <ShareChart />
        <div>
          <h2 className="text-2xl font-bold">Buy or Sell</h2>
          <p className="text-xl mt-[1rem]">
            The next open window to buy is{" "}
            <span className="font-bold">2029</span>
          </p>
        </div>
        <div className="flex gap-[3rem]">
          <Button className="text-lg flex justify-center items-center px-[2rem] py-[1.5rem] text-white bg-[#26477C]">
            Buy shares
          </Button>
          <Button className="text-lg flex justify-center items-center px-[2rem] py-[1.5rem] border-[#26477C] text-[#26477C]">
            Withdraw Shares
          </Button>
        </div>
      </section>
    </main>
  );
}
