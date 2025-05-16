import React from "react";
import { Button } from "antd";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs"; // globe icon for portfolio
import useMobile from "../hooks/useMobile";

export default function Card(item: any) {
  const { width } = useMobile();

  const SocialButtons = (item: any) => {
    return (
      <div className="flex gap-6 mt-2">
        <Button
          type="primary"
          href={item.email ? `mailto:${item.email}` : undefined}
          target="_blank"
          disabled={!item.email}
          className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
        >
          <MdEmail />
        </Button>

        <Button
          type="primary"
          href={item.link || undefined}
          target="_blank"
          disabled={!item.link}
          className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
        >
          <FaLinkedin />
        </Button>

        {item.portfolio && (
          <Button
            type="primary"
            href={item.portfolio}
            target="_blank"
            className="rounded-full bg-lapis flex items-center justify-center text-white text-sm font-semibold px-4 h-auto"
          >
            Portfolio
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="w-[80%] h-[360px] relative overflow-hidden rounded-md">
        <Image
          src={item.photo}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <span className="text-semiblack font-bold text-base sm:text-3xl lg:text-4xl font-montserrat whitespace-nowrap">
        {item.name}
      </span>
      <span className="font-cairo font-normal tracking-wider text-xl text-semiblack">
        {item.role}
      </span>
      {SocialButtons(item)}
    </>
  );
}
