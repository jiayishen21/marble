import React, { MutableRefObject } from "react";
import Link from "next/link";
import { PublicNavOptions } from "../../data/NavOptions";
import { ContactOptions } from "../../data/ContactOptions";

export default function Footer() {
  return (
    <footer className="bg-airforce h-[100px] w-full font-hind text-neutral-50 flex">
      <section className="flex flex-1">
        <ul className="flex items-center justify-center gap-[9rem] font-light text-2xl w-full ">
          {PublicNavOptions.map((opt, key) => (
            <div key={key}>
              <Link href={opt.route}>
                <li
                  className="nav-option text-white hover:text-lapis
                hover:scale-[1.04]
                transition-all duration-300"
                >
                  {opt.title}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </section>
      <section className="flex justify-center items-center w-[25%] gap-[3rem]">
        {ContactOptions.map((icon) => (
          <Link href={icon.value} className="text-white text-4xl">
            {icon.icon}
          </Link>
        ))}
      </section>
      <section className="flex w-[25%]">
        <ul className="flex justify-center items-center w-full gap-[4rem]">
          <Link href={"/create"}>
            <li
              className="nav-option text-white hover:text-lapis
          font-light text-2xl"
            >
              Sign Up
            </li>
          </Link>
          <Link href={"/login"}>
            <li
              className="nav-option text-white hover:text-lapis
          font-light text-2xl underline"
            >
              Client Login
            </li>
          </Link>
        </ul>
      </section>
    </footer>
  );
}
