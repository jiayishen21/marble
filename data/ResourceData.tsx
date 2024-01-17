type data = {
  title: string;
  link: string;
  inactive?: boolean;
};

const quarterData: data[] = [
  {
    title: "2023 Q4 report",
    link: "/resources/2023_Q4_Shareholder_Letter.pdf",

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
  {
    title: "2024 Market Insights",
    link: "/resources/2024_Insights.pdf",
  },
];

export { quarterData, annualData, miscellaneousData };
