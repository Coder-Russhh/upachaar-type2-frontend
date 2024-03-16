import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Importing the down and up arrow icons
import specialtiesData from "../../static/specialtiesData";

const Speciality = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-x-auto">
      <h1 className="text-xl md:text-3xl mb-4  font-bold text-color hover:underline md:mt-8">Choose Any Specific Category </h1>
      <div className=" my-2 grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-8 mx-4">
        {specialtiesData.slice(0, showAll ? specialtiesData.length : 11).map((specialty) => (
          <div
            key={specialty.id}
            className="h-10 w-10 md:h-24 md:w-24 text-sm hover:scale-105  bg-color text-white rounded-full flex justify-center items-center"
          >
            {/* {specialty.name} */}
            S
          </div>
        ))}
        {!showAll ? (
          <div
            className="h-10 w-10 md:h-24 md:w-24 font-bold rounded-full flex justify-center items-center cursor-pointer"
            onClick={toggleShowAll}
          >
            <FiChevronDown size={25} />
          </div>
        ) : (
          <div
            className="h-10 w-10 md:h-24 md:w-24 font-bold  rounded-full flex justify-center items-center cursor-pointer"
            onClick={toggleShowAll}
          >
            <FiChevronUp size={25}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Speciality;
