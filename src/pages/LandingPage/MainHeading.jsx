import React from "react";
import { Link } from "react-scroll";
import cartoon from "../../assets/HomeImg/cartoon.png";

const MainHeading = () => {
  return (
    <div id="mainheading">
      <div className="relative">
        <div className="flex md:flex-row flex-col justify-between items-center pb-20 bg-color md:px-6 md:h-[70vh] text-white relative z-10">
        <img
            src={cartoon}
            alt="Doctor"
            className="h-60 md:h-72 md:hidden block"
          />
          <div className="flex flex-col items-center gap-4 md:w-1/2 mx-4">
            <div className=" flex flex-col items-center">
              <h1 className="text-xl md:text-4xl font-bold text-center underline">
                Take A Consultation In Real Time and Connect with Your Doctor
                Virtually
              </h1>
              <div className="font-bold mt-4 flex items-center justify-start gap-8">
                <div>
                  <h1 className="mb-2 relative">
                    <span className="inline-block pb-1">
                     . Real-time appointment
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 "></span>
                  </h1>
                  <h1 className="relative">
                    <span className="inline-block pb-1">. Connect Virtually</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 "></span>
                  </h1>
                </div>
                <div>
                  <h1 className="mb-2 relative">
                    <span className="inline-block pb-1">
                     . Time Efficient
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 "></span>
                  </h1>
                  <h1 className="relative">
                    <span className="inline-block pb-1">. Cost Effective</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 "></span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex md:gap-16 gap-24 h-1/2 items-center justify-start mt-8">
              <Link to="provider" smooth={true} duration={1000} offset={-200}>
                <button className="bg-blue-600 text-white font-bold border-2 md:hover:scale-110 border-white px-2 md:px-8 py-1 md:py-2 rounded-md hover:bg-blue-800">
                  Join now
                </button>
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={1000}
                offset={-100}
                className="hover:bg-blue-700 font-bold hover:text-white md:hover:scale-110 text-blue-700 bg-white border-2 border-white px-2 md:px-8 py-1 md:py-2 rounded-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <img
            src={cartoon}
            alt="Doctor"
            className="h-60 md:h-72 md:block hidden"
          />
        </div>
      </div>
      {/* <div className="md:block hidden">
      <svg viewBox="0 0 1440 180">
        <path
          fill="currentColor"
          className="text-color"
          d="M0,128L48,112C96,96,192,64,288,80C384,96,480,160,576,165.3C672,171,768,117,864,112C960,107,1056,149,1152,160C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      </div> */}
      <div className="h-1 bg-color md:hidden"></div>
    </div>
  );
};

export default MainHeading;
