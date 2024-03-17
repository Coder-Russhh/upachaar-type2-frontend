import React, { useState, useEffect } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { backendURL } from "../../config/dev";

const LiveHandlePayment = ({
  appointmentId,
  slotNumber,
  handleFetchSlots,
  handleCloseForm,
}) => {
  const { patientId, doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [appointmentMode, setAppointmentMode] = useState(
    location.pathname.includes("video") ? "video" : "clinic"
  );
  const [appointmentData, setAppointmentData] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    fetchAppointmentData();
    fetchPatientData();
    return () => {};
  }, [appointmentId, patientId]);

  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/live-appointments/get-slot/${appointmentId}`
      );
      // console.log(response)
      setAppointmentData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${backendURL}/patients/get/${patientId}`);
      // console.log(response)
      setPatientData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  const handleToken = async (token) => {
    try {
      const response = await axios.post(`${backendURL}/payment/process-payment`, {
        token: token,
        appointmentId: appointmentData ? appointmentData._id : null,
        fee: appointmentData ? appointmentData.fee : null,
        time: appointmentData ? appointmentData.appointmentTime : null,
      });
      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle error
    }
  };

  const handlePaymentConfirmation = async (action) => {
    try {
      if (action === "cancelled") {
        handleCloseForm();
        return;
      }

      const response = await axios.post(`${backendURL}/payment/handle-payment`, {
        sessionId,
        action,
        appointmentId: appointmentData ? appointmentData._id : null,
        patientId: patientData ? patientData._id : null,
        patientUsername: patientData ? patientData.username : null,
        appointmentMode: appointmentMode,
      });
      // console.log(response.data)
      if (response.data.success === true) {
        handleFetchSlots();
        handleCloseForm();
      } else {
        alert("some error is there");
      }
    } catch (error) {
      // Handle confirmation error
      console.error("Payment confirmation error:", error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-1">
      {loading ? (
        <div>Loading...</div>
      ) : appointmentData && patientData ? (
        <>
          <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2">Appointment Details</h2>
            <p>Username: {patientData.username}</p>
            <p>Email: {patientData.email}</p>
            <p>Gender: {patientData.gender}</p>
            <p>Serial Number: {slotNumber}</p>
            <p>Appointment ID: {appointmentData._id}</p>
            <p>
              Date:{" "}
              {new Date(appointmentData.appointmentTime).toLocaleDateString()}
            </p>
            <p>
              Time:{" "}
              {new Date(appointmentData.appointmentTime).toLocaleTimeString()}
            </p>
            <p>Fee: {appointmentData.fee} Rs/-</p>
          </div>
          <div className="flex justify-center">
            {!sessionId && (
              <StripeCheckout
                stripeKey="pk_test_51OiHCoSE17PdorGk6oi5afd8KspLQVpBcfHTZj5ecyLcijXQjB0Amm559tGm5u0NzrGwygmHcCq8UJQBewo2XL7w00nZbg23o3"
                token={handleToken}
                amount={appointmentData.fee * 100} // Amount is in cents
                name="Appointment Payment"
                description="Payment for appointment"
                currency="INR"
              >
                <button className="bg-color hover:bg-[#0A5872] text-white font-bold py-2 px-4 rounded">
                  Pay now
                </button>
              </StripeCheckout>
            )}
          </div>
          {sessionId && (
            <div className="flex justify-center items-center">
              <button
                onClick={() => handlePaymentConfirmation("confirmed")}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold md:py-2 px-4 rounded mr-2"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => handlePaymentConfirmation("cancelled")}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold  md:py-2 px-4 rounded"
              >
                Cancel Payment
              </button>
            </div>
          )}
        </>
      ) : (
        <div>Appointment data not found</div>
      )}
    </div>
  );
};

export default LiveHandlePayment;
