import React from "react";
import { useState } from "react";
import { Button } from "antd";
import Link from "next/link";

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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <Button onClick={handleToggle}>{title}</Button>
      {isOpen && (
        <div className="flex flex-col absolute z-1 top-12">
          {options.map((option, index) => (
            <Link href={option.link} key={index}>
              {option.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
