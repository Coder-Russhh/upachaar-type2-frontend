import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const DoctorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    speciality: "",
    gender: "",
    qualification: "",
    experience: "",
    clinicAddress: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/doctors/doctor-register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === true) {
        navigate("/doctor/sign-in");
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
          Best Real Time Management App
        </h1>
        <p className="md:block hidden">Sign in-up to enjoy the best managing experience</p>
      </div>
      <div className="md:w-1/4 w-full h-[75vh] md:mx-auto text-black px-6 py-2 rounded-t-2xl md:rounded-2xl border-white border-2 bg-white">
        <h2 className="text-2xl font-bold mb-4">Doctor Sign Up</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <label className="block  mb-2">
              Username:
              <input
                type="text"
                name="username"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-500 focus:outline-none  rounded-md focus:border-blue-300 text-black"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
              />
            </label>
          </div>
          <label className="block  mb-2">
              Gender:
              <select
                name="gender"
                onChange={handleChange}
                className="w-full px-3 py-2 bg-color border rounded-md focus:outline-none focus:border-blue-300 text-white"
              >
                <option value="select">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              onChange={handleChange}
              autoComplete="on"
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
            />
          </label>
          <div className="flex gap-4">
            <div className="block w-full">
              <label className="block  mb-2">
                City:
                <select
                  name="city"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-300 bg-color text-white"
                >
                  <option value="select">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  {/* Add more cities as needed */}
                </select>
              </label>
            </div>
            <div className="block w-full">
              <label className="block  mb-2">
                Speciality:
                <select
                  name="speciality"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-700 bg-color text-white"
                >
                  <option value="select">Select Speciality</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Orthopedic">Orthopedic</option>
                  {/* Add more specialities as needed */}
                </select>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="block  mb-2">
              Qualification:
              <input
                type="text"
                name="qualification"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
              />
            </label>
            <label className="blockext-black mb-2">
              Experience:
              <select
                name="experience"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-300 bg-color text-white"
              >
                <option value="select">Select Experience</option>
                {Array.from({ length: 5 }, (_, index) => (
                  <option key={index} value={`${index * 5}years`}>
                    {index * 5}+ years
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block mb-2">
            Clinic Address:
            <input
              type="text"
              name="clinicAddress"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-300 text-black"
            />
          </label>
          <button
            type="submit"
            className="bg-color text-white px-4 py-2 mb-2 rounded-md w-full hover:bg-[#0A5872]"
          >
            Sign Up
          </button>
        </form>
        <div>
          <h1 className="text-center">
            Already have an account?{" "}
            <Link to="/doctor/sign-in">
              <span className="text-color hover:text-[#0A5872] font-bold">Sign In</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;
