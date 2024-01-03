import React from "react";
import Link from "next/link";

export default function login() {
  return (
    <main className="flex justify-center items-center flex-1">
      <div className="bg-[rgba(255,255,255,0.75)] w-[50%] flex flex-col p-[2.5rem] gap-[2rem] rounded-sm">
        <h1 className="font-bold text-3xl">Forgot Your Password?</h1>
        <p>Recover your password by entering your email</p>
        <p>
          <span className="text-red-500">*</span> Indicates a required
          field.
        </p>
        <form
          onSubmit={() => {
            //do api later
            console.log("forgot");
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
          </div>

          <button
            type="submit"
            className="w-full text-center p-[1rem] text-neutral-50 bg-[#26467C] mb-[1rem] rounded-sm"
          >
            Send Recovery Email
          </button>
          <div className="flex justify-start underline text-blue-800">
            <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
