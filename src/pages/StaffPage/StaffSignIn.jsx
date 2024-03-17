import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import doctorStaff from "../../assets/HomeImg/doctor3.jpg";
import { IoArrowBack } from "react-icons/io5";
import { backendURL } from "../../config/dev";

const StaffSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { staffId } = useParams();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendURL}/staff/staff-login/${staffId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, doctorId, staffId }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/staff/profile/${doctorId}/${staffId}`);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error("Error during staff login:", error);
    }
  };

  return (
    <div className="relative h-[100vh] ">
      {/* Background image for medium screens and above */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        // style={{ backgroundImage: `url(${doctorStaff})` }}
      ></div>

      {/* Form container */}
      <div className="h-screen w-full flex flex-col justify-end items-center bg-color  bg-center relative">
        <div className="text-white mb-4 px-2">
          <h1 className="text-2xl md:text-2xl w-3/4">
            Go ahead and sign in your account
          </h1>
          <p>Sign in to enjoy the best managing experience</p>
        </div>
        <div className="md:w-1/4 w-full h-[75vh] md:mx-auto text-black px-6 py-2 rounded-t-2xl md:rounded-2xl border-white border-2 bg-white">
          <form onSubmit={handleSignIn}>
            <h2 className="text-2xl font-bold mb-4">Staff Sign In</h2>
            <div className="mb-2">
              <label className="block text-sm mb-1">Email:</label>
              <input
                type="text"
                className="w-full border border-blue-500  p-2 rounded text-black focus:outline-none focus:border-blue-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Password:</label>
              <input
                type="password"
                className="w-full border border-blue-500  p-2 rounded text-black focus:outline-none focus:border-blue-300"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Doctor ID:</label>
              <input
                type="text"
                className="w-full border border-blue-500  p-2 rounded text-black focus:outline-none focus:border-blue-300"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              />
            </div>
            <div>
              <button
                // onClick={handleSignIn}
                className="bg-color text-white px-4 py-2 rounded-md hover:bg-[#0A5872] w-full"
              >
                Sign In
              </button>
            </div>
          </form>
          <Link to="/staff/staffId">
            <div className="flex items-center bg-slate-700 gap-2 justify-center mt-4 p-1">
              <h1 className="text-center text-white">Go back to Staff Id</h1>
              <span>
                <IoArrowBack />
              </span>
            </div>
          </Link>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default StaffSignIn;
