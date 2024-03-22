import React, { useEffect } from "react";
import { HomeNavBar } from "../components/navBar/HomeNavBar";
import { Footer } from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        // Send a POST request to check if the user has a valid session
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/checkuser`,
          {},
          { withCredentials: true }, // Include cookies in the request
        );
        // Handle the response data as needed
        if (response.data.success) {
          // navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
        // Navigate to the home page if there's an error
        navigate("/");
      }
    };
    verifyCookie();
  }, [navigate]); // Include navigate in the dependency array if you use it inside useEffect
  return (
    <div>
      <HomeNavBar />
      <Footer />
    </div>
  );
};
