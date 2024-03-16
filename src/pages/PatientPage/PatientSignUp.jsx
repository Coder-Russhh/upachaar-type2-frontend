import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPatient } from "../../redux/patient/patientSlice";
import { Link } from "react-router-dom";

const PatientSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/patients/patient-register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.success === true) {
        const data = response.data;
        // Dispatch the setPatient action to update the Redux store
        dispatch(setPatient(data));
        navigate("/patient/sign-in");
      } else {
        const errorData = response.data;
        console.error("Signup failed:", errorData);
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup.");
    }
  };
  return (
    <div
      className="h-screen w-full flex flex-col justify-end items-center bg-color  bg-center relative"
    >
      <div className="text-white mb-4 px-2">
        <h1 className="text-2xl md:text-2xl w-3/4">Go ahead and create your account</h1>
        <p>Sign in-up to enjoy the best managing experience</p>
      </div>
      <div className="md:w-1/4 w-full h-[75vh] md:mx-auto text-black px-6 py-2 rounded-t-2xl md:rounded-2xl border-white border-2 bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <label className="block md:mb-2">
            Username:
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
            />
          </label>
          <label className="block md:mb-2">
            Email:
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
            />
          </label>
          <label className="block md:mb-2 ">
            Password:
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
              autoComplete="on"
            />
          </label>
          <br />
          <label className="block md:mb-2">
            Gender:
            <select
              name="gender"
              onChange={handleChange}
              className="md:w-full w-1/2 mx-4 md:mx-0  px-3 py-2 border rounded-md bg-color text-white"
            >
              <option value="select">Select</option>
              <option value="male" >Male</option>
              <option value="female" >Female</option>
              <option value="other" >Other</option>
            </select>
          </label>
          <br />
          <button
            type="submit"
            className="bg-color text-white px-4 py-2 mb-2 rounded-md w-full hover:bg-[#0A5872]"
          >
            Sign Up
          </button>
        </form>
        <h1 className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/patient/sign-in">
            <span className="text-color hover:text-[#0A5872] hover:underline font-bold">
              Sign In
            </span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default PatientSignUp;
