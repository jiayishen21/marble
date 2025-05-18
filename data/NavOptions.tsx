type Option = {
  title: string;
  append: string;
};

type NavOption = {
  title: string;
  route: string;
  icon: string; //url, for mobile design
  dropdown: boolean; //has?
  options?: Option[];
};

const BaseNavOptions: NavOption[] = [
  {
    title: "Home",
    route: "/",
    icon: "",
    dropdown: false,
  },
  {
    title: "Our Team",
    route: "/meet",
    icon: "",
    dropdown: false,
  },
  {
    title: "Portfolio",
    route: "/portfolio",
    icon: "",
    dropdown: false,
  },
  {
    title: "Resources",
    route: "/resources",
    icon: "",
    dropdown: false,
    // dropdown: true,
    // options: [
    //   {
    //     title: "Sample Resource 1",
    //     append: "sr1"
    //   },
    //   {
    //     title: "Sample Resource 2",
    //     append: "sr2"
    //   },
    //   {
    //     title: "Sample Resource 3",
    //     append: "sr3"
    //   }
    // ]
  },
  {
    title: "Recruiting Success",
    route: "/recruiting-success",
    icon: "",
    dropdown: false,
  },
];

const missionData = [
  {
    stat: "23.50%",
    info: "YTD",
  },
  {
    stat: "$550,000",
    info: "Portfolio Capital",
  },
  {
    stat: "39.13%",
    info: "IRR",
  },
];

const PublicNavOptions = [
  ...BaseNavOptions,
  // {
  //     title: "JOIN",
  //     route: "/",
  //     icon: "",
  //     dropdown: <></>
  // }
];

const NavOptions = [
  ...BaseNavOptions,
  // {
  //     title: "DASHBOARD",
  //     route: "/",
  //     icon: "",
  //     dropdown: <></>
  // }
];

export { PublicNavOptions, NavOptions, missionData };
