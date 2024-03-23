import React, { useState } from "react";
import axios from "axios";
import google from "/google.svg";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
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
    setFormErrors({});
    setSignupError(null); // Reset signup error
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/signup`,
          formData,
          { withCredentials: true }, // Enable sending cookies
        );
        if (response.data.emailExists) {
          setSignupError("Email already exists"); // Set signup error if email exists
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        // You can display an error message here
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}?$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(values.name)) {
      errors.name = "Name should only contain letters and spaces";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password should be at least 8 characters long and contain at least one letter and one number";
    }

    return errors;
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-black">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block font-bold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              placeholder="Enter your name"
            />
            {formErrors.name && (
              <p className="text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>
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
              value={formData.email}
              onChange={handleChange}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email}</p>
            )}
            {signupError && (
              <div className="mb-4">
                <p className="text-sm text-red-500">{signupError}</p>
              </div>
            )}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700"
              placeholder="Enter your password"
            />
            {formErrors.password && (
              <p className="text-sm text-red-500">{formErrors.password}</p>
            )}
          </div>
          <div className="mb-6 flex items-center justify-center">
            <button
              type="submit"
              className="rounded bg-black px-4 py-2 font-bold text-white hover:bg-gray-700"
            >
              Sign Up
            </button>
          </div>
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded border border-gray-400 bg-white px-4 py-2 font-bold text-black hover:bg-gray-100"
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
