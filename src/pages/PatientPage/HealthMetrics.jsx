import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatientHeader from "../../components/PatientComp/PatientHeader";

const HealthMetrics = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    bloodPressure: { systolic: "", diastolic: "" },
    heartRate: "",
    respiratoryRate: "",
    bodyTemperature: "",
    height: "",
    weight: "",
    bodyMassIndex: "",
    bloodGlucoseLevel: "",
    cholesterolLevels: { LDL: "", HDL: "", totalCholesterol: "" },
    hemoglobinA1c: "",
  });
  const [healthMetrics, setHealthMetrics] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "systolic" || name === "diastolic") {
      setFormData({
        ...formData,
        bloodPressure: {
          ...formData.bloodPressure,
          [name]: value,
        },
      });
    } else if (
      name === "ldl" ||
      name === "hdl" ||
      name === "totalCholesterol"
    ) {
      setFormData({
        ...formData,
        cholesterolLevels: {
          ...formData.cholesterolLevels,
          [name === "totalCholesterol" ? "total" : name.toUpperCase()]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend
      await axios.post(`/api/health-metrics/upload/${patientId}`, formData);
      // Clear the form data
      setFormData({
        bloodPressure: { systolic: "", diastolic: "" },
        heartRate: "",
        respiratoryRate: "",
        bodyTemperature: "",
        height: "",
        weight: "",
        bodyMassIndex: "",
        bloodGlucoseLevel: "",
        cholesterolLevels: { LDL: "", HDL: "", totalCholesterol: "" },
        hemoglobinA1c: "",
      });
      // Fetch updated health metrics data
      setShowUpload(false);
      fetchHealthMetrics();
    } catch (error) {
      console.error("Error uploading health metrics:", error);
      // Optionally, handle error responses
    }
  };

  const fetchHealthMetrics = async () => {
    try {
      // Fetch health metrics data from the backend
      const response = await axios.get(`/api/health-metrics/get/${patientId}`);
      setHealthMetrics(response.data.healthMetrics);
    } catch (error) {
      console.error("Error fetching health metrics:", error);
    }
  };

  const handleCloseUpload = () => {
    setShowUpload(false);
  };

  // Fetch health metrics data on component mount
  useEffect(() => {
    fetchHealthMetrics();
  }, []);

  return (
    <>
      <PatientHeader />
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <button
            onClick={() => setShowUpload(true)}
            className="bg-color hover:bg-[#0A5872] hover:scale-105 text-white px-4 py-2 mt-4 rounded-lg"
          >
            Upload
          </button>
        </div>
        {showUpload && (
          <>
            <div className="absolute top-0 left-0 w-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="md:w-1/3 w-[90%] mx-auto border-2 p-4 rounded-lg bg-white relative mt-32 md:mt-4">
                {/* Close button */}
                <button
                  className="absolute top-2 right-2 text-xl border-2 hover:border-blue-800 font-bold px-2 py-1 text-color"
                  onClick={handleCloseUpload}
                >
                  &#10005;
                </button>
                <h2 className="text-2xl font-bold mb-4">
                  Upload Health Metrics
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-lg mx-auto border-2 bg-color p-2 rounded-lg"
                >
                  {/* Blood Pressure */}
                  <div className="mb-4">
                    <label
                      htmlFor="systolic"
                      className="block text-sm font-medium text-white"
                    >
                      Systolic Blood Pressure:
                    </label>
                    <input
                      type="number"
                      name="systolic"
                      value={formData.bloodPressure.systolic}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="diastolic"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Diastolic Blood Pressure:
                    </label>
                    <input
                      type="number"
                      name="diastolic"
                      value={formData.bloodPressure.diastolic}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Heart Rate */}
                  <div className="mb-4">
                    <label
                      htmlFor="heartRate"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Heart Rate:
                    </label>
                    <input
                      type="number"
                      name="heartRate"
                      value={formData.heartRate}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Respiratory Rate */}
                  <div className="mb-4">
                    <label
                      htmlFor="respiratoryRate"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Respiratory Rate:
                    </label>
                    <input
                      type="number"
                      name="respiratoryRate"
                      value={formData.respiratoryRate}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Body Temperature */}
                  <div className="mb-4">
                    <label
                      htmlFor="bodyTemperature"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Body Temperature:
                    </label>
                    <input
                      type="number"
                      name="bodyTemperature"
                      value={formData.bodyTemperature}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Height */}
                  <div className="mb-4">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Height:
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Weight */}
                  <div className="mb-4">
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Weight:
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Body Mass Index */}
                  <div className="mb-4">
                    <label
                      htmlFor="bodyMassIndex"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Body Mass Index:
                    </label>
                    <input
                      type="number"
                      name="bodyMassIndex"
                      value={formData.bodyMassIndex}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Blood Glucose Level */}
                  <div className="mb-4">
                    <label
                      htmlFor="bloodGlucoseLevel"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Blood Glucose Level:
                    </label>
                    <input
                      type="number"
                      name="bloodGlucoseLevel"
                      value={formData.bloodGlucoseLevel}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Cholesterol Levels */}
                  <div className="mb-4">
                    <label
                      htmlFor="ldl"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      LDL Cholesterol Level:
                    </label>
                    <input
                      type="number"
                      name="ldl"
                      value={formData.cholesterolLevels.LDL}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="hdl"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      HDL Cholesterol Level:
                    </label>
                    <input
                      type="number"
                      name="hdl"
                      value={formData.cholesterolLevels.HDL}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="totalCholesterol"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Total Cholesterol Level:
                    </label>
                    <input
                      type="number"
                      name="totalCholesterol"
                      value={formData.cholesterolLevels.total}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Hemoglobin A1c */}
                  <div className="mb-4">
                    <label
                      htmlFor="hemoglobinA1c"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Hemoglobin A1c:
                    </label>
                    <input
                      type="number"
                      name="hemoglobinA1c"
                      value={formData.hemoglobinA1c}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                    />
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="bg-[#0A5872] text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* Display health metrics data */}
        {healthMetrics && healthMetrics.length > 0 && (
          <div className="mt-8 bg-color p-4 ">
            <h2 className="text-2xl text-white font-sans mb-4">
              Health Metrics History:
            </h2>
            {/* Render health metrics data */}
            {healthMetrics.map((metric, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white p-4 mb-4 md:text-2xl rounded-lg"
              >
                <p>
                  <strong>Blood Pressure:</strong>{" "}
                  <span className="hover:underline">
                    {metric.bloodPressure.systolic}/
                    {metric.bloodPressure.diastolic}
                  </span>
                </p>
                <p>
                  <strong>Heart Rate:</strong>
                  <span className="hover:underline">{metric.heartRate}</span>
                </p>
                <p>
                  <strong>Respiratory Rate:</strong>
                  <span className="hover:underline">
                    {metric.respiratoryRate}
                  </span>
                </p>
                <p>
                  <strong>Body Temperature:</strong>
                  <span className="hover:underline">
                    {metric.bodyTemperature}
                  </span>
                </p>
                <p>
                  <strong>Height:</strong>
                  <span className="hover:underline">{metric.height}</span>
                </p>
                <p>
                  <strong>Weight:</strong>{" "}
                  <span className="hover:underline">{metric.weight}</span>
                </p>
                <p>
                  <strong>Body Mass Index:</strong>{" "}
                  <span className="hover:underline">
                    {metric.bodyMassIndex}
                  </span>
                </p>
                <p>
                  <strong>Blood Glucose Level:</strong>{" "}
                  <span className="hover:underline">
                    {metric.bloodGlucoseLevel}
                  </span>
                </p>
                <p>
                  <strong>LDL Cholesterol Level:</strong>{" "}
                  <span className="hover:underline">
                    {metric.cholesterolLevels.LDL}
                  </span>
                </p>
                <p>
                  <strong>HDL Cholesterol Level:</strong>{" "}
                  <span className="hover:underline">
                    {metric.cholesterolLevels.HDL}
                  </span>
                </p>
                <p>
                  <strong>Total Cholesterol Level:</strong>{" "}
                  <span className="hover:underline">
                    {metric.cholesterolLevels.total}
                  </span>
                </p>
                <p>
                  <strong>Hemoglobin A1c:</strong>{" "}
                  <span className="hover:underline">
                    {metric.hemoglobinA1c}
                  </span>
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  <span className="hover:underline">
                    {new Date(metric.timestamp).toLocaleString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HealthMetrics;
