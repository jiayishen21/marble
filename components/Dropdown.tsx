import React from "react";
import { useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import useMobileDetection from "../utils/detectMobile";

type Options = {
  title: string;
  link: string;
};

type DropdownProps = {
  title: string;
  options: Options[];
};

const Dropdown: React.FC<DropdownProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mobile = useMobileDetection();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (mobile) {
    return (
      <div
        className="flex flex-col justify-center items-center"
        data-aos="fade-up"
      >
        <Button
          onClick={handleToggle}
          className="border-none shadow-none text-lg flex items-center"
        >
          {title} {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </Button>
        {isOpen && (
          <div className="flex flex-col">
            {options.map((option, index) => (
              <Link
                href={option.link}
                key={index}
                className="text-gray-500 hover:underline hover:text-airforce"
              >
                {option.title}
              </Link>
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
        <div className="flex flex-col absolute z-1 top-full">
          {options.map((option, index) => (
            <Link
              href={option.link}
              key={index}
              className="text-gray-500 hover:underline hover:text-airforce"
            >
              {option.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
