import { ReactNode } from "react"

type NavOption = {
    title:string,
    route: string,
    icon:string, //url, for mobile design
    dropdown?: ReactNode, //optional component on dropdown
}

const BaseNavOptions:NavOption[] = [
    {
        title: "HOME",
        route: "/",
        icon: "",
        dropdown: <></>
    },
    {
        title: "TEAM",
        route: "/",
        icon: "",
        dropdown: <></>
    },
    {
        title: "RESOURCES",
        route: "/",
        icon: "",
        dropdown: <></>
    },
]

const PublicNavOptions = [
    ...BaseNavOptions,     
    {
        title: "JOIN",
        route: "/",
        icon: "",
        dropdown: <></>
    }
]

const NavOptions = [
    ...BaseNavOptions,     
    {
        title: "DASHBOARD",
        route: "/",
        icon: "",
        dropdown: <></>
    }
]

export {PublicNavOptions, NavOptions}