export type TeamMember = {
  name: string;
  photo: string;
  role: string;
  email: string;
  link: string;
};

type Member = {
  name: string;
  photo: string;
  role: string;
  email: string;
  link: string;
};

const LeadMembers: Member[] = [
  {
    name: "Bill Cai",
    photo: "/members/blank-pfp.png",
    role: "Principal Fund Manager",
    email: "",
    link: "",
  },
  {
    name: "Marshal Guo",
    photo: "/members/managers/marshal-guo.png",
    role: "Fund Manager",
    email: "guomarshal@gmail.com",
    link: "https://www.linkedin.com/in/marshal-guo-a06ab2231/",
  },
];

const TeamSections: Record<string, TeamMember[]> = {
  // Analysts: [
  //   // {
  //   //   name: "John Doe",
  //   //   photo: "/elements/memberPlace.svg",
  //   //   role: "Analyst",
  //   //   email: "marble@gmail.com",
  //   //   link: "https://www.linkedin.com/company/marble-investments/",
  //   // },
  // ],
  Developers: [
    {
      name: "Lucas Shen",
      photo: "/members/developers/lucas-shen.png",
      role: "Software Engineer",
      email: "lucasshen21@gmail.com",
      link: "https://www.linkedin.com/in/lucas-shen/",
    },
    {
      name: "Anthony Qiu",
      photo: "/members/blank-pfp.png",
      role: "Frontend Developer",
      email: "aq0335@gmail.com",
      link: "https://www.linkedin.com/in/anthony-qiu-3b8817288/",
    },
    {
      name: "John Liu",
      photo: "/members/developers/john-liu.png",
      role: "Frontend Developer",
      email: "john4button@gmail.com",
      link: "https://www.linkedin.com/in/john--liu/",
    },
  ],
  Analysts: [
    {
      name: "Curtis Li",
      photo: "/members/analysts/curtis-li.png",
      role: "Analyst",
      email: "cli2425@uwo.ca",
      link: "https://www.linkedin.com/in/curtis-li-203316261/",
    },
    {
      name: "Meryl Tu",
      photo: "/members/analysts/meryl-tu.png",
      role: "Analyst",
      email: "mtu25@uwo.ca",
      link: "https://www.linkedin.com/in/meryl-tu/",
    },
    {
      name: "Adam Goldband",
      photo: "/members/analysts/adam-goldband.png",
      role: "Analyst",
      email: "agoldban@uwo.ca",
      link: "https://www.linkedin.com/in/adam-goldband/",
    },
    {
      name: "Eric Ma",
      photo: "/members/analysts/eric-ma.png",
      role: "Analyst",
      email: "ericma549@gmail.com",
      link: "https://www.linkedin.com/in/eric-ma-274142242/",
    },
    // {
    //   name: "Ryan Ling",
    //   photo: "/members/analysts/ryan-ling.png",
    //   role: "Analyst",
    //   email: "ryanling42@gmail.com",
    //   link: "https://www.linkedin.com/in/ryan-ling-0251b6231/",
    // },
    {
      name: "Nick Chen",
      photo: "/members/analysts/nick-chen.png",
      role: "Analyst",
      email: "omfinick@gmail.com",
      link: "https://ca.linkedin.com/in/zhong-han-chen-89bb56296/",
    },
    {
      name: "Peter Bai",
      photo: "/members/blank-pfp.png",
      role: "Analyst",
      email: "pbai6@uwo.ca",
      link: "https://www.linkedin.com/in/peter-bai/",
    },
    {
      name: "Jia Jia He",
      photo: "/members/blank-pfp.png",
      role: "Analyst",
      email: "jiajiahe5730@gmail.com",
      link: "https://www.linkedin.com/in/jiajiahe05/",
    },
  ],
  Design: [
    {
      name: "Jessica Wang",
      photo: "/members/marketing/jessica-wang.png",
      role: "UI/UX Designer",
      email: "jessica.wang255@gmail.com",
      link: "https://www.linkedin.com/in/jwang255/",
    },
    // {
    //   name: "Jonathan Pan",
    //   photo: "/members/marketing/johnathan-pan.png",
    //   role: "Designer",
    //   email: "jonathanpan66@gmail.com",
    //   link: "https://www.linkedin.com/in/jonathanpan6/",
    // },
    {
      name: "Ethan Louie",
      photo: "/members/marketing/ethan-louie.png",
      role: "Designer",
      email: "e.louie007@gmail.com",
      link: "https://www.linkedin.com/in/ethanlouie-/",
    },
  ],
};

type teamType = {
  title: string;
  link: string;
};

const teamOptions: teamType[] = [
  {
    title: "Managers",
    link: "/meet",
  },
  {
    title: "Analysts",
    link: "/meet/analysts",
  },
  {
    title: "Developers",
    link: "/meet/developer",
  },
  {
    title: "Design",
    link: "/meet/design",
  },
];

export { LeadMembers, TeamSections, teamOptions };
