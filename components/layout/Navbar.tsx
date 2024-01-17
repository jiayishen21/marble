import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicNavOptions } from "../../data/NavOptions";
import { Button, Dropdown, Menu, Space } from "antd";
import { NextRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IoIosMenu } from "react-icons/io";
import useMobile from "../../hooks/useMobile";

interface Props {
  navRef: MutableRefObject<any>;
  blank: number;
  router: NextRouter;
}

export default function Navbar({ navRef, blank, router }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const { mobile, width } = useMobile();

  const LogoIcon = useMemo(() => {
    return (
      <div className="origin-top-left">
        <Link href="/">
          <Image
            src="/elements/marble.svg"
            alt="Marble logo"
            height={0}
            width={0}
            sizes="100vw"
            className={`h-[50px] md:h-[55px] lg:h-[65px] xl:h-[75px] w-auto`}
          />
        </Link>
      </div>
    );
  }, []);

  const menu = (
    <Menu>
      {PublicNavOptions.map((opt, index) => (
        <Menu.Item
          onClick={() => {
            router.push(opt.route);
          }}
          key={index}
          className="text-center px-4"
        >
          <span className="font-montserrat text-lg xl:text-xl">
            {opt.title}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );

  if (mobile) {
    return (
      <nav
        className="relative flex flex-row items-center justify-between w-full px-[4vw]"
        ref={navRef}
      >
        <section className="flex flex-row gap-5 items-center">
          <Dropdown overlay={menu}>
            <Button type="default">
              <IoIosMenu />
            </Button>
          </Dropdown>
          {width && width > 480 && LogoIcon}
        </section>
        <ul className={`flex justify-center items-center gap-6`}>
          {user ? (
            <Button
              type="primary"
              href="/dashboard"
              className={`bg-lapis text-neutral-50 font-montserrat font-light flex justify-center items-center px-8 text-sm`}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Link href={"/register"}>
                <li
                  className={`nav-option text-semiblack hover:text-lapis whitespace-nowrap font-light text-sm`}
                >
                  Sign Up
                </li>
              </Link>
              <Button
                type="primary"
                href="/login"
                className={`bg-lapis text-neutral-50 font-montserrat font-light flex justify-center items-center px-4 py-2 text-sm`}
              >
                Client Login
              </Button>
            </>
          )}
        </ul>
      </nav>
    );
  }

  if (blank > 0) {
    return (
      <nav
        className="flex items-center justify-between w-full px-12"
        ref={navRef}
        style={{ height: `${blank}px` }}
      >
        <section className="fixed">{LogoIcon}</section>
      </nav>
    );
  }

  return (
    <nav
      className="relative flex flex-row items-center justify-between w-full px-[2vw]"
      ref={navRef}
    >
      <section className="flex flex-row gap-10 xl:gap-12 2xl:gap-14">
        {LogoIcon}
        <ul className={`flex items-center font-light gap-6 xl:gap-7 2xl:gap-8`}>
          {PublicNavOptions.map(
            (opt, key) =>
              !(opt.dropdown && opt.options) && (
                <div key={key}>
                  <Link href={opt.route}>
                    <li
                      className={`nav-option text-semiblack hover:text-lapis transition-all duration-300 
                whitespace-nowrap font-medium text-lg xl:text-xl`}
                    >
                      {opt.title}
                    </li>
                  </Link>
                </div>
              )
          )}
        </ul>
      </section>
      <ul
        className={`flex justify-center items-center gap-6 xl:gap-7 2xl:gap-8`}
      >
        {user ? (
          <Button
            type="primary"
            href="/dashboard"
            className={`bg-lapis text-neutral-50 font-montserrat font-light flex justify-center items-center px-8 text-xl xl:text-2xl h-10 2xl:h-11`}
          >
            Dashboard
          </Button>
        ) : (
          <>
            <Link href={"/register"}>
              <li
                className={`nav-option text-semiblack hover:text-lapis whitespace-nowrap
                  font-medium  text-lg xl:text-xl`}
              >
                Sign Up
              </li>
            </Link>
            <Button
              type="primary"
              href="/login"
              className={`bg-lapis text-slate-300 font-montserrat font-medium flex justify-center items-center px-4 py-2 text-lg xl:text-xl h-10 2xl:h-11`}
            >
              Client Login
            </Button>
          </>
        )}
      </ul>
    </nav>
  );
}
