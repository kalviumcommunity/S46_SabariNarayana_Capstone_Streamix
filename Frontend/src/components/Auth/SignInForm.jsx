import React, { useState } from "react";
import google from "/google.svg"; // Corrected import path
import axios from "axios";

export const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState(null); // New state for signup error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/signin`,
        formData,
        { withCredentials: true }, // Enable sending cookies
      );
      if (!response.data.emailExists) {
        setSignupError("Email/Password does not match"); // Set signup error if email does not exist
      } else {
        console.log(response.data);
        // You can redirect the user or display a success message here
      }
    } catch (error) {
      console.error(error);
      setSignupError("An error occurred. Please try again."); // Set error message for any other errors
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-black">Sign In</h2>
        {signupError && <div className="text-red-500">{signupError}</div>}{" "}
        {/* Display signup error */}
        <form onSubmit={handleSubmit}>
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
              name="email"
              onChange={handleChange}
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
              name="password"
              onChange={handleChange}
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
              <img src={google} alt="Google Logo" className="mr-2 h-8 w-auto" />{" "}
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
