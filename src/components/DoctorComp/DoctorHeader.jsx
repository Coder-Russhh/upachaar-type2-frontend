import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";

const DoctorHeader = () => {
  const { doctorId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [doctorName, setDoctorName] = useState("");

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleCross = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`/api/doctors/${doctorId}`);
        setDoctorName(response.data.doctor.username);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [doctorId]);
  return (
    <>
      <div className="flex items-center justify-between p-2 bg-color text-white">
        <div className="flex items-center">
          {/* Hamburger menu toggle button */}
          <div className="cursor-pointer" onClick={handleMenuToggle}>
            {/* {showMenu ? <FiX size={24} /> : <FiMenu size={24} />} */}
            <FiMenu size={24} />
          </div>

          {/* Menu options */}
          {showMenu && (
            <>
              <div
                className="absolute opacity-30 bg-black text-black h-[100vh] w-[100vw] top-0 left-0 z-[12]"
                onClick={handleCross}
              ></div>

              <div className="relative">
                <div className="bg-color z-[12] text-white text-center absolute top-0 left-0  md:h-[25vh] md:w-[20vw] w-[75vw] flex justify-between border-2 border-white">
                  <div className="w-full">
                    <Link to={`/doctor/home/${doctorId}`}>
                      <h1 className="cursor-pointer my-2 hover:bg-[#0A5872]">
                        Doctor Home
                      </h1>
                    </Link>
                    <Link to={`/doctor/clinicinfo/${doctorId}`}>
                      <p className="cursor-pointer mb-2 hover:bg-[#0A5872]">
                        Clinic Information
                      </p>
                    </Link>
                    <Link to={`/doctor/healthfeed/${doctorId}`}>
                      <p className="cursor-pointer mb-2 hover:bg-[#0A5872]">
                        HealthFeed
                      </p>
                    </Link>
                    {/* patientId required h jaega-- */}
                    <Link to={`/doctor/patientrecord/${doctorId}`}>
                      <p className="cursor-pointer mb-2 hover:bg-[#0A5872]">
                        Patient Record
                      </p>
                    </Link>
                    <Link to={"/"}>
                      <p className="cursor-pointer text-md m-2 rounded-sm bg-white font-semibold text-red-500 hover:bg-red-700 hover:text-white">
                        Sign Out
                      </p>
                    </Link>
                  </div>
                  <div onClick={handleCross}>
                    <FiX size={24} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Welcome user heading */}
        <Link to={`/doctor/home/${doctorId}`}>
          <h2 className="md:text-2xl ml-2">Welcome, {doctorName}!</h2>
        </Link>

        {/* Search bar */}
        {/* <DoctorSearch /> */}

          <Link to={`/doctor/notifications/${doctorId}`}>
            <IoNotifications size={24} />
          </Link>

          {/* User profile icon */}
          <Link to={`/doctor/mainprofile/${doctorId}`}>
            <FiUser size={24} />
          </Link>
      </div>
    </>
  );
};

export default DoctorHeader;