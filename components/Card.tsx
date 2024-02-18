import React from "react";
import { Button } from "antd";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

export default function Card(item: any) {
  const { width } = useMobile();

  const SocialButtons = (item: any) => {
    return (
      <div className="flex gap-6 mt-2">
        {item.email && item.email !== '' ? (
          <Button
            type="primary"
            href={`mailto:${item.email}`}
            target="_blank"
            className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
          >
            <MdEmail />
          </Button>
        ) : (
          <Button
            type="primary"
            disabled={true}
            className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
          >
            <MdEmail />
          </Button>
        )}

        {item.link && item.link !== '' ? (
          <Button
            type="primary"
            href={item.link}
            target="_blank"
            className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
          >
            <FaLinkedin />
          </Button>
        ) : (
          <Button
            type="primary"
            disabled={true}
            className="rounded-full bg-lapis flex items-center justify-center text-white text-xl"
          >
            <FaLinkedin />
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="w-[85%] h-auto relative">
        <Image
          src={item.photo}
          alt={item.name}
          // width={width && width < 525 ? 300 : 180}
          // height={width && width < 525 ? 252 : 151}
          // className={`origin-bottom scale-[1.2] 2xl:scale-[1.5] rounded-md`}
          width={180}
          height={151}
          layout="responsive"
          objectFit="cover"
          className="rounded-md"
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
