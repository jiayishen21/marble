import type { NextPage } from "next";
import axios from "axios";
import NavBar from "../components/navBar";

const Home: NextPage = () => {
  const onButton = async () => {
    axios
      .get("http://localhost:3000/api/hello")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  };

  return (
    <>
      <NavBar />
      {/* moved what andrew wrote in navbar to index */}
      <div className="flex flex-col justify-between w-full pl-28 pt-28">
        <div className="font-inter text-[#26477C] font-bold text-6xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Hedge Fund,
        </div>
        <div className="font-inter text-[#26477C] font-medium text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pt-2">
          Made by Students, for Students
        </div>
        <div className="font-inter text-[#26477C] font-normal text-3xl pt-12 w-2/3">
          Marble aims to support students with a seamless investing process
          while providing them with the knowledge needed to succeed in all areas
          of finance
        </div>
        <div className="w-64 h-16 bg-zinc-300 bg-opacity-60 rounded mt-2 text-[#26477C] text-4xl font-semibold flex justify-center items-center">
          Get Started
        </div>
      </div>

      <div className="h-screen">
        <div className="font-inter text-[#A4C5CC] text-6xl font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pt-16 text-center">
          Mission Statement
        </div>
        <div className="font-inter text-white text-3xl font-normal mx-auto w-1/2 mt-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div className="w-screen h-1/2 flex justify-around align-center pt-16 px-10">
          <div className="bg-[#D9D9D9] h-96 w-96 bg-opacity-50 rounded "></div>
          <div className="bg-[#D9D9D9] h-96 w-96 bg-opacity-50 rounded "></div>
          <div className="bg-[#D9D9D9] h-96 w-96 bg-opacity-50 rounded "></div>
        </div>
      </div>
    </>
  );
};

export default Home;
