 import React from 'react'
import DoctorProfile from '../../components/DoctorProfile'
import LiveAppointment from '../../components/PatientComp/LiveAppointment'
import PatientHeader from '../../components/PatientComp/PatientHeader'
import RealTimeAppointment from '../../components/PatientComp/RealTimeAppointment'
 
 const VideoConsultPage = () => {
   return (
     <>
     <PatientHeader/>
       <DoctorProfile/>
       {/* <RealTimeAppointment/> */}
       <LiveAppointment/>
     </>
   )
 }
 
 export default VideoConsultPage
 