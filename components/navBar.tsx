import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function navBar() {
  return (
    <>
      <nav className="flex items-center justify-between w-screen h-1/4 p-[1rem]">
        <Link href="/">
          <div className="w-96 h-32">
            <Image className="w-auto max-h-full" src="./marble.svg" alt="marble svg" width={1000} height={50} />
          </div>
        </Link>

        <div className="flex-initial w-5/12 mr-14 h-full">
          <ul className="flex justify-between items-center mb-12 text-3xl">
            <Link href="/">
              <li>About us</li>
            </Link>
            <Link href="/">
              <li>Our Team</li>
            </Link>
            <Link href="/">
              <li>Resources</li>
            </Link>
            <Link href="/">
              <li>Dashboard</li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}
