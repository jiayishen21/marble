import type { NextPage } from "next";
import Navbar from "../components/layout/Navbar";
import { useNavParams } from "../hooks/useNavParams";
import { Button } from "antd";
import ContactForm from "../components/ContactForm";
import Footer from "../components/layout/Footer";
import { useRouter } from "next/router";
import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { missionData } from "../data/NavOptions";
import Image from "next/image";
import useMobile from "../hooks/useMobile";

const Home: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { navRef, navHeight } = useNavParams();
  const router = useRouter();

  const { mobile, width } = useMobile();

  return (
    <main className="overflow-x-hidden w-full">
      <div className="h-screen">
        <section
          className={`relative flex flex-col items-center lg:items-start gap-6 lg:gap-9 2xl:gap-12 px-[1.5rem] md:px-[2.5rem] 
          lg:px-[3.5rem] xl:px-[4.5rem] 2xl:px-[6.5rem]`}
        >
          <div className="absolute right-0 z-0" data-aos="fade-left">
            <div className="relative z-0">
              <img
                src="/elements/hextiles.png"
                className="w-[30vw] h-auto max-sm:hidden"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa] to-transparent opacity-90 h-[30%]"></div>
            </div>
          </div>
          <div
            className="max-w-[70rem] w-full sm:w-[70%] lg:w-[90%] xl:w-[90%] z-10"
            data-aos="fade-right"
          >
            <h1
              className={`flex flex-col gap-3 text-semiblack font-bold leading-[1.3] z-[10] text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  2xl:text-6xl mt-[7vh] sm:mt-[18vh] text-center lg:text-left lg:mt-[20vh] 2xl:mt-[15vh]`}
            >
              Marble Investments <br />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Modern Strategy, Timeless Fundamentals
              </span>
            </h1>
            <h2
              className={`text-airforce font-cairo font-bold tracking-wide z-[10] uppercase leading-[1.6] text-sm sm:text-base md:text-xl
            2xl:text-2xl mt-6 text-center lg:text-left lg:mt-12 2xl:mt-16 lg:w-[75%]`}
            >
              Multi-strategy experimental fund integrating value, thematic, and
              quantitative principles backed by private capital
            </h2>
          </div>
          {!user && (
            <Button
              type="primary"
              href="/portfolio"
              className={` bg-lapis rounded-md text-neutral-50 text-xs xl:text-xl p-2 xl:px-5 xl:py-7 font-montserrat font-normal flex 
              justify-center items-center`}
              data-aos="fade-right"
            >
              Our Portfolio
            </Button>
          )}
        </section>
      </div>
      <section
        className={`bg-cover bg-center bg-no-repeat min-w-screen flex flex-col linear-wave 
      -mt-[30vh] md:-mt-[23vh] lg:-mt-[20vh] py-[30vw] md:py-[14vw] px-[1.5rem] md:px-[2.5rem] 
      lg:px-[3.5rem] xl:px-[4.5rem] 2xl:px-[6.5rem] items-center justify-start `}
      >
        <h3
          className={`text-neutral-50 font-bold mb-5
        text-center text-3xl md:text-4xl xl:text-5xl`}
          data-aos="fade-right"
        >
          Marble Investments at a Glance
        </h3>
        <div
          className={`text-neutral-50 font-normal text-center text-base md:text-lg xl:text-xl 2xl:text-2xl md:w-[60%]`}
          data-aos="fade-right"
          data-aos-delay="250"
        >
          Since its inception in 2022, Marbles multi-strategy fund has
          consistently beaten our benchmark, S&P 500 index.
        </div>
        <div className="mt-20 w-full px-4 flex flex-col justify-start items-center md:grid-cols-3 md:grid md:place-items-center">
          {missionData.map((item, key) => (
            <div
              className="w-full grid grid-cols-2 space-x-5 bg-slate-50 rounded-md mb-4 px-5 py-3 md:flex md:w-[20vw] md:h-[20vw] md:flex-col md:items-center md:justify-center md:space-x-0"
              data-aos="fade-right"
              data-aos-delay={mobile ? key * 250 : 500 - key * 250}
              key={key}
            >
              <h2
                className={`w-full flex items-center justify-end md:justify-center font-semiblack font-bold font-cairo text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
              >
                {item.stat}
              </h2>
              <p
                className={`w-full flex items-center justify-start md:justify-center font-semibold  text-airforce whitespace-nowrap text-base md:text-lg lg:text-xl xl:text-2xl md:mt-1`}
              >
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`flex flex-col md:grid md:grid-cols-2 gap-12 pb-10 pt-[8rem] mb-[5rem] px-10 lg:px-20 xl:px-32 relative
        `}
      >
        <div className={`flex flex-col gap-12`}>
          <div
            className="absolute -left-0 top-0 md:-left-20 lg:-left-26 xl:-left-30 z-0"
            data-aos="fade-right"
          >
            <img
              src="/elements/arrow.png"
              className={`h-auto opacity-[0.8] ${
                mobile ? "w-[50vw]" : "w-[28vw]"
              }`}
            />
          </div>
          <div
            className={`text-semiblack font-bold z-10 text-2xl sm:text-3xl md:text-4xl xl:text-5xl`}
            data-aos="fade-right"
          >
            We bridge the gap between modern and traditional investing
          </div>
          <div
            className={`text-semiblack z-[10] text-base md:text-lg xl:text-xl`}
            data-aos="fade-right"
          >
            Marble is an experimental fund that deploys a mix of live and paper
            capital to publicly test and validate investment strategies.
          </div>
          <Button
            type="primary"
            href="/meet"
            className={` bg-lapis hover:bg-lapis/80 text-neutral-50 font-montserrat font-normal flex justify-center rounded-md items-center ${
              mobile
                ? "text-sm md:text-base w-20 px-[4rem]"
                : "text-lg xl:text-xl w-60 py-6"
            }`}
            data-aos="fade-right"
          >
            Meet our team
          </Button>
        </div>
        <div className={`flex items-center justify-center`}>
          <div
            className="h-[28rem] w-full bg-opacity-50 rounded relative"
            data-aos="fade-left"
          >
            <Image
              src="/elements/city.png"
              alt="city"
              fill={true}
              className="object-cover"
            ></Image>
          </div>
        </div>
      </section>
      <ContactForm />
    </main>
  );
};

export default Home;
