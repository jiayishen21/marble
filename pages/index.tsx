import type { NextPage } from "next";
import { PolywaveTop, PolywaveBottom } from "../components/Polywave";
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
        <div className="flex absolute bottom-0 left-0 h-[300px] w-full overflow-y-hidden pointer-events-none">
          <div
            className={`absolute bottom-0 left-0 z-[500] w-full overflow-x-hidden`}
          >
            <PolywaveTop />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-screen z-[-1]" />
        <section
          className={`relative flex flex-col gap-12 px-20 h-full`}
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
          <div className="flex flex-col gap-3 mt-20 text-semiblack font-bold text-6xl z-[10] max-lg:text-5xl">
            A hedge fund like no other —<br />
            by students, for students.
          </div>
          <div className="text-airforce font-cairo font-semibold tracking-wide text-lg z-[10] max-lg:text-md">
            “TO INVEST IN THE FUTURE, INVEST IN THOSE WHO BUILD THE FUTURE”{" "}
            <br />— PREFERABLY THIS IS MORE UNIQUE TO MARBLE THAN A QUOTE
          </div>
          {!user && (
            <Button
              type="primary"
              href="/create"
              className="w-60 h-14 bg-lapis rounded-md text-neutral-50 font-hind
            text-2xl font-normal flex justify-center items-center"
            >
              Invest with us
            </Button>
          )}
        </section>
      </div>
      {/* <section className={`${styles["buffer"]} h-[2rem]`} /> */}
      <section className="bg-airforce flex flex-col gap-12 pb-[4rem] pt-[6rem]">
        <div
          className="text-neutral-50 text-6xl font-bold
        text-center"
          data-aos="fade-up"
        >
          Our Mission
        </div>
        <div
          className=" text-neutral-50 text-3xl font-normal mx-auto text-center"
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
          <div
            className={`bg-neutral-50 h-80 bg-opacity-50 rounded ${
              mobile ? "w-[60%]" : "w-[28%]"
            }`}
            data-aos="fade-right"
          />
          <div
            className={`bg-neutral-50 h-80 bg-opacity-50 rounded ${
              mobile ? "w-[60%]" : "w-[28%]"
            }`}
            data-aos="fade-up"
          />
          <div
            className={`bg-neutral-50 h-80 bg-opacity-50 rounded ${
              mobile ? "w-[60%]" : "w-[28%]"
            }`}
            data-aos="fade-left"
          />
        </div>
      </section>
      <PolywaveBottom />
      <section
        className={`${
          mobile
            ? "flex flex-col gap-10 mb-[5rem]"
            : "grid grid-cols-2 gap-12 pb-10 pt-[4rem] mb-[16rem]"
        }`}
      >
        <div
          className="relative flex flex-col gap-12 pl-20"
          data-aos="fade-right"
        >
          <div className="absolute left-0 top-[-10rem] z-0">
            <img
              src="/elements/arrow.png"
              className="w-[32vw] h-auto opacity-[0.8]"
            />
          </div>
          <div className="text-semiblack text-6xl font-bold z-[10]">
            We are passionate about <br />
            growing your money
          </div>
          <div className="text-semiblack text-2xl z-[10]">
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus.
          </div>
          <Button
            type="primary"
            href="/meet"
            className="w-60 h-14 bg-lapis rounded-md text-neutral-50 font-hind
          text-2xl font-normal flex justify-center items-center "
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
            className="bg-neutral-400 h-[28rem] w-full bg-opacity-50 rounded"
            data-aos="fade-left"
          />
        </div>
      </section>
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Home;
