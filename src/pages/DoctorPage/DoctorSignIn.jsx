import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { backendURL } from "../../config/dev";

const DoctorSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/doctors/doctor-login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success === true) {
        const doctorId = response.data.doctorId;
        navigate(`/doctor/home/${doctorId}`);
      }
    } catch (error) {
      if (error.response.data.status === 403) {
        navigate("/access-restricted");
      } else {
        console.error("Error during signup:", error);
        alert("Error during signup. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-end items-center bg-color  bg-center relative">
      <div className="text-white mb-4 px-2">
        <h1 className="text-2xl md:text-2xl w-3/4">
          Go ahead and create your account
        </h1>
        <p>Sign in to enjoy the best managing experience</p>
      </div>
      <div className="md:w-1/4 w-full h-[75vh] md:mx-auto text-black px-6 py-2 rounded-t-2xl md:rounded-2xl border-white border-2 bg-white">
        <h2 className="text-2xl font-bold mb-4">Doctor Sign In</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
            />
          </label>

          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
            />
          </label>

          <button
            type="submit"
            className="bg-color text-white px-4 py-2 mb-2 mt-4 rounded-md w-full hover:bg-[#0A5872]"
          >
            Sign In
          </button>
        </form>
        <div>
          <h1 className="text-center">
            Don't have an account?{" "}
            <Link to="/doctor/sign-up">
              <span className="text-color hover:text-[#0A5872] font-bold">Sign Up</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignIn;
