import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Assuming you're using react-calendar
import 'react-calendar/dist/Calendar.css';

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointmentType, setAppointmentType] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const handleAppointmentTypeChange = (event) => {
    setAppointmentType(event.target.value);
  };

  const handleSubmit = () => {
    // Logic to submit appointment details to backend
    // You can use selectedDate, timeSlot, and appointmentType states here
  };

   // Generate time slots (every 15 minutes from 4:00 PM to 8:00 PM)
   const timeSlots = [];
   const startTime = new Date(selectedDate);
   startTime.setHours(16, 0, 0, 0); // Start at 4:00 PM
   const endTime = new Date(selectedDate);
   endTime.setHours(20, 0, 0, 0); // End at 8:00 PM
   const incrementMinutes = 15;
   for (let time = new Date(startTime); time <= endTime; time.setMinutes(time.getMinutes() + incrementMinutes)) {
     timeSlots.push(time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
   }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Select Date:</h3>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Select Time Slot:</h3>
        <div className="grid grid-cols-4 gap-2 ">
          {timeSlots.map((timeSlot, index) => (
           <div className='bg-red-500 m-2 h-24 w-24 rounded-[50%] flex justify-center items-center'>
             <button
              key={index}
              className={`py-2 px-4 rounded-md  ${selectedTimeSlot === timeSlot ? 'bg-blue-500 text-white' : 'text-gray-800'}`}
              onClick={() => handleTimeSlotSelection(timeSlot)}
            >
              {timeSlot}
            </button>
           </div>
          ))}
        </div>
        {/* <select
          className="border rounded-md px-3 py-2 w-full"
          value={timeSlot}
          onChange={handleTimeSlotChange}
        >
          <option value="">Select Time Slot</option>
        </select> */}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Select Appointment Type:</h3>
        <select
          className="border rounded-md px-3 py-2 w-full"
          value={appointmentType}
          onChange={handleAppointmentTypeChange}
        >
          <option value="">Select Appointment Type</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default Appointment;
