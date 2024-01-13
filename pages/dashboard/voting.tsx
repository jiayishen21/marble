import React from "react";
import DashboardTabs from "../../components/DashboardTabs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PollCard from "../../components/PollCard";

export default function voting() {
  const polls = useSelector((state: RootState) => state.polls.polls);
  return (
    <main className="flex w-[70%] py-[8rem] ml-[10rem]">
      <DashboardTabs />
      <section className="flex flex-col gap-[3rem] w-full ml-[5rem] ">
        <h1 className="text-2xl font-bold">Investor Voting</h1>
        {polls.map((poll, index) => (
          <PollCard key={`poll${index}`} poll={poll} index={index} />
        ))}
      </section>
    </main>
  );
}
