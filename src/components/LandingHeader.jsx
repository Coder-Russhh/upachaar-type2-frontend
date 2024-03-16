import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Logo1 from "../assets/HomeImg/logo-transparent.png";
import { FiMenu, FiX } from "react-icons/fi";

const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar bg-dark p-4 px-6 md:px-12 sticky top-0 z-20 border-b-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <ScrollLink to="mainheading" smooth={true} duration={1000} offset={-100}>
            <img src={Logo1} alt="Logo" className="logo h-8 md:h-10" />
          </ScrollLink>
          <RouterLink to="/patient/sign-up">
            <div className="md:hidden">
              {/* <button className="login-button bg-white text-black px-4 py-2 font-semibold rounded-md ">
                Login
              </button> */}
              <div className="h-10 w-10 bg-white square hover:from-blue-700 hover:to-blue-900">
                <div className="tilt text-black text-[0.60rem]">Book Now</div>
              </div>
            </div>
          </RouterLink>
          <div className="menu-toggle md:hidden" onClick={toggleMenu}>
            {isOpen ? (
              <FiX className="text-white text-2xl" />
            ) : (
              <FiMenu className="text-white text-2xl" />
            )}
          </div>
          {isOpen && (
            <div
              className="absolute opacity-30 bg-black text-black h-[100vh] w-[100vw] top-0 left-0 z-[12]"
              onClick={toggleMenu}
            ></div>
          )}
          <ul
            className={`menu ${
              isOpen ? "block" : "hidden"
            } md:flex md:items-center md:space-x-4 bg-color md:border-0 font-semibold text-lg  border-2 border-white py-4 px-8 md:p-0 absolute top-6 right-16 z-20`}
          >
            <li className="hidden md:block">
              <RouterLink to="/patient/sign-up">
                <button className="animate-bounce duration-1000 bg-white text-black px-4 py-2 font-semibold rounded-md mr-4">
                  Login/SignUp
                </button>
              </RouterLink>
            </li>
            <ScrollLink
              to="healthnews"
              smooth={true}
              duration={1000}
              offset={-100}
              className="text-white hover:underline"
            >
              <li className="menu-item">Health News</li>
            </ScrollLink>
            <li className="menu-item">
              <ScrollLink
                to="topdoctor"
                smooth={true}
                duration={1000}
                offset={-100}
                className="text-white hover:underline"
              >
                Explore
              </ScrollLink>
            </li>
            <li className="menu-item">
              <ScrollLink
                to="explore"
                smooth={true}
                duration={1000}
                offset={-100}
                className="text-white hover:underline"
              >
                Services
              </ScrollLink>
            </li>
            <li className="menu-item">
              <ScrollLink
                to="contact"
                smooth={true}
                duration={1000}
                offset={-100}
                className="text-white hover:underline"
              >
                Contact Us
              </ScrollLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;
