import React from "react";
import google from "/google.svg";

export const SignInForm = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-black">Sign In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6 flex items-center justify-center">
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-black px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
            >
              Sign In
            </button>
          </div>
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded border border-gray-400 bg-white px-4 py-2 font-bold text-black hover:bg-gray-100 "
            >
              <img src={google} alt="" className="mr-2 h-8 w-auto" /> Sign in
              with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
