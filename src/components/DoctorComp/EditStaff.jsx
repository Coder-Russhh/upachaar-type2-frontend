import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { backendURL } from "../../config/dev";


const EditStaff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const { doctorId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedStaff, setEditedStaff] = useState({});
  const [createMode, setCreateMode] = useState(false);
  const [newStaff, setNewStaff] = useState({});

  const fetchStaffMembers = async () => {
    try {
      const response = await fetch(`${backendURL}/doctors/${doctorId}/staff`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStaffMembers(data.data.staffMembers);
      } else {
        console.error("Failed to fetch staff members");
      }
    } catch (error) {
      console.error("Error fetching staff members:", error);
    }
  };

  useEffect(() => {
    fetchStaffMembers();
  }, [doctorId]);

  // handle buttons--

  // edit handling
  const handleEdit = async (staffId) => {
    try {
      const response = await fetch(`${backendURL}/doctors/${doctorId}/staff/${staffId}`);
      if (response.ok) {
        const data = await response.json();
        setEditedStaff(data.data.staffMember);
        setEditMode(true);
      } else {
        console.error("Failed to fetch staff member for editing");
      }
    } catch (error) {
      console.error("Error fetching staff member for editing:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedStaff({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `${backendURL}/doctors/${doctorId}/staff/${editedStaff._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedStaff),
        }
      );
      if (response.ok) {
        // Handle successful update
        setEditMode(false);
        fetchStaffMembers();
      } else {
        console.error("Failed to update staff member");
      }
    } catch (error) {
      console.error("Error updating staff member:", error);
    }
  };

  // handling delete--

  const handleDelete = async (staffId) => {
    try {
      const response = await fetch(
        `${backendURL}/doctors/${doctorId}/staff/${staffId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchStaffMembers();
      } else {
        console.error("Failed to delete staff member.");
      }
    } catch (error) {
      console.error("Error deleting staff member:", error);
    }
  };

  // creating new staff

  const handleCreateStaff = async () => {
    setCreateMode(true);
  };

  const handleCancelCreate = async () => {
    setCreateMode(false);
    setNewStaff({}); // Reset new staff data
  };

  const handleSaveCreate = async () => {
    try {
      const response = await fetch(`${backendURL}/doctors/${doctorId}/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff),
      });
      if (response.ok) {
        // Handle successful creation
        setCreateMode(false);
        fetchStaffMembers(); // Fetch updated staff members
      } else {
        console.error("Failed to create staff member.");
      }
    } catch (error) {
      console.error("Error creating staff member:", error);
    }
  };

  const handleInputChangeCreate = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-semibold mb-4 text-color text-center underline">
            All Your Working Staff
          </h1>
          <button
            onClick={handleCreateStaff}
            className="text-xl border-2 border-blue-800 font-semibold mb-4 px-4 text-color text-center"
          >
            Create New +
          </button>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
          {staffMembers.map((staff) => (
            <li
              key={staff.staffId}
              className="border-2 border-blue-300 p-4 rounded-lg flex justify-between"
            >
              <div className="">
                <p className="md:text-2xl text-xl font-bold">
                  Username: {staff.username}
                </p>
                <p className="">Email: {staff.email}</p>
                <p className="">Staff ID: {staff.staffId}</p>
                {staff.permission !== undefined ? (
                  <p className="">Permission: {staff.permission.toString()}</p>
                ) : null}
              </div>
              <div className="flex flex-col justify-between">
                <button onClick={() => handleEdit(staff._id)}>
                  <FaEdit color="black" />
                </button>
                <button onClick={() => handleDelete(staff._id)}>
                  <MdDelete color="black" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {/*  edit form */}
        {editMode && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl text-color font-semibold mb-4">
                Edit Staff Member
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"
                    value={editedStaff.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={editedStaff.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-bold leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={editedStaff.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="permission"
                  >
                    Permission:
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="permission"
                    name="permission"
                    value={editedStaff.permission || ""}
                    onChange={handleInputChange}
                  >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* create form */}
        {createMode && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl text-color font-semibold mb-4">
                Create Staff Member
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"
                    value={newStaff.username || ""}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={newStaff.email || ""}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={newStaff.password || ""}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-color text-sm font-bold mb-2"
                    htmlFor="permission"
                  >
                    Permission:
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color font-bold leading-tight focus:outline-none focus:shadow-outline"
                    id="permission"
                    name="permission"
                    value={newStaff.permission || false} // Set default value to false
                    onChange={handleInputChangeCreate}
                  >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveCreate}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancelCreate}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditStaff;
