import React from "react";
import { managerContacts } from "../data/memberOptions";
import { memberContacts } from "../data/memberOptions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";

export default function meet() {
  return (
    <>
      <main className="w-full">
        <section className="px-[7rem] gap-[2rem]">
          <div className="flex flex-col gap-[2rem] w-[40%]">
            <h1 className="mt-[5rem] font-bold text-6xl">Meet Our Team</h1>
            <p className="leading-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut sint
              maiores dicta corrupti quae eaque magni praesentium labore,
              numquam cupiditate saepe architecto necessitatibus cumque minima
              culpa sequi. Aliquid, quia non.
            </p>
          </div>
        </section>
        <section className="my-[5rem]">
          <div className="flex gap-[6rem] justify-center items-center">
            {managerContacts.map((manager) => (
              <div className="flex flex-col gap-[1rem] items-center justify-center">
                <Image
                  src={manager.photo}
                  alt={manager.name}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="w-[35rem] h-auto"
                />
                <p className="font-bold text-3xl">{manager.name}</p>
                <p>{manager.role}</p>
                <div className="flex gap-[2rem]">
                  <Button className="rounded-full bg-[#26477C] w-[2rem] h-[2rem] flex justify-center items-center">
                    <Link
                      target="_blank"
                      href={manager.email}
                      style={{ color: "white" }}
                    >
                      {manager.emailIcon}
                    </Link>
                  </Button>
                  <Button className="rounded-full bg-[#26477C] w-[2rem] h-[2rem] flex justify-center items-center">
                    <Link
                      target="_blank"
                      href={manager.link}
                      style={{ color: "white" }}
                    >
                      {manager.linkIcon}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <hr className="bg-[#ADBFCD] mx-[3rem] h-1" />
        <section className="my-[5rem]">
          <div className="grid grid-cols-4 gap-[3rem] justify-center items-center">
            {memberContacts.map((member) => (
              <div className="flex flex-col gap-[1rem] items-center justify-center">
                <Image
                  src={member.photo}
                  alt={member.name}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="w-[20rem] h-auto"
                />
                <p className="font-bold text-3xl">{member.name}</p>
                <p>{member.role}</p>
                <div className="flex gap-[2rem]">
                  <Button className="rounded-full bg-[#26477C] w-[2rem] h-[2rem] flex justify-center items-center">
                    <Link
                      target="_blank"
                      href={member.email}
                      style={{ color: "white" }}
                    >
                      {member.emailIcon}
                    </Link>
                  </Button>
                  <Button className="rounded-full bg-[#26477C] w-[2rem] h-[2rem] flex justify-center items-center">
                    <Link
                      target="_blank"
                      href={member.link}
                      style={{ color: "white" }}
                    >
                      {member.linkIcon}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
