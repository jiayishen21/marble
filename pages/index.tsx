import type { NextPage } from "next";
import Polywave from "../components/Polywave";
import Navbar from "../components/layout/Navbar";
import { useNavParams } from "../hooks/useNavParams";
import styles from "../styles/Home.module.css"
import { Button } from "antd";

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
        <div className="absolute top-0 left-0 w-screen h-screen z-[-1]"/>
        <section className={`relative flex flex-col gap-12 px-20 h-full ${styles["left-fade"]}`}>
          <div className="flex flex-col gap-3 mt-20 text-semiblack font-bold text-6xl">
              A hedge fund like no other —<br/>
              by students, for students.
          </div>
          <div className="text-airforce font-cairo font-semibold tracking-wide text-3xl">
              “TO INVEST IN THE FUTURE, INVEST IN THOSE WHO BUILD THE FUTURE” <br/>
              — PREFERABLY THIS IS MORE UNIQUE TO MARBLE THAN A QUOTE
          </div>
          <Button type="primary" className="w-60 h-14 bg-lapis rounded-md text-neutral-50 text-2xl 
          font-normal flex justify-center items-center">
            Invest with us
          </Button>
        </section>
      </div>
      <section className={`${styles['buffer']} h-[2rem]`}/>
      <section className="bg-airforce"> 
        <div className="flex flex-col gap-12 pb-[10rem] pt-[8rem]">
          <div className="text-neutral-50 text-6xl font-bold
          text-center">
            Our Mission
          </div>
          <div className=" text-neutral-50 text-3xl font-normal mx-auto text-center">
          Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate <br/>
          libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu <br/>
          ad litora torquent per conubia nostra, per inceptos himenaeos.
          </div>
          <div className="w-screen flex justify-around align-center pt-8 px-10">
            <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded "></div>
            <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded "></div>
            <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded "></div>
          </div>
        </div>
      </section>
      <section className=""> 
        <div className="flex flex-col gap-12 pb-[10rem] pt-[8rem]">
          <div className="text-neutral-50 text-6xl font-bold
          text-center">
            Our Mission
          </div>
          <div className=" text-neutral-50 text-3xl font-normal mx-auto text-center">
          Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate <br/>
          libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu <br/>
          ad litora torquent per conubia nostra, per inceptos himenaeos.
          </div>
          <div className="w-screen flex justify-around align-center pt-8 px-10">
            <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded "></div>
            <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded "></div>
            <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded "></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
