import type { NextPage } from "next";
import Navbar from "../components/layout/Navbar";
import { useNavParams } from "../hooks/useNavParams";
import { Button } from "antd";
import ContactForm from "../components/ContactForm";
import { useForm } from "antd/lib/form/Form";
import Footer from "../components/layout/Footer";
import { useRouter } from "next/router";
import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import useMobileDetection from "../utils/detectMobile";
import { missionData } from "../data/NavOptions";
import Image from "next/image";

const Home: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { navRef, navHeight } = useNavParams();
  const router = useRouter();

  const [form] = useForm();

  const mobile = useMobileDetection();

  return (
    <main className="overflow-x-hidden w-full">
      <div
        style={{
          display: "grid",
          gridTemplateRows: `${navHeight}px calc(100vh - ${navHeight}px)`,
        }}
      >
        <Navbar navRef={navRef} blank={0} router={router} />

        <div className="absolute top-0 left-0 w-full h-screen z-[-1]" />
        <section
          className={`relative flex flex-col gap-12 px-[3rem] h-full`}
          data-aos="fade-right"
        >
          <div className="absolute right-0 z-0" data-aos="fade-left">
            <div className="relative">
              <img
                src="/elements/hextiles.png"
                className="w-[30vw] h-auto max-lg:hidden"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa] to-transparent opacity-90 h-[30%]"></div>
            </div>
          </div>
          <div
            className={`flex flex-col gap-3 text-semiblack font-bold  z-[10] ${
              mobile ? "text-4xl mt-8" : "text-6xl mt-20"
            }`}
          >
            A hedge fund like no other —<br />
            by students, for students.
          </div>
          <div
            className={`text-airforce font-cairo font-semibold tracking-wide  z-[10] ${
              mobile ? "text-xs -mt-[2rem]" : "text-lg"
            }`}
          >
            “TO INVEST IN THE FUTURE, INVEST IN THOSE WHO BUILD THE FUTURE”{" "}
            <br />— PREFERABLY THIS IS MORE UNIQUE TO MARBLE THAN A QUOTE
          </div>
          {!user && (
            <Button
              type="primary"
              href="/create"
              className={` bg-lapis rounded-md text-neutral-50 font-hind font-normal flex justify-center items-center ${
                mobile ? "text-md w-20 px-[4rem]" : "text-2xl w-60 h-14"
              }`}
            >
              Invest with us
            </Button>
          )}
        </section>
      </div>
      {/* <section className={`${styles["buffer"]} h-[2rem]`} /> */}
      <section
        className={`bg-cover bg-center bg-no-repeat min-w-screen min-h-full flex flex-col gap-12 linear-wave -mt-[13.5rem] items-center justify-center ${
          mobile ? "pt-[9rem] pb-[12rem]" : "h-[120vh]"
        }`}
      >
        <div
          className={`text-neutral-50 font-bold
        text-center ${mobile ? "text-4xl" : "text-6xl"}`}
          data-aos="fade-up"
        >
          Our Mission
        </div>
        <div
          className={`text-neutral-50 font-normal text-center ${
            mobile ? "text-xl" : "text-3xl"
          }`}
          data-aos="fade-up"
        >
          Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate <br />
          libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
          sociosqu <br />
          ad litora torquent per conubia nostra, per inceptos himenaeos.
        </div>
        <div
          className={` ${
            mobile
              ? "flex flex-col justify-center items-center gap-[2rem]"
              : "flex w-full justify-around align-center pt-8 px-10"
          }`}
        >
          {missionData.map((item, key) => (
            <div
              className={`bg-white rounded flex flex-col gap-[2rem] items-center justify-center ${
                mobile ? "h-40 w-full px-[2rem]" : "h-80 w-[28%]"
              }`}
              data-aos="fade-right"
              key={key}
            >
              <h2 className={`font-black ${mobile ? "text-3xl" : "text-6xl"}`}>
                {item.stat}
              </h2>
              <p
                className={`font-semibold  text-airforce whitespace-nowrap ${
                  mobile ? "text-md" : "text-2xl"
                }`}
              >
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`${
          mobile
            ? "flex flex-col gap-10 mb-[5rem]"
            : "grid grid-cols-2 gap-12 pb-10 pt-[8rem] mb-[16rem]"
        }`}
      >
        <div
          className={`relative flex flex-col gap-12 ${
            mobile ? "px-10" : "pl-20"
          }`}
          data-aos="fade-right"
        >
          <div className="absolute left-0 top-[-6rem] z-0">
            <img
              src="/elements/arrow.png"
              className={`h-auto opacity-[0.8] ${
                mobile ? "w-[50vw]" : "w-[32vw]"
              }`}
            />
          </div>
          <div
            className={`text-semiblack font-bold z-10 ${
              mobile ? "text-4xl" : "text-6xl"
            }`}
          >
            We are passionate about growing your money
          </div>
          <div
            className={`text-semiblack z-[10] ${
              mobile ? "text-sm" : "text-2xl"
            }`}
          >
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus.
          </div>
          <Button
            type="primary"
            href="/meet"
            className={` bg-lapis rounded-md text-neutral-50 font-hind font-normal flex justify-center items-center ${
              mobile ? "text-md w-20 px-[4rem]" : "text-2xl w-60 h-14"
            }`}
          >
            Meet our team
          </Button>
        </div>
        <div
          className={`flex items-center justify-center ${
            mobile ? "px-[2rem]" : "pl-10 pr-[8rem]"
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
