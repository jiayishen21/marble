import React from "react";
import { useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import useMobile from "../hooks/useMobile";

type Options = {
  title: string;
  link: string;
  inactive?: boolean;
};

type DropdownProps = {
  title: string;
  options: Options[];
};

const Dropdown: React.FC<DropdownProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mobile } = useMobile()

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (mobile) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Button
          onClick={handleToggle}
          className="border-none shadow-none text-lg flex items-center"
        >
          {title} {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
        {isOpen && (
          <div className="flex flex-col">
            {options.map((option, index) => (
              option.inactive ? (
                <span
                  key={index}
                  className="text-gray-500"
                >
                  {option.title}
                </span>
              ) : (
                <Link
                  href={option.link}
                  target='_blank'
                  key={index}
                  className="text-gray-500 hover:underline hover:text-airforce"
                >
                  {option.title}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className="flex flex-col justify-center items-center relative"
      data-aos="fade-up"
    >
      <Button
        onClick={handleToggle}
        className="border-none shadow-none text-lg flex items-center gap-[1rem]"
      >
        {title} {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </Button>
      {isOpen && (
        <div className="flex flex-col z-1 top-full">
          {options.map((option, index) => (
            option.inactive ? (
              <span
                key={index}
                className="text-gray-500"
              >
                {option.title}
              </span>
            ) : (
              <Link
                href={option.link}
                target='_blank'
                key={index}
                className="text-gray-500 hover:underline hover:text-airforce"
              >
                {option.title}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
