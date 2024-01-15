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
    photo: "/elements/memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    link: "https://www.linkedin.com/company/marble-investments/",
  },
  {
    name: "Marshal Guo",
    photo: "/elements/memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    link: "https://www.linkedin.com/company/marble-investments/",
  },
  {
    name: "Lucas Shen",
    photo: "/elements/memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    link: "https://www.linkedin.com/company/marble-investments/",
  },
];

const TeamSections: Record<string, TeamMember[]> = {
  Analysts: [
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
  ],
  Developers: [
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
  ],
  Marketing: [
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "/elements/memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
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
