import React from "react";
import service1 from "../assets/HomeImg/services/service1r.jpg";
// import service2 from "../assets/HomeImg/services/service2r.jpg";
import service3 from "../assets/HomeImg/services/service3r.jpg";
import service4 from "../assets/HomeImg/services/doctor4r.jpg";
import service5 from "../assets/HomeImg/services/service5r.jpg";
import service6 from "../assets/HomeImg/services/service6r.jpg";

const Services = () => {
  return (
    <div id="explore" className="text-center">
      <h2 className="text-2xl md:text-4xl underline text-color font-bold my-4">
        Our Services
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 px-12 text-black font-thin">
        {/* Card 1 */}
        <div className="md:h-[40vh] h-[25vh] flex flex-col p-2 rounded-3xl bg-color shadow-lg  border-2 border-bg-color hover:scale-105">
          <div className="h-[75%] w-full">
            <img
              className="rounded-t-3xl h-full w-full object-cover"
              src={service1}
              alt="spec1"
            />
          </div>
          <div className=" text-white rounded-b-3xl md:h-[50%] h-[10vh] flex flex-col justify-start items-center">
            <h1 className="font-bold md:text-2xl text-md">
              Instant Video Consultation
            </h1>
            <p className="font-medium md:block hidden">Connect within 60sec</p>
          </div>
        </div>

        {/* Card 1 */}
        <div className="md:h-[40vh] h-[25vh] flex flex-col p-2 rounded-3xl bg-color shadow-lg  border-2 border-bg-color hover:scale-105">
          <div className="h-[75%]  w-full">
            <img
              className="rounded-t-3xl h-full w-full object-cover"
              src=""
              alt="spec1"
            />
          </div>
          <div className="text-white rounded-b-3xl md:h-[50%] h-[10vh] flex flex-col justify-start items-center">
            <h1 className="font-bold md:text-2xl text-md">
              Finds Doctors Near You
            </h1>
            <p className="font-medium md:block hidden">
              Confirmed Appointments
            </p>
          </div>
        </div>

        {/* Card 1 */}
        <div className="md:h-[40vh] h-[25vh] flex flex-col p-2 rounded-3xl bg-color shadow-lg  border-2 border-bg-color hover:scale-105">
          <div className="h-[75%] w-full">
            <img
              className="rounded-t-3xl h-full w-full object-cover"
              src={service3}
              alt="spec1"
            />
          </div>
          <div className="text-white rounded-b-3xl md:h-[50%] h-[10vh] flex flex-col justify-start items-center">
            <h1 className="font-bold md:text-2xl text-md">
              Best of all Medicines
            </h1>
            <p className="font-medium md:block hidden">
              Essentials at your doorstep
            </p>
          </div>
        </div>

        {/* Card 1 */}
        <div className="md:h-[40vh] h-[25vh] flex flex-col p-2 rounded-3xl bg-color shadow-lg  border-2 border-bg-color hover:scale-105">
          <div className="h-[75%] w-full">
            <img
              className="rounded-t-3xl h-full w-full object-cover"
              src={service4}
              alt="spec1"
            />
          </div>
          <div className="text-white rounded-b-3xl md:h-[50%] h-[10vh] flex flex-col justify-start items-center">
            <h1 className="font-bold md:text-2xl md:px-4 text-md">
              India's Best Doctor 
            </h1>
            <p className="font-medium md:block hidden">
              Just a Search Away To find
            </p>
          </div>
        </div>

        {/* Card 1 */}
        <div className="md:h-[40vh] h-[25vh] flex flex-col p-2 rounded-3xl bg-color shadow-lg  border-2 border-bg-color hover:scale-105">
          <div className="h-[75%] w-full">
            <img
              className="rounded-t-3xl h-full w-full object-cover"
              src={service5}
              alt="spec1"
            />
          </div>
          <div className="text-white rounded-b-3xl md:h-[50%] h-[10vh] flex flex-col justify-start items-center">
            <h1 className="font-bold md:text-2xl md:px-4 text-md">
              Lab Tests  Near You
            </h1>
            <p className="font-medium md:block hidden">Find Best Lab</p>
          </div>
        </div>

        {/* Card 1 */}
        <div className="md:h-[40vh] h-[25vh] flex flex-col p-2 rounded-3xl bg-color shadow-lg  border-2 border-bg-color hover:scale-105">
          <div className="h-[75%] w-full ">
            <img
              className="rounded-t-3xl h-full w-full object-cover"
              src={service6}
              alt="spec1"
            />
          </div>
          <div className="text-white rounded-b-3xl md:h-[50%] h-[10vh] flex flex-col justify-start items-center">
            <h1 className="font-bold md:text-2xl text-md">
              Successful Surgeries
            </h1>
            <p className="font-medium md:block hidden">95% succes rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
