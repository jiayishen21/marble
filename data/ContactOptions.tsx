import { ReactNode } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

type ContactOption = {
    title:string,
    value: string,
    icon:ReactNode, 
}

const ContactOptions:ContactOption[] = [
    {
        title: "EMAIL",
        value: "hello@marble.com",
        icon: <MdOutlineMail/>
    },
    {
        title: "LINKEDIN",
        value: "Keep up with us on Linkedin",
        icon: <FaLinkedin/>
    },
    {
        title: "INSTAGRAM",
        value: "@marbleinvestments",
        icon: <AiFillInstagram/>
    },
]

export {ContactOptions}