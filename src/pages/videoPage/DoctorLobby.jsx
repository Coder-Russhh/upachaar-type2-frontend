import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import bgDoctor from "../../assets/HomeImg/services/service1r.jpg";
import Axios from "axios";

const DoctorLobby = () => {
  const [doctorEmail, setDoctorEmail] = useState("");
  const [room, setroom] = useState("");
  const { doctorId } = useParams();

  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorEmail = async () => {
      try {
        const response = await Axios.get(`/api/doctors/${doctorId}`);
        // console.log(response.data.doctor.email)
        const doctorData = response.data.doctor;
        setDoctorEmail(doctorData.email);
      } catch (error) {
        console.error("Error fetching doctor email:", error);
      }
    };

    fetchDoctorEmail();
  }, []);

  const handleRoomChange = (e) => {
    setroom(e.target.value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", {
        email: doctorEmail,
        room,
      });
    },
    [doctorEmail, room, socket]
  );

  // const sendRoomIdToPatient = ()=>{

  // }

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

  function generateRoomNumber() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleReloadRoom = () => {
    setroom(generateRoomNumber());
  };

  useEffect(() => {
    // Generate a random room number when component mounts
    setroom(generateRoomNumber());
  }, []);

  return (
    <div className="flex justify-center items-center h-screen relative">
      <img
        src={bgDoctor}
        alt=""
        className="absolute inset-0 object-cover w-full h-full opacity-75"
      />
      <div className="p-8 md:w-1/3 w-full bg-color shadow-md rounded-md relative z-10">
        <h2 className="text-2xl text-white text-center font-semibold mb-4">
          Connect with Patient
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
              value={doctorEmail}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setDoctorEmail(e.target.value)}
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
          <div className="ml-2 flex justify-center items-center p-2 my-2 rounded-md">
            <span className="cursor-pointer" onClick={handleReloadRoom}>
              <IoReload color="white" size={20} />
            </span>
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
        {/* <div className="flex justify-center mb-4">
          <button  onClick={sendRoomIdToPatient} className="bg-blue-600 text-white border-2 border-white py-2 px-8  rounded-md hover:bg-white hover:text-blue-800">
            Send RoomId to Patient
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DoctorLobby;
