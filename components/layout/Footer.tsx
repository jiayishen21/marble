import React, { MutableRefObject, useState, useEffect } from "react";
import Link from "next/link";
import { PublicNavOptions } from "../../data/NavOptions";
import { ContactOptions } from "../../data/ContactOptions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Image from "next/image";
import useMobile from "../../hooks/useMobile";

export default function Footer() {
  const user = useSelector((state: RootState) => state.user.user);
  const { mobile } = useMobile();

  if (mobile) {
    return (
      <footer className="bg-[#467099] w-full font-montserrat text-neutral-50 flex flex-col h-fit py-[2rem] gap-[3rem]">
        <section className="flex flex-1">
          <ul className="flex items-center justify-around font-light text-2xl w-full flex-col gap-[1.5rem]">
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
        <section className="flex justify-center items-center gap-[3rem] w-full">
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
        <section className="flex w-full">
          <ul className="flex justify-center items-center w-full gap-[4rem]">
            {user ? (
              <Link href="/dashboard" className="text-2xl">
                Dashboard
              </Link>
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
                    Login
                  </li>
                </Link>
              </>
            )}
          </ul>
        </section>
      </footer>
    );
  }

  return (
    <footer className="px-[2.5rem] pt-[4rem] bg-[#467099] w-full font-montserrat text-neutral-50 flex flex-col h-fit">
      <div className="flex justify-between w-full">
        <section>
          <div className="flex flex-col pl-[4rem] gap-[2rem]">
            {/* <Image
              src="/elements/logo-simple.png"
              alt="Marble logo"
              height={512}
              width={512}
              className="w-[50%] h-auto"
            /> */}
            <div className="w-full justify-center flex">
              <div className="w-[9rem] h-auto relative">
                <Image
                  src="/elements/logo-footer.png"
                  alt="Marble logo"
                  layout="responsive" // This will make the image keep its aspect ratio
                  height={512}
                  width={512}
                  objectFit="contain" // Ensures the image scales down if it doesn't fit in the new size
                />
              </div>
            </div>

            <div className="flex gap-[2rem]">
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
            </div>
          </div>
        </section>
        <section className="flex">
          <ul className="flex flex-col justify-start gap-[1rem] w-[60%]">
            {PublicNavOptions.map((opt, key) => (
              <div key={key}>
                <Link href={opt.route}>
                  <li className="nav-option text-white hover:text-lightblue transition-all duration-300 text-xs lg:text-sm">
                    {opt.title}
                  </li>
                </Link>
              </div>
            ))}
          </ul>
          <ul className="flex flex-col w-[18rem] gap-[1rem] justify-start items-start">
            {user ? (
              <Link href="/dashboard" className="text-xl underline">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href={"/register"}>
                  <li
                    className="nav-option text-white hover:text-lightblue
                      font-light  text-xs lg:text-sm
                      transition-all duration-300"
                  >
                    Sign Up
                  </li>
                </Link>
                <Link href={"/login"}>
                  <li
                    className="nav-option text-white hover:text-lightblue
                      font-light  text-xs lg:text-sm underline 
                      transition-all duration-300"
                  >
                    Login
                  </li>
                </Link>
              </>
            )}
          </ul>
        </section>
      </div>
      <section className="w-full mt-[4rem]">
        <hr />
        <div className="flex py-[2rem] relative items-center">
          <Link
            href="/documents/privacy-policy.pdf"
            className="absolute left-[5%]"
            target="_blank"
          >
            Privacy Policy
          </Link>
          <p className="absolute left-[40%] text-[#FFFFFF] opacity-50">
            Copyright &copy; Marble Investments. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
}
