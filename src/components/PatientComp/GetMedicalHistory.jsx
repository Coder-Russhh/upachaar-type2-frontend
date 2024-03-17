import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { backendURL } from "../../config/dev";

const GetMedicalHistory = () => {
  const { patientId } = useParams();
  const [medicalHistory, setMedicalHistory] = useState(null);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/medical-history/get/${patientId}`
        );
        setMedicalHistory(response.data.medicalHistory);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, [patientId]);

  return (
    <div className="container mx-auto">
      {medicalHistory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black bg-color">
          {medicalHistory.map((history) => (
            <div
              key={history._id}
              className="border rounded m-4 p-4 bg-white flex flex-col md:flex-row  items-start justify-evenly"
            >
              <div className="">
                {/* <h2 className="text-xl font-bold mb-2">
                Patient ID: {history.patientId}
              </h2> */}
                <div className="flex items-center gap-4 mb-1">
                  <h3 className="text-lg font-bold">Conditions:</h3>
                  <ul className="hover:underline">
                    {history.conditions.map((condition) => (
                      <li key={condition}>{condition}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-4 mb-1">
                  <h3 className="text-lg font-bold">Allergies:</h3>
                  <ul className="hover:underline">
                    {history.allergies.map((allergy) => (
                      <li key={allergy}>{allergy}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-4 mb-1">
                  <h3 className="text-lg font-bold">Surgeries:</h3>
                  <ul>
                    {history.surgeries.map((surgery) => (
                      <li key={surgery._id}>
                        {surgery.name} /{" "}
                        <span className="hover:underline">
                          {" "}
                          Date: {new Date(surgery.date).toDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <h3 className="text-lg font-bold">Medications:</h3>
                  <ul className="">
                    {history.medications.map((medication, index) => (
                      <React.Fragment key={medication._id}>
                        <div className="h-[1px] bg-color"></div>
                        <li>
                          {medication.name} - Dosage: {medication.dosage}
                        </li>
                        <li>
                          Start Date:{" "}
                          {new Date(medication.startDate).toDateString()}
                        </li>
                        <li>
                          End Date:{" "}
                          {new Date(medication.endDate).toDateString()}
                        </li>
                        <div className="h-[1px] bg-color"></div>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex h-full w-full md:w-auto flex-row md:flex-col justify-between">
                <FaEdit size={24} />
                <MdDelete size={24} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetMedicalHistory;
