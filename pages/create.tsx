import React from "react";
import Link from "next/link";

export default function login() {
  return (
      <main className="flex justify-center items-center flex-1">
        <div className="bg-[rgba(255,255,255,0.75)] w-[50%] flex flex-col p-[2.5rem] gap-[2rem] rounded-sm">
          <h1 className="font-bold text-3xl">
            Create a Marble Investment Account
          </h1>

          <p>Get started on your investment journey with us.</p>
          <p>
            <span className="text-red-500">*</span> Indicates a required
            field.
          </p>
          <form
            onSubmit={() => {
              //do api later
              console.log("create");
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
              <label htmlFor="c-password">
                Create password <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="c-password"
                className="mb-[2rem] border border-gray-500 h-10 p-[1rem]"
              />
              <div className="flex justify-end mb-[1rem] underline text-blue-800">
                Show password
              </div>
              <label htmlFor="r-password">
                Re-type password <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="r-password"
                className="mb-[2rem] border border-gray-500 h-10 p-[1rem]"
              />
            </div>
            <div className="flex items-center mb-[2rem]">
              <input
                type="checkbox"
                id="check"
                className="form-checkbox h-6 w-6 border-2 border-gray-500 appearance-none mr-[1rem] rounded-sm"
              />
              <label htmlFor="check">blah blah</label>
            </div>
            <button
              type="submit"
              className="w-full text-center p-[1rem] text-white bg-[#26467C] mb-[1rem] rounded-sm"
            >
              Create account
            </button>
            <div className="flex justify-center underline text-blue-800">
              <Link href="/login">I already have an account</Link>
            </div>
          </form>
        </div>
      </main>
  );
}
