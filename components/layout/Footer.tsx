import React, { MutableRefObject, useState, useEffect } from "react";
import Link from "next/link";
import { PublicNavOptions } from "../../data/NavOptions";
import { ContactOptions } from "../../data/ContactOptions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useMobileDetection from "../../utils/detectMobile";

export default function Footer() {
  const user = useSelector((state: RootState) => state.user.user);
  const mobile = useMobileDetection();

  return (
    <footer
      className={`bg-airforce w-full font-hind text-neutral-50 flex ${
        mobile ? "flex-col h-fit py-[2rem] gap-[3rem]" : "h-[100px]"
      }`}
    >
      <section className="flex flex-1">
        <ul
          className={`flex items-center justify-around font-light text-2xl w-full ${
            mobile && "flex-col gap-[1.5rem]"
          }`}
        >
          {PublicNavOptions.map((opt, key) => (
            <div key={key}>
              <Link href={opt.route}>
                <li className="nav-option text-white hover:text-lightblue transition-all duration-300">
                  {opt.title}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </section>
      <section
        className={`flex justify-center items-center gap-[3rem] ${
          mobile ? "w-full" : "w-[25%]"
        }`}
      >
        {ContactOptions.map((icon, key) => (
          <Link
            key={key}
            href={icon.to}
            target="_blank"
            className="text-white text-4xl hover:text-lightblue 
          transition-all duration-300"
          >
            {icon.icon}
          </Link>
        ))}
      </section>
      <section className={`flex ${mobile ? "w-full" : "w-[25%]"}`}>
        <ul className="flex justify-center items-center w-full gap-[4rem]">
          {user ? (
            <>Dashboard, profile</>
          ) : (
            <>
              <Link href={"/create"}>
                <li
                  className="nav-option text-white hover:text-lightblue
                      font-light text-2xl 
                      transition-all duration-300"
                >
                  Sign Up
                </li>
              </Link>
              <Link href={"/login"}>
                <li
                  className="nav-option text-white hover:text-lightblue
                      font-light text-2xl underline 
                      transition-all duration-300"
                >
                  Client Login
                </li>
              </Link>
            </>
          )}
        </ul>
      </section>
    </footer>
  );
}
