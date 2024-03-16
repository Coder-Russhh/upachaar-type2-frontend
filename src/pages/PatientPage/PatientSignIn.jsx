import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPatient } from "../../redux/patient/patientSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PatientSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/patients/patient-login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === true) {
        const patientId = response.data.patientId;
        // Dispatch the setPatient action to update the Redux store
        dispatch(setPatient(patientId));
        navigate(`/patient/home/${patientId}`);
      } else {
        const errorData = response.data;
        console.error("Login failed:", errorData);
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-end items-center bg-color  bg-center relative">
      <div className="text-white mb-4 px-2">
        <h1 className="text-2xl md:text-2xl w-3/4">
          Go ahead and login to your account
        </h1>
        <p>Login to enjoy the best managing experience</p>
      </div>
      <div className="md:w-1/4 w-full h-[75vh] md:mx-auto text-black px-6 py-2 rounded-t-2xl md:rounded-2xl border-white border-2 bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={handleLogin}>
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
          <br />
          <button
            type="submit"
            className="bg-color text-white px-4 py-2 mb-2 rounded-md w-full hover:bg-[#0A5872]"
          >
            Sign In
          </button>
        </form>
        <h1 className="text-center mt-4">
         Don't have an account?{" "}
          <Link to="/patient/sign-up">
            <span className="text-color hover:text-[#0A5872] hover:underline font-bold">
              Sign Up
            </span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default PatientSignIn;
