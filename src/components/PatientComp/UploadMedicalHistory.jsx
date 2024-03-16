import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UploadMedicalHistory = () => {
    const { patientId } = useParams();
    const [formData, setFormData] = useState({
      conditions: "",
      allergies: "",
      surgeries: [{ name: "", date: "" }],
      medications: [{ name: "", dosage: "", startDate: "", endDate: "" }],
    });
  
    const handleChange = (e, index, type) => {
      const { name, value } = e.target;
      const newData = [...formData[type]];
      newData[index][name] = value;
      setFormData({ ...formData, [type]: newData });
    };
  
    const handleAddField = (type) => {
      setFormData({
        ...formData,
        [type]: [...formData[type], { name: "", date: "" }],
      });
    };
  
    const handleRemoveField = (index, type) => {
      const newData = [...formData[type]];
      newData.splice(index, 1);
      setFormData({ ...formData, [type]: newData });
    };

    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(
          `/api/medical-history/get/${patientId}`
        );
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`/api/medical-history/upload/${patientId}`, formData);
        fetchMedicalHistory();
      } catch (error) {
        console.error("Error uploading medical history:", error);
        alert("An error occurred while uploading medical history");
      }
    };
  
  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Upload Medical History
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Conditions:
            </label>
            <input
              type="text"
              name="conditions"
              value={formData.conditions}
              onChange={(e) =>
                setFormData({ ...formData, conditions: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Allergies:
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={(e) =>
                setFormData({ ...formData, allergies: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Surgeries:
            </label>
            {formData.surgeries.map((surgery, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={surgery.name}
                  onChange={(e) => handleChange(e, index, "surgeries")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Surgery Name"
                />
                <input
                  type="date"
                  name="date"
                  value={surgery.date}
                  onChange={(e) => handleChange(e, index, "surgeries")}
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "surgeries")}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("surgeries")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Surgery
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Medications:
            </label>
            {formData.medications.map((medication, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={medication.name}
                  onChange={(e) => handleChange(e, index, "medications")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Medication Name"
                />
                <input
                  type="text"
                  name="dosage"
                  value={medication.dosage}
                  onChange={(e) => handleChange(e, index, "medications")}
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Dosage"
                />
                <label className="block text-gray-700 text-sm font-bold mt-2">
                  Start Date:
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={medication.startDate}
                  onChange={(e) => handleChange(e, index, "medications")}
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Start Date"
                />
                 <label className="block text-gray-700 text-sm font-bold mt-2">
                  End Date:
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={medication.endDate}
                  onChange={(e) => handleChange(e, index, "medications")}
                  className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="End Date"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, "medications")}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("medications")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Medication
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default UploadMedicalHistory