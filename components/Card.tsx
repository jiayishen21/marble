import React from "react";
import { Button, Image } from "antd";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import useMobileDetection from "../utils/detectMobile";

export default function Card(item: any) {
  const mobile = useMobileDetection();

  const SocialButtons = (item: any) => {
    return (
      <div className="flex gap-6 mt-2">
        <Button
          type="primary"
          className="rounded-full bg-lapis
      flex items-center justify-center text-white text-xl"
          href={item.email}
          target="_blank"
        >
          <MdEmail />
        </Button>
        <Button
          type="primary"
          className="rounded-full bg-lapis
      flex items-center justify-center text-white text-xl"
          href={item.link}
          target="_blank"
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
        className={`origin-bottom ${!mobile && "scale-[1.5]"}`}
      />

      <span className="text-semiblack font-bold text-3xl font-hind">
        {item.name}
      </span>
      <span className="font-cairo font-normal tracking-wider text-xl text-semiblack">
        {item.role}
      </span>
      {SocialButtons(item)}
    </>
  );
}
