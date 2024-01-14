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
import { IoIosMenu } from "react-icons/io";
import useMobileDetection from "../../utils/detectMobile";

interface Props {
  navRef: MutableRefObject<any>;
  blank: number;
  router: NextRouter;
}

export default function Navbar({ navRef, blank, router }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const { width } = useWindowSize();
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [medium, setMedium] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const mobile = useMobileDetection();

  useEffect(() => {
    if (width !== null && width !== undefined) {
      setMedium(width <= 1600);
    }
  }, [width]);

  const LogoIcon = useMemo(() => {
    return (
      <div className="scale-[1.4] origin-top-left">
        <Link href="/">
          <Image
            src="/elements/marble.svg"
            alt="Marble logo"
            height={0}
            width={0}
            sizes="100vw"
            className={`h-auto ${medium ? "w-full" : "w-[50%]"}`}
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
          mobile && "absolute bg-white rounded-lg z-20 mt-[17rem] ml-[6rem]"
        }`}
      >
        <ul
          className={`flex justify-center font-light gap-12 ${
            mobile
              ? "flex-col w-full font-bold items-start gap-5 h-auto text-md p-5"
              : "items-center"
          } ${medium && !mobile ? "items-center gap-8 pr-[8rem]" : "text-xl"}`}
        >
          {PublicNavOptions.map(
            (opt, key) =>
              !(opt.dropdown && opt.options) && (
                <div key={key}>
                  <Link href={opt.route}>
                    <li
                      className={`nav-option text-semiblack hover:text-lapis transition-all duration-300 text-2xl whitespace-nowrap ${
                        medium && !mobile ? "text-xl" : ""
                      }`}
                    >
                      {opt.title}
                    </li>
                  </Link>
                </div>
              )
          )}
        </ul>
      </div>
    );
  }, [medium, mobile]);

  if (mobile) {
    return (
      <nav className="flex justify-between items-center px-[2rem]">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center relative">
            <Button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center justify-center text-4xl border-none"
            >
              <IoIosMenu />
            </Button>
            {openMenu && renderOptions()}
          </div>
          {!mobile && <div>{LogoIcon}</div>}
        </div>
        {user ? (
          <Link
            href="/dashboard"
            className="text-[#26477C] text-xl mr-[2rem] whitespace-nowrap"
          >
            My Dashboard
          </Link>
        ) : (
          <div className="flex-1 flex items-center justify-end pr-[2rem]">
            <Link
              href={"/register"}
              className="nav-option text-semiblack hover:text-lapis font-light text-sm pr-[1.5rem]"
            >
              Sign Up
            </Link>
            <Button
              type="primary"
              className="bg-lapis text-neutral-50 font-hind text-sm
                font-light flex justify-center items-center"
              href="/login"
            >
              Client Login
            </Button>
          </div>
        )}
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
      <ul
        className={`flex justify-center items-center ${
          medium ? "gap-6" : "gap-12"
        }`}
      >
        {user ? (
          <Link href="/dashboard" className="text-[#26477C] text-2xl">
            My Dashboard
          </Link>
        ) : (
          <>
            <Link href={"/register"}>
              <li
                className={`nav-option text-semiblack hover:text-lapis whitespace-nowrap
                  font-light ${medium ? "text-lg" : "text-2xl"}`}
              >
                Sign Up
              </li>
            </Link>
            <Button
              type="primary"
              className={`bg-lapis text-neutral-50 font-hind 
                font-light flex justify-center items-center ${
                  medium ? "text-lg px-4 h-9" : "px-8 text-2xl h-11"
                }`}
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
