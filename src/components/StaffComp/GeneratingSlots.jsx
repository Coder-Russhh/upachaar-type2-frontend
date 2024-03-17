import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { backendURL } from "../../config/dev";

const GeneratingSlots = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slotsGenerated, setSlotsGenerated] = useState(false);

  const { doctorId, staffId } = useParams();

  let buttonClass = slotsGenerated
    ? "bg-purple-500 hover:bg-purple-600"
    : "bg-blue-500 hover:bg-blue-600";

  const handleGenerateSlots = async () => {
    if (slotsGenerated) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${backendURL}/live-appointments/generate-slots/${doctorId}`
      );
      console.log(response.data);
      setLoading(false);
      setSlotsGenerated(true);
    } catch (error) {
      console.error("Error generating slots:", error);
      setError("Error generating slots");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 m-4">
      <h2 className="text-2xl font-bold mb-4">Generate Appointment Slots</h2>
      <button
        onClick={handleGenerateSlots}
        className={`text-white px-4 py-2 rounded-md ${buttonClass}`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Slots"}
      </button>

      {slotsGenerated ? (
        <>
          <Link  to={`/staff/patientmanagement/${doctorId}/${staffId}`}>
            <button className="py-2 px-4 rounded-md mt-4 border-2 border-black flex items-center gap-2">
              <span>Move to Patient Management</span>
              <FaArrowRight
                size={20}
                color="grey"
                className="animate-marquee"
              />
            </button>
          </Link>
        </>
      ) : null}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default GeneratingSlots;
