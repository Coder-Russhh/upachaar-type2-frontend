import React from "react";
import nurse1 from "../../assets/DoctorImg/nurse1.png";
import nurse2 from "../../assets/HomeImg/cartoon.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <>
      <div className="bg-color h-screen flex justify-center items-center gap-10 flex-col bg-border-white border-2 text-white">
        <header className="">
          <h1 className="font-bold text-6xl">Upachaar</h1>
          <div className="h-[2px] bg-slate-400"></div>
          <span className="text-2xl">Mat Karo Vichaar</span>
        </header>
        <div className="h-1/2  opacity-90">
          <img className="h-full" src={nurse1} alt="nurse" />
        </div>
        <Link to="/home">
          <div className="flex items-center gap-4 bg-white rounded-3xl py-4 px-8 hover:scale-105">
            <button className="text-black text-2xl font-semibold">
              Get Started
            </button>
            <span className="animate-marquee">
              <FaArrowRight size={20} color="grey" />
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default GetStarted;
