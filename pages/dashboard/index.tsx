import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import DashboardTabs from "../../components/DashboardTabs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ShareChart from "../../components/ShareChart";
import useMobile from "../../hooks/useMobile";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const shares = useSelector((state: RootState) => state.shares.shares);

  const { mobile } = useMobile();

  const isLoading = !user || !shares.length;

  return (
    <main
      className={`flex w-[70%] py-[8rem] ${mobile ? "ml-[1.5rem]" : "ml-[8rem]"
        }`}
      data-aos={mobile ? undefined : "fade-up"}
    >
      <DashboardTabs />
      <section
        className={`flex flex-col gap-[3rem] w-full ${mobile ? "ml-[10rem]" : "ml-[5rem]"
          }`}
      >
        <h1 className="text-3xl font-bold whitespace-nowrap">
          Welcome back, {user?.firstName}
        </h1>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <article className="flex w-full h-[10%]">
              <div
                className={`border-r-2 border-gray-300 flex-1 h-full flex flex-col justify-center items-start gap-[2rem] ${mobile && "pr-[2rem]"
                  }`}
              >
                <h2 className="text-xl whitespace-nowrap">
                  Total Investment value
                </h2>
                <p className="font-bold text-5xl">
                  {shares.length > 0 && user
                    ? `$${(user.shares * shares[0].price).toFixed(2)}`
                    : "Could not find"}
                </p>
              </div>
              <div
                className={`border-r-2 border-gray-300 flex-1 flex flex-col justify-center items-start h-full gap-[2rem] ${mobile ? "px-[2rem]" : "pl-[3rem]"
                  }`}
              >
                <h2 className="text-xl whitespace-nowrap">
                  Total number of shares
                </h2>
                <p className="font-bold text-5xl">{user?.shares}</p>
              </div>
              <div
                className={`border-r-2 border-gray-300 flex-1 flex flex-col justify-center items-start h-full gap-[2rem] ${mobile ? "px-[2rem]" : "pl-[3rem]"
                  }`}
              >
                <h2 className="text-xl whitespace-nowrap">
                  Single share value
                </h2>
                <p className="font-bold text-5xl">
                  {shares.length > 0
                    ? `$${shares[0].price.toFixed(2)}`
                    : "Could not find"}
                </p>
              </div>
            </article>
            <ShareChart />
          </>
        )}

        <div>
          <h2 className="text-2xl font-bold">Buy or Sell</h2>
          <p className="text-xl mt-[1rem]">
            The feature to buy or sell shares is coming soon. Stay tuned.
            {/* The next open window to buy is{" "}
            <span className="font-bold">2029</span> */}
          </p>
        </div>
        <div className="flex gap-[3rem]">
          <Button
            className="text-lg flex justify-center items-center px-[2rem] py-[1.5rem] text-white bg-[#26477C]"
            disabled={true}
          >
            Buy shares
          </Button>
          <Button
            className="text-lg flex justify-center items-center px-[2rem] py-[1.5rem] border-[#26477C] text-[#26477C]"
            disabled={true}
          >
            Withdraw Shares
          </Button>
        </div>
      </section>
    </main>
  );
}
