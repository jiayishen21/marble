import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function navBar() {
  return (
    <>
      <nav className="flex items-center justify-between w-screen px-[3rem] py-[2rem]">
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

        <div>
          <ul className="flex justify-center items-center gap-[3rem] pr-[3rem] font-bold text-3xl text-[#26477C]">
            <Link href="/">
              <li>HOME</li>
            </Link>
            <Link href="/">
              <li>TEAM</li>
            </Link>
            <Link href="/">
              <li>RESOURCES</li>
            </Link>
            <Link href="/">
              <li>JOIN</li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}
