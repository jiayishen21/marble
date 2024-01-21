import React from "react";
import { Button, Image } from "antd";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

export default function Card(item: any) {
  const { mobile } = useMobile();

  const SocialButtons = (item: any) => {
    return (
      <div className="flex gap-6 mt-2">
        <Button
          type="primary"
          href={item.email}
          target="_blank"
          className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
        >
          <MdEmail />
        </Button>
        <Button
          type="primary"
          href={item.link}
          target="_blank"
          className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
        >
          <FaLinkedin />
        </Button>
      </div>
    );
  };

  return (
    <>
      <Image
        src={item.photo}
        alt={item.name}
        preview={false}
        className={`origin-bottom scale-[1.2] 2xl:scale-[1.5]`}
      />

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
