import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import bgDoctor from "../../assets/HomeImg/services/service1r.jpg";
import Axios from "axios";

const PatientLobby = () => {
  const [patientEmail, setPatientEmail] = useState("");
  const [room, setRoom] = useState("");
  const { patientId } = useParams();

  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientEmail = async () => {
      try {
        const response = await Axios.get(`/api/patients/get/${patientId}`);
        console.log(response.data.data);
        const patientData = response.data.data;
        setPatientEmail(patientData.email);
      } catch (error) {
        console.error("Error fetching patient email:", error);
      }
    };

    fetchPatientEmail();
  }, [patientId]);

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", {
        email: patientEmail,
        room,
      });
    },
    [patientEmail, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      // console.log(data)
      navigate(`/connectroom/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    // multiple time render na ho component
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <div className="flex justify-center items-center h-screen relative">
      <img
          src={bgDoctor}
          alt=""
          className="absolute inset-0 object-cover w-full h-full opacity-75"
        />
        <div className="p-8 md:w-1/3 w-full bg-color shadow-md rounded-md relative z-10">
          <h2 className="text-2xl text-white text-center font-semibold mb-4">
            Connect with Your Doctor
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-200"
              >
                Email Id
              </label>
              <input
                type="email"
                value={patientEmail}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="roomNumber"
                className="block text-sm font-bold text-gray-200"
              >
                Room Number
              </label>
              <input
                type="text"
                value={room}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={handleRoomChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-white border-2 border-black text-black py-2 px-8  rounded-md hover:bg-white hover:text-blue-800"
              >
                Join Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PatientLobby;
