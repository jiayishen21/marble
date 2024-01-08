import React, { MutableRefObject, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicNavOptions } from "../../data/NavOptions";
import { Button, Dropdown, Menu, Space } from "antd";
import { NextRouter } from "next/router";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  navRef: MutableRefObject<any>;
  blank: number;
  router: NextRouter;
}

export default function Navbar({ navRef, blank, router }: Props) {
  const user = useSelector((state: RootState) => state.user.user);

  const [currentRoute, setCurrentRoute] = useState<string>("");

  const LogoIcon = useMemo(() => {
    return (
      <div className="scale-[1.4] origin-top-left">
        <Link href="/">
          <Image
            src="/marble.svg"
            alt="Marble logo"
            height={0}
            width={0}
            sizes="100vw"
            className="w-[50%] h-auto"
          />
        </Link>
      </div>
    )
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setCurrentRoute(router.asPath);
    }, 100);
  }, [router.asPath]);

  return blank > 0 ? (
    <nav
      className="flex items-center justify-between w-full px-12"
      ref={navRef}
      style={{
        height: `${blank}px`
      }}
    >
      <section className="fixed">
        {LogoIcon}
      </section>
    </nav>
  ) : (
    <nav
      className="relative flex items-center justify-between w-full px-12"
      ref={navRef}
    >
      {/* example dropdown:
      <div className="absolute top-0 left-0 h-[700px] w-[200px] bg-semiblack"/> */}
      <section className="flex items-center gap-20">
        {LogoIcon}
        <ul className="flex justify-center items-center gap-12 pr-12 font-light text-2xl">
          {PublicNavOptions.map((opt, key) => !(opt.dropdown && opt.options) ? (
            <div key={key}>
              <Link href={opt.route}>
                <li
                  className="nav-option text-semiblack hover:text-lapis
                  transition-all duration-300 px-1"
                >
                  {opt.title}
                </li>
              </Link>
            </div>
          ) :
            (
              <Dropdown
                key={key}
                overlay={(
                  <Menu>
                    {opt.options.map((subopt, subkey) => (
                      <Menu.Item key={subkey} onClick={() => router.push(opt.route + "/" + subopt.append)}
                        className="font-hind">
                        {subopt.title}
                      </Menu.Item>
                    ))}
                  </Menu>
                )}>
                <a href={opt.route}>
                  <Space>
                    {opt.title}
                    <IoMdArrowDropdown />
                  </Space>
                </a>
              </Dropdown>
            ))}
        </ul>
      </section>
      <ul className="flex justify-center items-center gap-12 pr-12">
        {user ? (
          <>
            Dashboard, Profile
          </>
        ) : (
          <>
            <Link href={"/create"}>
              <li
                className="nav-option text-semiblack hover:text-lapis
                  font-light text-2xl"
              >
                Sign Up
              </li>
            </Link>
            <Button
              type="primary"
              className="bg-lapis text-neutral-50 font-hind text-2xl 
                font-light flex justify-center items-center px-8 h-11"
              href="/login"
            >
              Client Login
            </Button>
          </>
        )}
      </ul>
    </nav>
  );
}
