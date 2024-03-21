import React from 'react';
import google from '/google.svg';

export const SignUpForm = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-black">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded "
            >
              Sign Up
            </button>
          </div>
          <div>
            <button
              type="button"
              className="flex items-center justify-center w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded border border-gray-400 "
            >
              <img src={google} alt="" className='h-8 w-auto mr-2'/> Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
