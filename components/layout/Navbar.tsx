import React, { MutableRefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicNavOptions } from "../../data/NavOptions";

interface Props{
  navRef:MutableRefObject<any>
}

export default function Navbar({navRef}:Props) {

  return (
    <nav className="relative flex items-center justify-between w-screen px-12" ref={navRef}>
      {/* example dropdown:
      <div className="absolute top-0 left-0 h-[700px] w-[200px] bg-black"/> */}

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

      <ul className="flex justify-center items-center gap-12 pr-12 font-bold text-3xl">
        {PublicNavOptions.map((opt, key) => (
          <div key={key}>
            <Link href={opt.route}>
              <li className="nav-option text-lapis hover:text-airforce
              hover:scale-[1.04]
              transition-all duration-300">{opt.title}</li>
            </Link>
          </div>
        ))}
      </ul>
    </nav>
  );
}
