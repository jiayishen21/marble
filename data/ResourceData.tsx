type data = {
  title: string;
  link: string;
  inactive?: boolean;
};

const quarterData23: data[] = [
  {
    title: "2023 Q4 report",
    link: "/resources/2023_Q4_Shareholder_Letter.pdf",
  },
];

const quarterData24: data[] = [
  {
    title: "2024 Q2 report",
    link: "/resources/Marble_Investments_2024_Q2_Report.pdf",
  },
];

const annualData: data[] = [
  {
    title: "Coming soon...",
    link: "/",
    inactive: true,
  },
];

const miscellaneousData: data[] = [
  // {
  //   title: "Coming soon...",
  //   link: "/",
  //   inactive: true,
  // },
  // {
  //   title: "2024 Market Insights",
  //   link: "/resources/2024_Insights.pdf",
  // },
  {
    title: "TSMC Equity Report",
    link: "/resources/Marble TSMC Equity Report.pdf",
  },
];

export { quarterData23, quarterData24, annualData, miscellaneousData };
