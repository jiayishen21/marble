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
    role: "Fund Manager",
    email: "bill.cai.2005@gmail.com",
    link: "linkedin.com/in/bill-cai-37b3561b8",
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
      name: "Meryl Tu",
      photo: "/members/analysts/meryl-tu.png",
      role: "Analyst",
      email: "",
      link: "",
    },
    {
      name: "Joanna Liu",
      photo: "/members/analysts/joanna-liu.png",
      role: "Analyst",
      email: "",
      link: "",
    },
    {
      name: "Ryan Ling",
      photo: "/members/analysts/ryan-ling.png",
      role: "Analyst",

      email: "",
      link: "",
    },
  ],
  Marketing: [
    {
      name: "Jessica Wang",
      photo: "/members/marketing/jessica-wang.png",
      role: "UI/UX Design",
      email: "jessica.wang255@gmail.com",
      link: "https://www.linkedin.com/in/jwang255/",
    },
    {
      name: "Jonathan Pan",
      photo: "/members/marketing/johnathan-pan.png",
      role: "Design",
      email: "jonathanpan66@gmail.com",
      link: "https://www.linkedin.com/in/jonathanpan6/",
    },
    {
      name: "Ethan Louie",
      photo: "/members/marketing/ethan-louie.png",
      role: "Design",
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
    title: "Marketing",
    link: "/meet/marketing",
  },
];

export { LeadMembers, TeamSections, teamOptions };
