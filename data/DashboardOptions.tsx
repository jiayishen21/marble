import { ReactNode } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import React from "react";
import { FaCreativeCommonsShare } from "react-icons/fa6";

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
  // {
  //   title: "Investor Voting",
  //   link: "/dashboard/voting",
  //   icon: <FaVoteYea />,
  // },
  {
    title: "Applications",
    link: "https://docs.google.com/forms/d/1sJNseMrpY093AxLcJ_VYuRPsHISa7auvt6Qvac5ANUk/viewform?edit_requested=true",
    icon: <FaCreativeCommonsShare />,
  },
];

export { dashboardOptions };
