import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const { doctorId } = useParams();

  const fetchStaffMembers = async () => {
    try {
      const response = await fetch(`/api/doctors/${doctorId}/staff`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.data.staffMembers)
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
  }, [doctorId]); // Fetch staff members whenever doctorId changes

  return (
    <>
     <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-color md:text-start text-center underline">All Your Staff</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
        {staffMembers.map((staff) => (
          <li key={staff.staffId} className="bg-color p-4 rounded-lg">
            <p className="md:text-2xl text-xl font-bold">Username: {staff.username}</p>
            <p className="">Email: {staff.email}</p>
            <p className="">Staff ID: {staff.staffId}</p>
            <p className="border-2 border-white">Doctor ID: {doctorId}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default StaffManagement;
