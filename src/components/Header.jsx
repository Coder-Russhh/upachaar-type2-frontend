import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import DoctorSearch from "./PatientComp/DoctorSearch";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleCross = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-blue-700 text-white">
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
              <div className="bg-white z-[12] text-black absolute top-0 left-0 h-[30vh] w-[20vw] flex justify-between">
                <div>
                <Link to="/patient/home">
                    <p className="cursor-pointer mb-2">Home</p>
                  </Link>
                  <Link to="/patient/appointmentsrecord">
                    <p className="cursor-pointer mb-2">Appointments Record</p>
                  </Link>
                  <Link to="/patient/medicalhistory">
                    <p className="cursor-pointer mb-2">Medical History</p>
                  </Link>
                  <Link to="/patient/healthmetrics">
                    <p className="cursor-pointer mb-2">Health Metrics</p>
                  </Link>
                    <p className="cursor-pointer mb-2">Sign Out</p>
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
      <h2 className="text-2xl">Welcome, User!</h2>

      {/* Search bar */}
      <DoctorSearch />

      {/* User profile icon */}
      <FiUser size={24} />
    </div>
  );
};

export default Header;
