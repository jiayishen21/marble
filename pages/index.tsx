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

  const { mobile, width } = useMobile()

  return (
    <main className="overflow-x-hidden w-full">
      <div
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: `${navHeight}px calc(100vh - ${navHeight}px)`,
        }}
      >
        <Navbar navRef={navRef} blank={0} router={router} />

        <div className="absolute top-0 left-0 w-full h-screen z-[-1]" />
        <section
          className={`relative flex flex-col items-center lg:items-start gap-6 lg:gap-9 2xl:gap-12 px-[1.5rem] md:px-[2.5rem] 
          lg:px-[3.5rem] xl:px-[4.5rem] 2xl:px-[6.5rem] h-full`}
        >
          <div className="absolute right-0 z-0" data-aos="fade-left">
            <div className="relative z-0">
              <img
                src="/elements/hextiles.png"
                className="w-[30vw] h-auto max-lg:hidden"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa] to-transparent opacity-90 h-[30%]"></div>
            </div>
          </div>
          <div className="max-w-[60rem] w-full md:w-[60%] lg:w-[80%] xl:w-[70%] z-10"
            data-aos="fade-right">
            <h1 className={`flex flex-col gap-3 text-semiblack font-bold leading-[1.3] z-[10] text-2xl md:text-3xl lg:text-4xl 
            2xl:text-5xl mt-0 text-center lg:text-left lg:mt-[5vh] xl:mt-[10vh] 2xl:mt-[15vh]`}>
              A mutual fund geared toward bringing investors financial well being
            </h1>
            <h2 className={`text-airforce font-cairo font-bold tracking-wide z-[10] uppercase leading-[1.6] text-md md:text-lg lg:text-xl 
            2xl:text-3xl mt-6 text-center lg:text-left lg:mt-8 xl:mt-10`}>
              Growing your financial literacy, building meaningful connections, and maximizing your returns.
            </h2>
          </div>
          {!user && (
            <Button
              type="primary"
              href="/register"
              className={` bg-lapis rounded-md text-neutral-50 font-hind font-normal flex 
              justify-center items-center`}
              data-aos="fade-right"
            >
              Invest with us
            </Button>
          )}
        </section>
      </div>
      <section className={`bg-cover bg-center bg-no-repeat min-w-screen min-h-full flex flex-col linear-wave 
      -mt-[7.5rem] lg:-mt-[9rem] px-[1.5rem] md:px-[2.5rem] 
      lg:px-[3.5rem] xl:px-[4.5rem] 2xl:px-[6.5rem] items-center justify-center h-[120vh]`}>
        <h3 className={`text-neutral-50 font-bold pb-8
        text-center ${mobile ? "text-4xl" : "text-[2.8rem]"}`} data-aos="fade-up">
          Our Mission
        </h3>
        <div
          className={`text-neutral-50 font-normal text-center ${mobile ? "text-xl" : "text-2xl"
            }`}
          data-aos="fade-up"
        >
          Our principal benchmark is to outperform the S&P 500 index. Since our inception, we've successfully tripled the returns of this benchmark in every quarter.
        </div>
        <div
          className={` ${mobile
            ? "flex flex-col justify-center items-center gap-[2rem]"
            : "flex w-full justify-around align-center pt-8"
            }`}
        >
          {missionData.map((item, key) => (
            <div
              className={`bg-white rounded flex flex-col xl:gap-[2rem] gap-[1.3rem] items-center justify-center ${mobile ? "h-40 w-full px-[2rem]" : "xl:h-[18rem] h-[15rem] w-[30%]"
                }`}
              data-aos="fade-right"
              key={key}
            >
              <h2 className={`font-black ${mobile ? "text-3xl" : "xl:text-6xl text-5xl"}`}>
                {item.stat}
              </h2>
              <p
                className={`font-semibold  text-airforce whitespace-nowrap ${mobile ? "text-md" : "xl:text-3xl text-[1.6rem]"
                  }`}
              >
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`${mobile
          ? "flex flex-col gap-10 mb-[5rem]"
          : "grid grid-cols-2 gap-12 pb-10 pt-[8rem] mb-[16rem]"
          }`}
      >
        <div
          className={`relative flex flex-col gap-12 ${mobile ? "px-10" : "pl-20"
            }`}
          data-aos="fade-right"
        >
          <div className="absolute left-0 top-[-6rem] z-0">
            <img
              src="/elements/arrow.png"
              className={`h-auto opacity-[0.8] ${mobile ? "w-[50vw]" : "w-[32vw]"
                }`}
            />
          </div>
          <div
            className={`text-semiblack font-bold z-10 ${mobile ? "text-4xl" : "text-6xl"
              }`}
          >
            We are passionate about growing your money
          </div>
          <div
            className={`text-semiblack z-[10] ${mobile ? "text-lg" : "text-2xl"
              }`}
          >
            Through Marble, students will be equipped with the necessary skills to excel in various financial sectors. We want to provide you with a space to learn, grow, and gain exposure to various trading and value investing strategies.
          </div>
          <Button
            type="primary"
            href="/meet"
            className={` bg-lapis rounded-md text-neutral-50 font-hind font-normal flex justify-center items-center ${mobile ? "text-md w-20 px-[4rem]" : "text-2xl w-60 h-14"
              }`}
          >
            Meet our team
          </Button>
        </div>
        <div
          className={`flex items-center justify-center ${mobile ? "px-[2rem]" : "pl-10 pr-[8rem]"
            }`}
        >
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
      <Footer />
    </main>
  );
};

export default Home;
