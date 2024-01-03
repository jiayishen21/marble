import { ReactNode } from "react"

type NavOption = {
    title:string,
    route: string,
    icon:string, //url, for mobile design
    dropdown?: ReactNode, //optional component on dropdown
}

const BaseNavOptions:NavOption[] = [
    {
        title: "Home",
        route: "/",
        icon: "",
        dropdown: <></>
    },
    {
        title: "Team",
        route: "/",
        icon: "",
        dropdown: <></>
    },
    {
        title: "Resources",
        route: "/",
        icon: "",
        dropdown: <></>
    },
    {
        title: "Contact Us",
        route: "/",
        icon: "",
        dropdown: <></>
    },
]

const PublicNavOptions = [
    ...BaseNavOptions,     
    // {
    //     title: "JOIN",
    //     route: "/",
    //     icon: "",
    //     dropdown: <></>
    // }
]

const NavOptions = [
    ...BaseNavOptions,     
    // {
    //     title: "DASHBOARD",
    //     route: "/",
    //     icon: "",
    //     dropdown: <></>
    // }
]

export {PublicNavOptions, NavOptions}