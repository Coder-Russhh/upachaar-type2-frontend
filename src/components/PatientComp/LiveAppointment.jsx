import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import LiveHandlePayment from "./LiveHandlePayment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import socket from "../../services/socket";

const LiveAppointment = () => {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);

  const handleFetchSlots = async () => {
    setError(null);

    try {
      if (!selectedDate) {
        setError("Please select a date");
        return;
      }

      const formattedDate = selectedDate.toISOString().split("T")[0]; // Format the date
      const response = await axios.get(`/api/live-appointments/get/doctorslots/${doctorId}`, {
        params: { date: formattedDate }, // Pass date as a query parameter
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Error fetching slots");
    }
  };

  useEffect(() => {
    handleFetchSlots();

    socket.on("slotsGenerated", async (data) => {
      // console.log("Appointment completed by staff:", data);
      try {
        await handleFetchSlots();
      } catch (error) {
        console.error(
          "Error updating appointment times or fetching slots:",
          error
        );
      }
    });

    socket.on("appointmentCompleted", async (data) => {
      // console.log("Appointment completed by staff:", data);
      try {
        //Fetch updated slots
        await handleFetchSlots();
      } catch (error) {
        console.error(
          "Error updating appointment times or fetching slots:",
          error
        );
      }
    });

    socket.on("appointmentStatus", (data) => {
      // console.log("Appointment status updated by patient:", data);
      handleFetchSlots();
    });

    // Clean up socket event listener on unmount
    return () => {
      socket.off("appointmentCompleted");
      socket.off("slotsGenerated");
      socket.off("appointmentStatus")
    };
  }, []);

  const handleDateChange = (date) => {
    const istOffset = 330; // IST is UTC+5:30

    // Calculate the offset in milliseconds
    const offsetInMs = istOffset * 60 * 1000;

    const istDate = new Date(date.getTime() + offsetInMs);

    setSelectedDate(istDate);
  };

  const handleIDClick = (appointment, slotNumber) => {
    if (appointment.status !== "pending") {
      return;
    }

    setSelectedAppointment({ ...appointment, slotNumber });
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <>
      {/* select date */}
      <div className="p-4">
        <h2 className="text-xl mb-4">Select Date</h2>
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

        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex items-center overflow-x-auto m-4">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-6  py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Book Your Slot
                </th>
                <th
                  scope="col"
                  className="py-4 px-6  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Doctor Fee:-
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Expected Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Current Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-sm text-gray-900">{index + 1}</div>
                  </td>
                  <td
                    className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap border text-white text-md border-gray-400"
                    onClick={() => handleIDClick(appointment, index + 1)}
                  >
                    {appointment.status === "pending" ? (
                      <div className="bg-blue-500 hover:bg-blue-700 text-center rounded-lg px-4">
                        Slot Free
                      </div>
                    ) : appointment.status === "completed" ? (
                      <div className="bg-purple-700 hover:bg-purple-900 text-center rounded-lg px-4">
                        Completed
                      </div>
                    ) : appointment.status === "cancelled" ? (
                      <div className="bg-red-500 hover:bg-red-700 text-center rounded-lg px-4">
                        Cancelled
                      </div>
                    ) : (
                      <div className="bg-green-500 hover:bg-green-600 cursor-pointer text-center rounded-lg px-4">
                        Booked
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-sm text-gray-900">
                      {appointment.fee} Rs/-
                    </div>
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-sm text-gray-900">
                      {/* Display date in YYYY-MM-DD format */}
                      {
                        new Date(appointment.appointmentTime)
                          .toISOString()
                          .split("T")[0]
                      }
                    </div>
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap border border-gray-400">
                    <div className="text-sm text-gray-900">
                      {/* Display time in HH:MM format if status is not completed */}
                      {appointment.status !== "completed" ? (
                        new Date(
                          appointment.appointmentTime
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      ) : (
                        <div className="h-[1px] md:w-4 w-2 bg-gray-900"></div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap border text-white text-md border-gray-400">
                    {appointment.status === "pending" ? (
                      <div className="bg-blue-500 hover:bg-blue-700 text-center rounded-lg px-4">
                        {appointment.status}...
                      </div>
                    ) : appointment.status === "completed" ? (
                      <div className="bg-purple-700 hover:bg-purple-900 text-center rounded-lg px-4">
                        {appointment.status}
                      </div>
                    ) : appointment.status === "cancelled" ? (
                      <div className="bg-red-500 hover:bg-red-700 text-center rounded-lg px-4">
                        Cancelled
                      </div>
                    ) : (
                      <div className="bg-green-500 hover:bg-green-600 cursor-pointer text-center rounded-lg px-4">
                        {appointment.status}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Overlay screen */}
      {showUpdateForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-100 md:h-[50vh] md:w-[50vw] w-[90vw] p-6 rounded-lg relative">
            <IoClose
            size={20}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleCloseForm}
            />

            <div className="">
              <LiveHandlePayment
                appointmentId={selectedAppointment._id}
                slotNumber={selectedAppointment.slotNumber}
                handleFetchSlots={handleFetchSlots}
                handleCloseForm={handleCloseForm}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveAppointment;
