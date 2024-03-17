import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { backendURL } from "../../config/dev";


const  EditProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    clinicAddress: "",
    gender: "",
    city: "",
    speciality: "",
    qualification: "",
    experience: "",
  });

  useEffect(() => {
    // Fetch doctor data using the doctorId
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${backendURL}/doctors/${doctorId}`);
        const data = await response.json();

        if (data.success) {
          setDoctor(data.doctor);
        } else {
          console.error("Error fetching doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${backendURL}/doctors/doctor-update/${doctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setDoctor(data.doctor);
        setEditMode(false);
      } else {
        console.error("Error updating doctor data:", data.message);
      }
    } catch (error) {
      console.error("Error updating doctor data:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 m-4 flex flex-col md:flex-row items-center justify-center border-b-2">
        {/* Doctor Image Section */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
          {/* Replace 'doctorImageURL' with the actual URL of the doctor's image */}
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Doctor"
            className="rounded-xl md:rounded-xl shadow-lg w-64 h-48 md:w-96 md:h-64"
          />
        </div>

        {/* Profile Information Section */}
        <div className="w-full md:w-2/3 m-4 bg-color text-white rounded-lg shadow-lg p-6">
          {doctor ? (
            <>
              <h2 className="text-2xl text-center font-semibold mb-8 underline">
                Doctor Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 ">
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">Name:</p>
                  <p className="w-2/3">{doctor.username}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">Clinic Address:</p>
                  <p className="w-2/3">{doctor.clinicAddress}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">Email:</p>
                  <p className="w-2/3">{doctor.email}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">City:</p>
                  <p className="w-2/3">{doctor.city}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">Experience:</p>
                  <p className="w-2/3">{doctor.experience}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">Gender:</p>
                  <p className="w-2/3">{doctor.gender}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">Qualification:</p>
                  <p className="w-2/3">{doctor.qualification}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold w-1/3">Speciality:</p>
                  <p className="w-2/3">{doctor.speciality}</p>
                </div>
              </div>
              <div
                onClick={() => setEditMode(true)}
                className="flex justify-end "
              >
                <FaEdit color="white" size={24} />
              </div>
              {/* Display edit form */}
              {editMode && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
                    <h2 className="text-2xl text-color font-semibold mb-2 md:mb-4">
                      Edit Doctor Profile
                    </h2>
                    <form className="grid grid-cols-2 gap-0 md:gap-4  md:grid-cols-4">
                      {/* Edit form fields */}
                      {Object.entries(formData).map(([key, value]) => (
                        <div className="col-span-2 md:col-span-1" key={key}>
                          <label
                            className="block text-gray-700 md:text-sm text-xs font-bold mb-2"
                            htmlFor={key}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={key}
                            type={key === "password" ? "password" : "text"}
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                          />
                        </div>
                      ))}
                      <div className="col-span-2 md:col-span-4 mt-2 flex items-center justify-between">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
