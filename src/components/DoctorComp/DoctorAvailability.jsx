import React, { useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom"
import { backendURL } from '../../config/dev';

const DoctorAvailability = () => {
    const {doctorId} = useParams();

  const [workHours, setWorkHours] = useState({ start: '', end: '' });
  const [fee, setFee] = useState('');
  const [nonAvailable, setNonAvailable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/doctor-availabilities/${doctorId}`, {
        workHours,
        fee,
        nonAvailable,
      });
      setWorkHours(response.data.workHours);
      setFee(response.data.fee);
      setNonAvailable(response.data.nonAvailable);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
       <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Doctor Availability</h2>
      <div className="mb-4">
        <label className="block mb-2">Work Hours (24-hour format):</label>
        <input
          type="time"
          value={workHours.start}
          onChange={(e) => setWorkHours({ ...workHours, start: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
        <input
          type="time"
          value={workHours.end}
          onChange={(e) => setWorkHours({ ...workHours, end: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded mt-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Fee:</label>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder="Fee Amount"
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Non-Available Dates (separated by comma):</label>
        <input
          type="text"
          value={nonAvailable}
          onChange={(e) => setNonAvailable(e.target.value.split(','))}
          placeholder="If required"
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>
      <button
  onClick={handleCreateAvailability}
  disabled={loading}
  className={`bg-${loading ? 'purple' : 'blue'}-500 hover:bg-${loading ? 'purple' : 'blue'}-600 text-white font-semibold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed`}
>
  {loading ? 'Creating...' : 'Create Availability'}
</button>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
    </>
  );
};

export default DoctorAvailability;
