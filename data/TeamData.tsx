type Section = {
  title: string;
  members: Member[]
}

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
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    link: "https://www.linkedin.com/company/marble-investments/",
  },
  {
    name: "Marshal Guo",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    link: "https://www.linkedin.com/company/marble-investments/",
  },
  {
    name: "Lucas Shen",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    link: "https://www.linkedin.com/company/marble-investments/",
  },
];

const TeamSections: Section[] = [
  {
    title: "Analysts",
    members:[{
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Analyst",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    }],
  },


  {
    title: "Developers",
    members: [{
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Developer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    }]
  },


  {
    title: "Marketing & Design",
    members: [{
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    },
    {
      name: "John Doe",
      photo: "./memberPlace.svg",
      role: "Designer",
      email: "marble@gmail.com",
      link: "https://www.linkedin.com/company/marble-investments/",
    }]
  },
]


export { LeadMembers, TeamSections };
