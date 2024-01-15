type data = {
  title: string;
  link: string;
  inactive?: boolean;
};

const quarterData: data[] = [
  {
    title: "2023 Q1 report",
    link: "/",
  },
  {
    title: "2023 Q2 report",
    link: "/",
  },
  {
    title: "2023 Q3 report",
    link: "/",
  },
  {
    title: "2023 Q4 report",
    link: "/",
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
    title: "Coming soon...",
    link: "/",
    inactive: true,
  },
];

export { quarterData, annualData, miscellaneousData };
