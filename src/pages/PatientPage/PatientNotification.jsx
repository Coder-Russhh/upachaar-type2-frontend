import React from 'react'
import PatientHeader from '../../components/PatientComp/PatientHeader'
import noNotification1 from "../../assets/PatientImg/noNotification1.jpg"

const PatientNotification = () => {
  return (
    <>
    <PatientHeader/>
      <div className='flex h-[80vh] items-center justify-center'>
        <img src={noNotification1} alt="no notification yet" />
        </div>
    </>
  )
}

export default PatientNotification
