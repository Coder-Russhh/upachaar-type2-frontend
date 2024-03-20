import React from "react";

const AccessRestrict = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-color text-white">
        <div className=" text-center animate-pulse">
          <h1 className="md:text-6xl text-3xl ">Access Restrict 401</h1>
          <h2 className="md:text-7xl text-4xl underline">
            Only for Samsung Users
          </h2>
        </div>
      </div>
    </>
  );
};

export default AccessRestrict;
