export type TeamMember = {
  name: string;
  photo: string;
  role: string;
  email: string;
  link: string;
  portfolio?: string;
};

type Member = {
  name: string;
  photo: string;
  role: string;
  email: string;
  link: string;
  portfolio?: string;
};

const LeadMembers: Member[] = [
  {
    name: "Bill Cai",
    photo: "/members/managers/bill-cai.png",
    role: "Thematic",
    email: "bill.cai.2005@gmail.com",
    link: "https://www.linkedin.com/in/bill-cai-37b3561b8/",
    portfolio: "https://docs.google.com/spreadsheets/d/1rJiaKyP8REtmNNzKcuPaaP1oYtiFs1cJB1goSHTnZfo/edit?gid=1056952550#gid=1056952550",
  },
  {
    name: "Marshal Guo",
    photo: "/members/managers/marshal-guo.png",
    role: "Value",
    email: "guomarshal@gmail.com",
    link: "https://www.linkedin.com/in/marshal-guo-a06ab2231/",
  },
  {
    name: "Calvin Luo",
    photo: "/members/managers/calvin-luo.png",
    role: "Value",
    email: "cluo86@uwo.ca",
    link: "https://www.linkedin.com/in/calvin-luo22/",
  },
  {
    name: "David Hu-Liu",
    photo: "/members/managers/david-hu-liu.png",
    role: "Quant",
    email: "huliud9vid@gmail.com",
    link: "https://www.linkedin.com/in/d-huliu/",
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
  Operations: [
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
    {
      name: "Jessica Wang",
      photo: "/members/marketing/jessica-wang.png",
      role: "UI/UX Design",
      email: "jessica.wang255@gmail.com",
      link: "https://www.linkedin.com/in/jwang255/",
    },
    {
      name: "Ethan Louie",
      photo: "/members/marketing/ethan-louie.png",
      role: "Graphic Design",
      email: "e.louie007@gmail.com",
      link: "https://www.linkedin.com/in/ethanlouie-/",
    },
    {
      name: "Hayley Chai",
      photo: "/members/blank-pfp.png",
      role: "Graphic Design",
      email: "hayleyjhchai@gmail.com",
      link: "https://www.linkedin.com/in/hayley-jinghan-chai/",
    },
    {
      name: "Felix Qin",
      photo: "/members/blank-pfp.png",
      role: "Operations",
      email: "felixqin21@gmail.com",
      link: "https://www.linkedin.com/in/felix-qin/",
    },
  ],
  Analysts: [
    {
      name: "Meryl Tu",
      photo: "/members/analysts/meryl-tu.png",
      role: "Analyst",
      email: "mtu25@uwo.ca",
      link: "https://www.linkedin.com/in/meryl-tu/",
    },
    {
      name: "Leon Mu",
      photo: "/members/analysts/leon-mu.png",
      role: "Analyst",
      email: "",
      link: "https://www.linkedin.com/in/leon-mu-0b9b6b28b/",
    },
    {
      name: "Eric Ma",
      photo: "/members/analysts/eric-ma.png",
      role: "Analyst",
      email: "ericma549@gmail.com",
      link: "https://www.linkedin.com/in/eric-ma-274142242/",
    },
    {
      name: "Nick Chen",
      photo: "/members/analysts/nick-chen.png",
      role: "Analyst",
      email: "omfinick@gmail.com",
      link: "https://ca.linkedin.com/in/zhong-han-chen-89bb56296/",
    },
    {
      name: "Peter Bai",
      photo: "/members/analysts/peter-bai.png",
      role: "Analyst",
      email: "pbai6@uwo.ca",
      link: "https://www.linkedin.com/in/peter-bai/",
    },
    {
      name: "Ryan Ku",
      photo: "/members/analysts/ryan-ku.png",
      role: "Analyst",
      email: "rku4@uwo.ca",
      link: "https://www.linkedin.com/in/ryan-ku/",
    },
    {
      name: "Rahul Solleti",
      photo: "/members/analysts/rahul-soletti.png",
      role: "Junior Analyst",
      email: "",
      link: "https://www.linkedin.com/in/rahulsolleti/",
    },
    {
      name: "Darren Tsui",
      photo: "/members/analysts/darren-tsui.png",
      role: "Junior Analyst",
      email: "ttsui26@uwo.ca",
      link: "https://www.linkedin.com/in/tsz-chun-darren-tsui/",
    },
    {
      name: "Bruce Dai",
      photo: "/members/analysts/bruce-dai.png",
      role: "Junior Analyst",
      email: "bdai24@uwo.ca",
      link: "https://www.linkedin.com/in/brucedai06/",
    },
    {
      name: "Clyde Wang",
      photo: "/members/analysts/clyde-wang.png",
      role: "Junior Analyst",
      email: "cwan432@uwo.ca",
      link: "https://www.linkedin.com/in/clyde-wang/",
    },
  ],
  // Design: [
  //   {
  //     name: "Jessica Wang",
  //     photo: "/members/marketing/jessica-wang.png",
  //     role: "UI/UX Design",
  //     email: "jessica.wang255@gmail.com",
  //     link: "https://www.linkedin.com/in/jwang255/",
  //   },
  //   {
  //     name: "Ethan Louie",
  //     photo: "/members/marketing/ethan-louie.png",
  //     role: "Graphic Design",
  //     email: "e.louie007@gmail.com",
  //     link: "https://www.linkedin.com/in/ethanlouie-/",
  //   },
  //   {
  //     name: "Hayley Chai",
  //     photo: "/members/blank-pfp.png",
  //     role: "Graphic Design",
  //     email: "hayleyjhchai@gmail.com",
  //     link: "https://www.linkedin.com/in/hayley-jinghan-chai/",
  //   },
  //   // {
  //   //   name: "Jonathan Pan",
  //   //   photo: "/members/marketing/johnathan-pan.png",
  //   //   role: "Designer",
  //   //   email: "jonathanpan66@gmail.com",
  //   //   link: "https://www.linkedin.com/in/jonathanpan6/",
  //   // },
  // ],
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
    title: "Operations",
    link: "/meet/operations",
  },
  // {
  //   title: "Design",
  //   link: "/meet/design",
  // },
];

export { LeadMembers, TeamSections, teamOptions };
