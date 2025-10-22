import React, { useEffect, useState } from "react";
import Image from "next/image";
import { quarterData23, quarterData24, writeUps } from "../data/ResourceData";
import Dropdown from "../components/Dropdown";
import useMobile from "../hooks/useMobile";
import WindowCard from "../components/WindowCard";
import axios from "axios";

type BlogItem = {
  _id?: string;
  title: string;
  type: "post" | "file";
  content?: string;
  link?: string;
  category?: "blog" | "legacy" | "core";
};

export default function Resources() {
  const { mobile } = useMobile();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/blogs");
        setBlogs(res.data || []);
      } catch (e) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (mobile) {
    return (
      <main className="w-full my-[3rem] mx-[1.5rem]">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-md mt-[1rem]">
            Access our core strategy, blog, and legacy reports.
          </p>
        </div>
        <section className="flex flex-col gap-[1.5rem] items-center justify-center mt-[2rem] rounded-md">
          <div className="flex flex-col w-full items-start py-[1.5rem]">
            <h2 className="text-semiblack font-bold text-xl mb-[0.5rem]">
              Core Thematic Strategy
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Overview of our core themes and investment philosophy.
            </p>
            <div className="grid grid-cols-1 gap-4 w-full">
              {blogs
                .filter((b) => b.type === "post" && b.category === "core")
                .map((b) => (
                  <WindowCard
                    key={b._id || b.title}
                    title={b.title}
                    href={b._id ? `/blog/${b._id}` : "#"}
                    external={false}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col w-full items-start py-[1.5rem]">
            <h2 className="text-semiblack font-bold text-xl mb-[0.5rem]">
              Blog
            </h2>
            <div className="grid grid-cols-1 gap-4 w-full">
              {blogs
                .filter((b) => b.type === "post" && b.category === "blog")
                .map((b) => (
                  <WindowCard
                    key={b._id || b.title}
                    title={b.title}
                    href={b._id ? `/blog/${b._id}` : "#"}
                    external={false}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col w-full items-start py-[1.5rem]">
            <h2 className="text-semiblack font-bold text-xl mb-[0.5rem]">
              Legacy Reports
            </h2>
            <div className="grid grid-cols-1 gap-4 w-full">
              {blogs
                .filter((b) => b.type === "file")
                .map((r) => (
                  <WindowCard
                    key={r._id || r.title}
                    title={r.title}
                    href={r.link || "#"}
                    external={!!r.link}
                  />
                ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full mb-[8rem]">
      <section
        className={`relative flex flex-col gap-12 h-full px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem] xl:px-[4.5rem] 2xl:px-[6.5rem]`}
        data-aos="fade-right"
      >
        <div className="absolute right-0 z-0" data-aos="fade-left">
          <div className="relative overflow-hidden w-[43vw] h-auto max-lg:hidden">
            <div className="w-full h-full relative">
              <Image
                alt="hexagons"
                src="./elements/background hexagons.svg"
                width={0}
                height={0}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#fafafa] to-transparent opacity-90 h-[30%]"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1
            className="text-semiblack font-bold leading-[1.3] z-[10] text-2xl sm:text-3xl lg:text-4xl 
            2xl:text-5xl mt-[5rem]"
          >
            Resources
          </h1>
          <span className="text-semiblack text-base md:text-lg xl:text-xl w-full xl:max-w-[55%]">
            Access our core strategy, blog, and legacy reports.
          </span>
        </div>
        <section className={`flex flex-col gap-16 my-[2rem]`}>
          <div className="flex flex-col gap-4">
            <h2 className={`text-semiblack font-bold text-2xl xl:text-3xl`}>
              Core Thematic Strategy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl">
              {blogs
                .filter((b) => b.type === "post" && b.category === "core")
                .map((b) => (
                  <WindowCard
                    key={b._id || b.title}
                    title={b.title}
                    href={b._id ? `/blog/${b._id}` : "#"}
                    external={false}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className={`text-semiblack font-bold text-2xl xl:text-3xl`}>
              Blog
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl">
              {blogs
                .filter((b) => b.type === "post" && b.category === "blog")
                .map((b) => (
                  <WindowCard
                    key={b._id || b.title}
                    title={b.title}
                    href={b._id ? `/blog/${b._id}` : "#"}
                    external={false}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className={`text-semiblack font-bold text-2xl xl:text-3xl`}>
              Legacy Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl">
              {blogs
                .filter((b) => b.type === "file")
                .map((r) => (
                  <WindowCard
                    key={r._id || r.title}
                    title={r.title}
                    href={r.link || "#"}
                    external={!!r.link}
                  />
                ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
