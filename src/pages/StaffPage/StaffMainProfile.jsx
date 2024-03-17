import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StaffHeader from "../../components/StaffComp/StaffHeader";
import { backendURL } from "../../config/dev";
// import girl1 from "../../assets/HomeImg/girl1.jpg";

const StaffMainProfile = () => {
  const [staffData, setStaffData] = useState(null);
  const { doctorId } = useParams();
  const { staffId } = useParams();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/doctors/${doctorId}/staff/${staffId}`
        );
        console.log(response.data.data);
        setStaffData(response.data.data.staffMember);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffData();
  }, [doctorId, staffId]);

  return (
    <>
      <StaffHeader />
      {staffData && (
        <div className="flex flex-col md:flex-row items-center justify-evenly border-2 border-blue-300 m-4 rounded-2xl">
          <img src="" alt="Staff" className="w-[75vw] md:w-[25vw] h-[40vh] md:h-[50vh] rounded-full md:rounded-l-full" />

          <div className="text-center md:text-left bg-white font-bold md:rounded-r-lg p-4 md:mr-32">
            <div className="my-2">
              <h2 className="text-sm md:text-2xl font-semibold inline-block md:mr-2">Staff Id:</h2>
              <p className="text-xs md:text-xl text-gray-600 inline-block">{staffData.staffId}</p>
            </div>
            <div className="my-2">
              <h2 className="text-sm md:text-2xl font-semibold inline-block md:mr-2">Doctor Id:</h2>
              <p className="text-xs md:text-xl text-gray-600 inline-block">{staffData.doctorId}</p>
            </div>
            <div className="my-2">
              <h2 className="text-sm md:text-2xl font-semibold inline-block md:mr-2">Username:</h2>
              <p className="text-xs md:text-xl text-gray-600 inline-block">{staffData.username}</p>
            </div>
            <div className="my-2">
              <h2 className="text-sm md:text-2xl font-semibold inline-block md:mr-2">Email:</h2>
              <p className="text-xs md:text-xl text-gray-600 inline-block">{staffData.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffMainProfile;
