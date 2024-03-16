import React from 'react'
import DoctorHeader from '../../components/DoctorComp/DoctorHeader';
import StaffManagement from '../../components/DoctorComp/StaffManagement';
import DoctorProfile from '../../components/DoctorProfile';

const DoctorHome = () => {
  return (
    <div className='min-h-screen'>
      <DoctorHeader/>
      <DoctorProfile/>
      <StaffManagement/>
    </div>
  )
}

export default DoctorHome;