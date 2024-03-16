import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import DoctorSearch from "./DoctorSearch";
import axios from "axios";

const PatientHeader = () => {
  const { patientId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleCross = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`/api/patients/get/${patientId}`);
        setPatientName(response.data.data.username);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  return (
    <>
      <div className="h-[12vh] md:h-[7vh] gap-2 flex flex-col md:flex-row">
        <div className="flex h-[6vh] md:w-[100vw] bg-color rounded-r-sm items-center justify-between p-4 text-white">
          <div className="flex items-center">
            {/* Hamburger menu toggle button */}
            <div className="cursor-pointer" onClick={handleMenuToggle}>
              {/* {showMenu ? <FiX size={24} /> : <FiMenu size={24} />} */}
              <FiMenu size={24} />
            </div>

            {/* Menu options */}
            {showMenu && (
              <>
                <div
                  className="absolute opacity-30 bg-black text-black h-[100vh] w-[100vw] top-0 left-0 z-[12]"
                  onClick={handleCross}
                ></div>

                <div className="relative">
                  <div className="bg-color z-[12] text-white text-center absolute top-0 left-0  md:h-[30vh] md:w-[20vw] w-[75vw] flex justify-between border-2 border-white">
                    <div className=" w-full">
                      <Link to={`/patient/home/${patientId}`}>
                        <p className="cursor-pointer mt-2 md:mt-4 hover:bg-[#0A5872]">
                          Home
                        </p>
                      </Link>
                      <Link to={`/patient/appointmentsrecord/${patientId}`}>
                        <p className="cursor-pointer mt-2 hover:bg-[#0A5872]">
                          Appointments Record
                        </p>
                      </Link>
                      <Link to={`/patient/healthfeed/${patientId}`}>
                        <p className="cursor-pointer mt-2 hover:bg-[#0A5872]">
                          HealthFeed
                        </p>
                      </Link>
                      <Link to={`/patient/medicalhistory/${patientId}`}>
                        <p className="cursor-pointer mt-2 hover:bg-[#0A5872]">
                          Medical History
                        </p>
                      </Link>
                      <Link to={`/patient/healthmetrics/${patientId}`}>
                        <p className="cursor-pointer mt-2 hover:bg-[#0A5872]">
                          Health Metrics
                        </p>
                      </Link>
                      <Link to={"/"}>
                        <p className="cursor-pointer text-md m-2 rounded-sm bg-white font-semibold text-red-500 hover:bg-red-700 hover:text-white">
                          Sign Out
                        </p>
                      </Link>
                    </div>
                    <div onClick={handleCross}>
                      <FiX size={24} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Welcome user heading */}
          <Link to={`/patient/home/${patientId}`}>
            <h2 className="text-lg md:text-2xl block">
              Welcome, {patientName.substring(0, 7)}..
            </h2>
          </Link>

          <Link to={`/patient/usernotification/${patientId}`}>
            <div>
              <IoNotifications size={24} />
            </div>
          </Link>

          {/* User profile icon */}
          <Link to={`/patient/patientprofile/${patientId}`}>
            <FiUser size={24} />
          </Link>
        </div>
        <div className="h-[6vh] flex justify-center">
          <DoctorSearch />
        </div>
      </div>
    </>
  );
};

export default PatientHeader;
