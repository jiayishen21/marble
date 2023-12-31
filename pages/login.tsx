import React from "react";
import NavBar from "../components/navBar";
import Link from "next/link";

export default function login() {
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen min-w-screen flex flex-col"
        style={{ backgroundImage: "url(/landingBackground.svg)" }}
      >
        <NavBar />
        <main className="flex justify-center items-center flex-1">
          <div className="bg-[rgba(255,255,255,0.75)] w-[50%] flex flex-col p-[2.5rem] gap-[2rem] rounded-sm">
            <h1 className="font-bold text-3xl">
              Sign in to Your Marble Investment Account
            </h1>

            <p>Check on the progress of your investment</p>
            <p>
              <span className="text-red-500">*</span> Indicates a required
              field.
            </p>
            <form
              //do api later
              onSubmit={() => {
                console.log("signed in");
              }}
            >
              <div className="flex flex-col gap-[0.2rem]">
                <label htmlFor="email">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className="mb-[2rem] border border-gray-500 h-10 p-[1rem]"
                />
                <label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="password"
                  className="mb-[2rem] border border-gray-500 h-10 p-[1rem]"
                />
              </div>
              <div className="flex justify-end mb-[3rem] underline text-blue-800">
                Show password
              </div>
              <button
                type="submit"
                className="w-full text-center p-[1rem] text-white bg-[#26467C] mb-[1rem] rounded-sm"
              >
                Sign in
              </button>
              <div className="flex justify-start underline text-blue-800">
                <Link href="/">Forgot Password?</Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
