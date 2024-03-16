import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import DoctorHeader from '../../components/DoctorComp/DoctorHeader';
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PatientRecord = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { doctorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  const fetchSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0]; // Convert date to ISO format
      const response = await Axios.get(`/api/live-appointments/get-video-slots/${doctorId}?date=${formattedDate}`);
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <DoctorHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-3xl font-semibold mb-6">Select a Date:-</h1>
        <div className="mb-4 text-center">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="text-center border border-gray-400 rounded py-1 mb-4"
          />
        </div>
        {slots.map((slot, index) => (
          <div key={index} className="border-2 border-blue-300 rounded-lg p-6 mb-6">
            <h2 className="underline font-semibold text-2xl mb-2">Patient {index + 1}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <p><span className="font-semibold md:text-xl">Doctor:</span> {slot.doctor}</p>
              <p><span className="font-semibold md:text-xl">Patient ID:</span> {slot.patientId}</p>
              <p><span className="font-semibold md:text-xl">Patient:</span> {slot.patient}</p>
              <p><span className="font-semibold md:text-xl">Appointment Time:</span> {new Date(slot.appointmentTime).toLocaleTimeString()}</p>

              <p><span className="font-semibold md:text-xl">Date:</span> {slot.date}</p>
              <p><span className="font-semibold md:text-xl">Status:</span> {slot.status}</p>
              <p><span className="font-semibold md:text-xl">Fee:</span> {slot.fee}</p>
              <p><span className="font-semibold md:text-xl">Consultation Mode:</span> {slot.consultationMode}</p>
            </div>
            <div className='text-center my-4'>
              <span className='bg-color text-white hover:bg-blue-500 px-12 py-2 rounded-lg' onClick={()=>{
                navigate(`/doctor/videoLobby/${doctorId}`)
              }}>
              Connect Video
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PatientRecord;
