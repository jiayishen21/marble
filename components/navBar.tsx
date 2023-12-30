import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function navBar() {
  return (
    <>
      <div className='bg-landing h-[200vh] bg-cover w-screen overflow-hidden'>
      <div className='h-screen pt-10'>
      <nav className="flex items-start justify-around w-screen">
        <Link href="/">
          <div className="w-96 h-32">
            <Image className="w-auto max-h-full" src="./marble.svg" alt="marble svg" width={1000} height={50} />
          </div>
        </Link>
        <div className="flex-initial w-6/12 h-full">
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
      <div className="flex flex-col justify-between w-full pl-28 pt-28">
          <div className="font-inter text-[#26477C] font-bold text-6xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Hedge Fund,</div>
          <div className="font-inter text-[#26477C] font-medium text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pt-2">Made by Students, for Students</div>
          <div className="font-inter text-[#26477C] font-normal text-3xl pt-12 w-2/3">Marble aims to support students with a seamless investing process while providing them with the knowledge needed to succeed in all areas of finance</div>
          <div className="w-64 h-16 bg-zinc-300 bg-opacity-60 rounded mt-2 text-[#26477C] text-4xl font-semibold flex justify-center items-center">Get Started</div>
        </div>
      </div>
      <div className='h-screen'>
        <div className='font-inter text-[#A4C5CC] text-6xl font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pt-16 text-center'>Mission Statement</div>
        <div className='font-inter text-white text-3xl font-normal mx-auto w-1/2 mt-4 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        <div className='w-screen h-1/2 flex justify-around align-center pt-16 px-10'>
          <div className='bg-[#D9D9D9] h-96 w-96 bg-opacity-50 rounded '></div>
          <div className='bg-[#D9D9D9] h-96 w-96 bg-opacity-50 rounded '></div>
          <div className='bg-[#D9D9D9] h-96 w-96 bg-opacity-50 rounded '></div>
        </div>
      </div>
      </div>
    </>
  );
}
