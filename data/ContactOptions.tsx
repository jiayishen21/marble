import { ReactNode } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

type ContactOption = {
    title: string,
    value: string,
    to: string,
    icon: ReactNode,
}

const ContactOptions: ContactOption[] = [
    {
        title: "EMAIL",
        value: "marbleinvestments2024@gmail.com",
        to: 'mailto:marbleinvestments2024@gmail.com',
        icon: <MdOutlineMail />,
    },
    {
        title: "LINKEDIN",
        value: "Keep up with us on Linkedin",
        to: 'https://www.linkedin.com/company/marble-investments/',
        icon: <FaLinkedin />,
    },
    {
        title: "INSTAGRAM",
        value: "@marbleinvestments",
        to: 'https://www.instagram.com/marbleinvestments/',
        icon: <AiFillInstagram />,
    },
]

export { ContactOptions }