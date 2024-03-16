import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StripeCheckout from "react-stripe-checkout";

const RealTimeAppointment = () => {
  const { patientId, doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [doctorAvailability, setDoctorAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [fee, setFee] = useState(0);
  const [sessionId, setSessionId] = useState(null); // Define sessionId state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    fetchDoctorAvailability();
  }, [doctorId]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/appointment/${doctorId}`);
      setAppointments(response.data.allAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchDoctorAvailability = async () => {
    try {
      const response = await axios.get(
        `/api/doctor-availabilities/${doctorId}`
      );
      setDoctorAvailability(response.data.doctorAvailability);
      setFee(response.data.doctorAvailability.fee);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleToken = async (token) => {
    try {
      const response = await axios.post(
        `/api/appointment/${patientId}/${doctorId}`,
        {
          token,
          date: selectedDate,
          startTime: selectedTime,
          fee,
          appointmentDetails: {
            selectedDate,
            selectedTime,
            fee,
            patientId,
            doctorId,
          },
        }
      );
      // Handle successful payment response
      console.log("Payment successful:", response.data);
      setSessionId(response.data.sessionId); // Update sessionId state
    } catch (error) {
      // Handle payment error
      console.error("Payment error:", error);
    }
  };

  const handlePaymentConfirmation = async (action) => {
    try {
      const response = await axios.post("/api/appointment/handle-payment", {
        sessionId,
        action, // 'confirmation' or 'cancelled'
      });
      console.log("Payment confirmation successful:", response.data);
    } catch (error) {
      // Handle confirmation error
      console.error("Payment confirmation error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform submission logic here, e.g., send appointment details to the server
      console.log("Selected Date:", selectedDate);
      console.log("Selected Time:", selectedTime);
      console.log("Fee:", fee);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-red-500">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date:
            </label>
            <DatePicker
              id="date"
              selected={selectedDate}
              onChange={handleDateChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Select Time:
            </label>
            <input
              type="time" // Use type="time" for time input
              id="time"
              value={selectedTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4 flex">
            <h1>Fee:</h1>
            <p>{fee}</p>
          </div>
          {!sessionId && (
              <StripeCheckout
              stripeKey="pk_test_51OiHCoSE17PdorGk6oi5afd8KspLQVpBcfHTZj5ecyLcijXQjB0Amm559tGm5u0NzrGwygmHcCq8UJQBewo2XL7w00nZbg23o3"
              token={handleToken}
              amount={fee * 100} // Amount is in cents
              name="Appointment Payment"
              description="Payment for appointment"
              currency="INR"
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Pay now
              </button>
            </StripeCheckout>
          )}
        </form>
        {sessionId && (
          <>
            <div>
              <button
                onClick={() => handlePaymentConfirmation("confirmed")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => handlePaymentConfirmation("cancelled")}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel Payment
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RealTimeAppointment;
