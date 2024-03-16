import React from 'react'
import DoctorHeader from '../../components/DoctorComp/DoctorHeader'
import EditProfile from '../../components/DoctorComp/EditProfile'
import EditStaff from '../../components/DoctorComp/EditStaff'

const DoctorMainProfile = () => {
  return (
    <>
    <DoctorHeader/>
    <EditProfile/>
    <EditStaff/>
    </>
  )
}

export default DoctorMainProfile
