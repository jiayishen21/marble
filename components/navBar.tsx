import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function navBar() {
  return (
    <>
      <nav className="flex items-center justify-between w-screen p-[1rem]">
        <Link href="/">
          <div className="">
            <Image src="./marble.svg" alt="marble svg" width={50} height={50} />
          </div>
        </Link>

        <div>
          <ul className="flex justify-center items-center">
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
