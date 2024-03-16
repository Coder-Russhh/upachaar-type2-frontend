import React from 'react';

const AccessRestrict = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={spaceVideo} type="video/mp4" />
      </video> */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="md:text-6xl text-3xl ">Access Restrict 401</h1>
          <h2 className="md:text-7xl text-4xl underline">Only for Samsung Users</h2>
        </div>
      </div>
    </div>
  );
};

export default AccessRestrict;
