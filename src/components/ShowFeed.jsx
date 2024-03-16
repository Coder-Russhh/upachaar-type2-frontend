import React from "react";

const ShowFeed = () => {
  return (
    // bg-gradient-to-r from-blue-700 to-[#043873]
    <div className=" py-2 text-black ">
      <div className="container mx-auto text-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12">
          <div className="p-2 ring-2 ring-gray-500  rounded-lg shadow-2xl bg-white text-black hover:bg-[#0A5872] hover:text-white transition-transform transform hover:scale-105 ">
            <h2 className="text-xl font-semibold mb-2">
              Daily Patients Visited
            </h2>
            <p className="text-3xl font-bold">500+</p>
          </div>
          <div className="p-2 ring-2 ring-gray-500  rounded-lg shadow-2xl bg-white text-black hover:bg-[#0A5872] hover:text-white transition-transform transform hover:scale-105 ">
            <h2 className="text-xl font-semibold mb-2">Medicines Available</h2>
            <p className="text-3xl font-bold">100k+</p>
          </div>
          <div className="p-2 ring-2 ring-gray-500  rounded-lg shadow-2xl bg-white text-black hover:bg-[#0A5872] hover:text-white transition-transform transform hover:scale-105 ">
            <h2 className="text-xl font-semibold mb-2">Expert Doctors</h2>
            <p className="text-3xl font-bold">2k+</p>
          </div>
          <div className="p-2 ring-2 ring-gray-500  rounded-lg shadow-2xl bg-white text-black hover:bg-[#0A5872] hover:text-white transition-transform transform hover:scale-105 ">
            <h2 className="text-xl font-semibold mb-2">
              Total Satisfied Patients
            </h2>
            <p className="text-3xl font-bold">24k+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFeed;
