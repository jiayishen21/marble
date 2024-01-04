import React, { MutableRefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicNavOptions } from "../../data/NavOptions";
import { Button } from "antd";

interface Props{
  navRef:MutableRefObject<any>,
  blank: boolean
}

export default function Navbar({navRef, blank}:Props) {

  return blank ? 
    <nav className="relative px-12 py-4" ref={navRef}>
      <section className="fixed">
        <Link href="/">
          <Image
            src="/marble.svg"
            alt="Marble logo"
            height={0}
            width={0}
            sizes="100vw"
            className="w-[90%] h-auto"
          />
        </Link>
      </section>
    </nav>
    :
    <nav className="relative flex items-center justify-between w-screen px-12" ref={navRef}>
      {/* example dropdown:
      <div className="absolute top-0 left-0 h-[700px] w-[200px] bg-semiblack"/> */}
      <section className="flex items-center gap-20">
        <Link href="/">
          <Image
            src="/marble.svg"
            alt="Marble logo"
            height={0}
            width={0}
            sizes="100vw"
            className="w-[90%] h-auto"
          />
        </Link>

        <ul className="flex justify-center items-center gap-12 pr-12 font-light text-2xl">
          {PublicNavOptions.map((opt, key) => (
            <div key={key}>
              <Link href={opt.route}>
                <li className="nav-option text-semiblack hover:text-lapis
                hover:scale-[1.04]
                transition-all duration-300">{opt.title}</li>
              </Link>
            </div>
          ))}
        </ul>
      </section>
      <ul className="flex justify-center items-center gap-12 pr-12">
        <Link href={"/create"}>
          <li className="nav-option text-semiblack hover:text-lapis
          font-light text-2xl">Sign Up</li>
        </Link>
        <Button type="primary" className="bg-lapis text-neutral-50 font-hind text-2xl 
          font-light flex justify-center items-center px-8 h-11" href="/login">
            Client Login
          </Button>
      </ul>
    </nav>
  ;
}
