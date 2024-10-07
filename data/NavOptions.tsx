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
    title: "Contact Us",
    route: "/contact",
    icon: "",
    dropdown: false,
  },
];

const missionData = [
  {
    stat: "$40,000",
    info: "AUM",
  },
  {
    stat: "67",
    info: "INVESTORS",
  },
  {
    stat: "24.13%",
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
