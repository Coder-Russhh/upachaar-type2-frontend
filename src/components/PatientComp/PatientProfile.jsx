import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientHeader from "./PatientHeader";
import { useParams } from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { backendURL } from "../../config/dev";

const PatientProfile = () => {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { patientId } = useParams();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${backendURL}/patients/get/${patientId}`);
        setPatientData(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleEditClick = () => {
    setIsEditing(true);
    // Initialize form data with current patient details
    setFormData({
      username: patientData.username,
      email: patientData.email,
      gender: patientData.gender,
      prescription: patientData.prescription,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make axios request to update patient data
      await axios.put(`/api/patients/update/${patientId}`, formData);
      // After successful update, refetch patient data to reflect the changes
      const response = await axios.get(`/api/patients/get/${patientId}`);
      setPatientData(response.data.data);
      setIsEditing(false); // Hide edit form
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Hide edit form
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <PatientHeader />
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : patientData ? (
          <div className="bg-color text-white p-4 m-8 rounded-lg flex items-center justify-between relative">
            <div className="bg-white mr-4 w-full text-black p-4 rounded-md">
              <h2 className="text-2xl hover:underline">Patient Details:</h2>
              <p  className="text-lg">Name: {patientData.username}</p>
              <p className="text-lg">Email: {patientData.email}</p>
              <p className="text-lg">Gender: {patientData.gender}</p>
              <p className="text-lg">Prescription: {patientData.prescription}</p>
            </div>
            <div className="h-[15vh] flex  flex-col justify-between">
              <FaEdit size={20} onClick={handleEditClick} />
              {/* <MdDelete size={20} /> */}
            </div>
            {isEditing && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white text-black p-8 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto">
                  {/* Edit Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <FaTimes
                      onClick={handleCancel}
                      className="cursor-pointer text-right w-full"
                    />
                    <input
                      type="text"
                      value={formData.username}
                      name="username"
                      onChange={handleChange}
                      placeholder="Username"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                      placeholder="Email"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={formData.gender}
                      name="gender"
                      onChange={handleChange}
                      placeholder="Gender"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={formData.prescription}
                      name="prescription"
                      onChange={handleChange}
                      placeholder="Prescription"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-color text-white rounded-md hover:bg-[#0A5872] focus:outline-none"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>   
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default PatientProfile;
