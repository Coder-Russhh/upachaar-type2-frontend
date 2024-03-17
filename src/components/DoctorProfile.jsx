import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../config/dev";

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctor data using the doctorId
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${backendURL}/doctors/${doctorId}`);
        const data = await response.json();

        if (data.success) {
          setDoctor(data.doctor);
        } else {
          console.error("Error fetching doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);
  return (
    <>
    <div className="h-1 w-full bg-white"></div>
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center border-b-2">
        <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Doctor"
            className="rounded-xl md:rounded-xl shadow-lg w-full h-56 md:w-96 md:h-64"
          />
        </div>

        {/* Profile Information Section */}
        <div className="w-full md:w-2/3 m-4 border-2 border-blue-300 bg-gray-200 text-black rounded-lg shadow-lg p-6">
          {doctor ? (
            <>
              <h2 className="text-3xl text-center font-semibold mb-8 underline">Doctor Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-center ">
                <div className="flex items-center">
                  <p className="font-bold w-1/3">Name:</p>
                  <p className="w-2/3">{doctor.username}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold w-1/3">Clinic Address:</p>
                  <p className="w-2/3">{doctor.clinicAddress}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold w-1/3">Email:</p>
                  <p className="w-2/3">{doctor.email}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold w-1/3">City:</p>
                  <p className="w-2/3">{doctor.city}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold w-1/3">Experience:</p>
                  <p className="w-2/3">{doctor.experience}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold w-1/3">Gender:</p>
                  <p className="w-2/3">{doctor.gender}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold w-1/3">Qualification:</p>
                  <p className="w-2/3">{doctor.qualification}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold w-1/3">Speciality:</p>
                  <p className="w-2/3">{doctor.speciality}</p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
