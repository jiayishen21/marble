import { ReactNode } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

type contacts = {
  name: string;
  photo: string;
  role: string;
  email: string;
  emailIcon: ReactNode;
  link: string;
  linkIcon: ReactNode;
};

const managerContacts: contacts[] = [
  {
    name: "Bill Cai",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "Marshal Guo",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "Lucas Shen",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
];

const memberContacts: contacts[] = [
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
  {
    name: "John Doe",
    photo: "./memberPlace.svg",
    role: "Fund Manager",
    email: "marble@gmail.com",
    emailIcon: <MdOutlineMail />,
    link: "https://www.linkedin.com/company/marble-investmenst/",
    linkIcon: <FaLinkedin />,
  },
];

export { memberContacts, managerContacts };
