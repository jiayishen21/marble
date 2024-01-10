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
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useWindowSize } from "@uidotdev/usehooks";
import { FaBars } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

interface Props {
  navRef: MutableRefObject<any>;
  blank: number;
  router: NextRouter;
}

export default function Navbar({ navRef, blank, router }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const { width } = useWindowSize();
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [burger, setBurger] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    if (width !== null && width !== undefined) {
      setBurger(width < 1750);
    }
  }, [width]);

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
            className={`h-auto ${burger ? "w-[45%]" : "w-[50%]"}`}
          />
        </Link>
      </div>
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCurrentRoute(router.asPath);
    }, 100);
  }, [router.asPath]);

  const renderOptions = useCallback(() => {
    return (
      <div
        className={`${
          burger && "absolute bg-airforce rounded-md z-20 mt-[17rem] ml-[3rem]"
        }`}
      >
        <ul
          className={`flex justify-center font-light ${
            burger
              ? "flex-col w-full font-bold items-start gap-5 h-auto text-md p-5"
              : "items-center pr-12 text-2xl gap-12"
          }`}
        >
          {PublicNavOptions.map((opt, key) =>
            !(opt.dropdown && opt.options) ? (
              <div key={key}>
                <Link href={opt.route}>
                  <li className="nav-option text-semiblack hover:text-lapis transition-all duration-300 px-1">
                    {opt.title}
                  </li>
                </Link>
              </div>
            ) : (
              <Dropdown
                key={key}
                overlay={
                  <Menu>
                    {opt.options.map((subopt: any, subkey: number) => (
                      <Menu.Item
                        key={subkey}
                        onClick={() =>
                          router.push(opt.route + "/" + subopt.append)
                        }
                        className="font-hind"
                      >
                        {subopt.title}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <a href={opt.route}>
                  <Space>
                    {opt.title}
                    <IoMdArrowDropdown />
                  </Space>
                </a>
              </Dropdown>
            )
          )}
        </ul>
      </div>
    );
  }, [burger]);

  if (burger) {
    return (
      <nav className="flex justify-center items-center">
        <div className="px-5 flex justify-center items-center relative">
          <Button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center justify-center text-5xl py-7"
          >
            <FaBars />
          </Button>
          {openMenu && renderOptions()}
        </div>
        <div>{LogoIcon}</div>
        <div className="flex-1 flex justify-end items-center pr-[4.5rem]">
          <Link href="/" className="text-5xl text-[#00299B]">
            <FaRegUserCircle />
          </Link>
        </div>
      </nav>
    );
  }

  return blank > 0 ? (
    <nav
      className="flex items-center justify-between w-full px-12"
      ref={navRef}
      style={{
        height: `${blank}px`,
      }}
    >
      <section className="fixed">{LogoIcon}</section>
    </nav>
  ) : (
    <nav
      className="relative flex items-center justify-between w-full px-12"
      ref={navRef}
    >
      <section className="flex items-center gap-20">
        {LogoIcon}
        {renderOptions()}
      </section>
      <ul className="flex justify-center items-center gap-12 pr-12">
        {user ? (
          <>Dashboard, Profile</>
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
