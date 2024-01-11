import { ReactNode } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import React from "react";

type dashBoardType = {
  title: string;
  link: string;
  icon: ReactNode;
};

const dashBoardOptions: dashBoardType[] = [
  {
    title: "Dashboard",
    link: "/dashBoard",
    icon: <AiOutlineStock />,
  },
  {
    title: "Transaction",
    link: "/transaction",
    icon: <FaMoneyCheck />,
  },
  {
    title: "Investor Voting",
    link: "/voting",
    icon: <FaVoteYea />,
  },
];

export { dashBoardOptions };
