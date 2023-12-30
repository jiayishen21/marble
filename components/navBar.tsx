import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function navBar() {
  return (
    <>
      <div className='bg-landing h-[1300px]'>
      <nav className="flex items-start justify-between w-screen h-1/4 p-[1rem]">
        <Link href="/">
          <div className="w-96 h-32">
            <Image className="w-auto max-h-full" src="./marble.svg" alt="marble svg" width={1000} height={50} />
          </div>
        </Link>

        <div className="flex-initial w-5/12 mr-14 h-full">
          <ul className="flex justify-between items-center mt-10 text-3xl font-inter font-semibold text-[#26477C]">
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

      </div>
    </>
  );
}
