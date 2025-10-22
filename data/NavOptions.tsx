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
    stat: "74.31%",
    info: "YTD",
  },
  {
    stat: "$1,200,000",
    info: "AUM",
  },
  {
    stat: "55.13%",
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
