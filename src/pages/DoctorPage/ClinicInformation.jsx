import React from 'react'
import DoctorAvailability from '../../components/DoctorComp/DoctorAvailability'
import DoctorHeader from '../../components/DoctorComp/DoctorHeader'
import EditProfile from '../../components/DoctorComp/EditProfile'

const ClinicInformation = () => {
  return (
    <>
    <DoctorHeader/>
      <EditProfile/>
      <DoctorAvailability/>
    </>
  )
}

export default ClinicInformation
