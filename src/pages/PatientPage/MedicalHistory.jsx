import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PatientHeader from "../../components/PatientComp/PatientHeader";

const MedicalHistory = () => {
  const { patientId } = useParams();
  const [showUpload, setShowUpload] = useState(false);
  const [formData, setFormData] = useState({
    conditions: "",
    allergies: "",
    surgeries: [{ name: "", date: "" }],
    medications: [{ name: "", dosage: "", startDate: "", endDate: "" }],
  });
  const [medicalHistory, setMedicalHistory] = useState(null);

  useEffect(() => {
    fetchMedicalHistory();
  }, [patientId]);

  const fetchMedicalHistory = async () => {
    try {
      const response = await axios.get(`/api/medical-history/get/${patientId}`);
      setMedicalHistory(response.data.medicalHistory);
    } catch (error) {
      console.error("Error fetching medical history:", error);
    }
  };

  const handleCreateNewClick = () => {
    setShowUpload(true);
  };

  const handleCloseUpload = () => {
    setShowUpload(false);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/medical-history/upload/${patientId}`, formData);
      fetchMedicalHistory();
      handleCloseUpload();
    } catch (error) {
      console.error("Error uploading medical history:", error);
      alert("An error occurred while uploading medical history");
    }
  };
  return (
    <>
      <PatientHeader />
      <div className="flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold my-4 text-color text-center">
          Medical History
        </h1>
        {showUpload ? (
          <button
            className="text-xl border-2 border-blue-800 font-bold my-4 px-2 text-color"
            onClick={handleCloseUpload}
          >
            &#10005;
          </button>
        ) : (
          <button
            className="md:text-xl text-sm border-2 border-[#0A5872] font-bold my-4 px-2 text-color"
            onClick={handleCreateNewClick}
          >
            Create New+
          </button>
        )}
      </div>
      {showUpload ? (
        <div className="absolute top-0 left-0 w-full bg-opacity-75 flex items-center justify-center">
          <div className="p-4 flex bg-white">
            <button
              className="text-xl h-8 bg-white font-bold px-2 text-color"
              onClick={handleCloseUpload}
            >
              &#10005;
            </button>
            {/* upload section */}
            <div className="container bg-white mx-auto">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                Upload Medical History
              </h2>
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-color text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Conditions:
                  </label>
                  <input
                    type="text"
                    name="conditions"
                    value={formData.conditions}
                    placeholder="Condition Name"
                    onChange={(e) =>
                      setFormData({ ...formData, conditions: e.target.value })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Allergies:
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    placeholder="Allergy Name"
                    onChange={(e) =>
                      setFormData({ ...formData, allergies: e.target.value })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
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
                    className="bg-[#0A5872] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                    className="bg-[#0A5872] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
          </div>
        </div>
      ) : null}

      {/* get Medical  */}
      <div className="container mx-auto">
        {medicalHistory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black bg-color">
            {medicalHistory.map((history) => (
              <div
                key={history._id}
                className="border rounded m-4 p-4 bg-white md:text-xl flex flex-col md:flex-row  items-start justify-evenly"
              >
                <div className="">
                  {/* <h2 className="text-xl font-bold mb-2">
                Patient ID: {history.patientId}
              </h2> */}
                  <div className="flex items-center gap-4 mb-1">
                    <h3 className="md:text-2xl text-xl font-bold">Conditions:</h3>
                    <ul className="hover:underline">
                      {history.conditions.map((condition) => (
                        <li key={condition}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 mb-1">
                    <h3 className="md:text-2xl text-xl font-bold">Allergies:</h3>
                    <ul className="hover:underline">
                      {history.allergies.map((allergy) => (
                        <li key={allergy}>{allergy}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 mb-1">
                    <h3 className="md:text-2xl text-xl font-bold">Surgeries:</h3>
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
                    <h3 className="md:text-2xl text-xl font-bold">Medications:</h3>
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
          // <p>Loading...</p>
          null
        )}
      </div>
    </>
  );
};

export default MedicalHistory;
