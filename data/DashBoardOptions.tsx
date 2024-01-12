import { ReactNode } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import React from "react";

type dashboardType = {
  title: string;
  link: string;
  icon: ReactNode;
};

const dashboardOptions: dashboardType[] = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <AiOutlineStock />,
  },
  {
    title: "Transaction",
    link: "/dashboard/transaction",
    icon: <FaMoneyCheck />,
  },
  {
    title: "Investor Voting",
    link: "/dashboard/voting",
    icon: <FaVoteYea />,
  },
];

export { dashboardOptions };
