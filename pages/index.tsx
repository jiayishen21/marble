import type { NextPage } from "next";
import Polywave from "../components/Polywave";
import Navbar from "../components/layout/Navbar";
import { useNavParams } from "../hooks/useNavParams";
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const {navRef, navHeight} = useNavParams()

  return (
    <main>
      <div
        style={{
          display:"grid",
          gridTemplateRows:`${navHeight}px calc(100vh - ${navHeight}px)`
      }}>
        <Navbar navRef={navRef}/>
        <div className="flex absolute bottom-0 left-0 h-[300px] w-screen overflow-y-hidden pointer-events-none">
          <div className={`absolute bottom-0 left-0 z-[500] w-screen overflow-hidden
          ${styles['bottom-surge']}`}>
              <Polywave/>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-screen h-screen bg-landing z-[-1]"/>
        <section className={`relative flex flex-col gap-8 px-16 h-full ${styles["left-fade"]}`}>
          <div className="flex flex-col gap-3 mt-20">
            <div className="text-lapis font-bold text-6xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              Hedge Fund,
            </div>
            <div className="text-lapis font-medium text-5xl">
              Made by Students, for Students
            </div>
          </div>
          <div className="text-lapis font-normal text-3xl w-[60%]">
            Marble aims to support students with a seamless investing process
            while providing them with the knowledge needed to succeed in all areas
            of finance
          </div>
          <button className="w-64 h-16 bg-white/[0.3] rounded-md text-lapis text-3xl 
          font-medium flex justify-center items-center hover:scale-[1.04] transition-all duration-300">
            Get Started
          </button>
        </section>
      </div>
      <section className={`${styles['buffer']} h-[5rem]`}/>
      <section className="bg-lapis"> 
        <div className="pb-[30rem] pt-[8rem]">
          <div className="font-inter text-[#A4C5CC] text-6xl font-semibold drop-shadow-[0_1px_1px_rgba(255, 255, 255,0.8)] 
          text-center">
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
      </section>
    </main>
  );
};

export default Home;
