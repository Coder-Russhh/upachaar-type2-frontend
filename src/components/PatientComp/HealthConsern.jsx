import React from "react";
import healthConcernsData from "../../static/healthConcernsData";

const HealthConsern = () => {
  return (
    <div className="">
      <h1 className="text-xl md:text-3xl mb-4 text-center font-bold text-color hover:underline">
        Consult Top Doctors for any health concerns{" "}
      </h1>
      <div className="overflow-x-auto">
        <div className="md:my-4 mb-4 grid grid-flow-col md:gap-6 gap-6 ml-4">
          {healthConcernsData.map((concern) => (
            <div className="flex flex-col  items-center " key={concern.id}>
              <div className="md:h-48 h-24 md:w-48 w-24 border-4 border-blue-800 hover:scale-105  rounded-full flex justify-center items-center">
                <img
                  src={concern.image}
                  className="h-full w-full rounded-full"
                  alt={concern.name}
                />
              </div>
              <h1 className="font-bold text-center">{concern.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthConsern;
