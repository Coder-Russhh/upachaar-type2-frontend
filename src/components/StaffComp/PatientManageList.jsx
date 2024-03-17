import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoClose } from "react-icons/io5";
import socket from "../../services/socket";
import {useParams} from "react-router-dom"
import { IoMdPhonePortrait } from "react-icons/io";
import { FaWalking } from "react-icons/fa";
import { backendURL } from "../../config/dev";

const PatientManageList = () => {
  const {doctorId} = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    socket.on("appointmentCompleted", async (data) => {
      console.log("Appointment completed by staff:", data);
      try {
        // Update appointment times
        await updateAppointmentTimes();

        // Fetch updated slots
        await handleFetchSlots();
      } catch (error) {
        console.error(
          "Error updating appointment times or fetching slots:",
          error
        );
      }
    });

    socket.on("appointmentStatus", (data) => {
      console.log("Appointment status updated by patient:", data);
      // Refresh slots after status update
      handleFetchSlots();
    });

    // Clean up socket event listener on unmount
    return () => {
      socket.off("appointmentCompleted");
      socket.off("appointmentStatus");
    };
  }, []);

  useEffect(() => {
    handleFetchSlots();
  }, []);


  const handleDateChange = (date) => {
    const istOffset = 330; // IST is UTC+5:30

    // Calculate the offset in milliseconds
    const offsetInMs = istOffset * 60 * 1000;

    const istDate = new Date(date.getTime() + offsetInMs);

    setSelectedDate(istDate);
  };

  const handleFetchSlots = async () => {
    setError(null);

    try {
      if (!selectedDate) {
        setError("Please select a date");
        return;
      }

      const formattedDate = selectedDate.toISOString().split("T")[0]; // Format the date
      const response = await axios.get(`${backendURL}/live-appointments/get/doctorslots/${doctorId}`, {
        params: { date: formattedDate }, // Pass date as a query parameter
      });
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Error fetching slots");
    }
  };

  const updateAppointmentTimes = async () => {
    try {
      // Send a PATCH request to the server endpoint
      const response = await axios.patch(`${backendURL}/live-appointments/updatetime`);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating appointment times:", error);
    }
  };

  const handleCompleteAppointment = async () => {
    try {
      // const startTime = new Date(selectedAppointment.appointmentTime).toLocaleTimeString([], {
      //   hour: "2-digit",
      //   minute: "2-digit",
      // });
      const startTime = selectedAppointment.appointmentTime;
      const response = await axios.patch(
        `${backendURL}/live-appointments/complete/${selectedAppointment._id}`,
        { startTime }
      );
      // console.log(response.data);
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error completing appointment:", error);
      setError("Error completing appointment");
    }
  };

  const handleIDClick = (slot, slotNumber) => {
    setSelectedAppointment({ ...slot, slotNumber });
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <>
      {/* fetching slots */}
      <div className="flex flex-col items-start justify-center m-4 ">
        <h2 className="text-xl my-2 font-bold">Select Date:</h2>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-300 rounded px-2 py-1 mb-4"
          />
          <button
            onClick={handleFetchSlots}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Fetch Slots
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* patient manage */}
      <div className="bg-green-400 flex items-center overflow-x-auto m-4">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-400">
            <thead className="bg-color text-white">
              <tr>
                <th
                  scope="col"
                  className="px-1 md:px-6 py-3 text-center md:text-left text-xs md:text-sm font-medium uppercase tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-1 md:px-6 py-3 text-center md:text-left text-xs md:text-sm font-medium uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-1 md:px-6 py-3 text-center md:text-left text-xs md:text-sm font-medium uppercase tracking-wider"
                >
                  Doctor Fee:-
                </th>
                <th
                  scope="col"
                  className="px-1 md:px-6 py-3 text-center md:text-left text-xs md:text-sm font-medium uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-1 md:px-6 py-3 text-center md:text-left text-xs md:text-sm font-medium uppercase tracking-wider"
                >
                  Expected Time
                </th>
                <th
                  scope="col"
                  className="px-1 md:px-6 py-3 text-center md:text-left text-xs md:text-sm font-medium uppercase tracking-wider"
                >
                  Appointment Mode
                </th>
                <th
                  scope="col"
                  className="px-1 md:px-6 py-3 text-center md:text-left text-xs md:text-sm font-medium uppercase tracking-wider"
                >
                  Current Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {slots.map((slot, index) => (
                <tr key={index}>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-xs md:text-sm text-gray-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-xs md:text-sm text-gray-900">
                      {slot._id}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-xs md:text-sm text-gray-900">
                      {slot.fee} Rs/-
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-xs md:text-sm text-gray-900">
                      {slot.date}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-xs md:text-sm text-gray-900">
                      {new Date(slot.appointmentTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-xs md:text-sm text-gray-900">
                      {slot.consultationMode === "clinic" ? (
                      <div className="text-xs md:text-sm">
                       <span></span>
                       <FaWalking  size={25}/>
                       {/* {slot.consultationMode} */}
                      </div>
                    ) : (
                      <div className="text-xs  md:text-sm">
                       <span></span>
                       <IoMdPhonePortrait color="blue"  size={25}/>
                       {/* {slot.consultationMode} */}
                      </div>
                    )}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap border border-gray-400">
                    {slot.status === "pending" ? (
                      <div className="bg-blue-500 text-xs md:text-sm">
                        {slot.status}...
                      </div>
                    ) : slot.status === "completed" ? (
                      <div className="bg-purple-700 text-xs md:text-sm">
                        {slot.status}
                      </div>
                    ) : (
                      <div
                        className="bg-green-500 cursor-pointer text-xs md:text-sm"
                        onClick={() => handleIDClick(slot, index + 1)}
                      >
                        {slot.status}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* overlay screen */}
      {showUpdateForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white h-[50vh] w-[50vw] p-6 rounded-lg relative">
            <IoClose
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleCloseForm}
            />

            <div>
              <h1>{selectedAppointment._id}</h1>
              <h1>
                {new Date(
                  selectedAppointment.appointmentTime
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h1>
              <div>
                <button
                  onClick={handleCloseForm}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteAppointment}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Complete Appointment
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientManageList;
