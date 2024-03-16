import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import DoctorProfile from "../../components/DoctorProfile";
import LiveAppointment from "../../components/PatientComp/LiveAppointment";
import PatientAppointment from "../../components/PatientComp/PatientAppointment";
import PatientHeader from "../../components/PatientComp/PatientHeader";

const ClinicConsultPage = () => {
  const { doctorId } = useParams();
  const { clinic } = useParams();
  const { pathname } = useLocation();

  if (pathname.includes("clinic")) {
    console.log("hai clinic");
  }

  return (
    <div className="">
      <PatientHeader />
      <DoctorProfile />
      {/* <PatientAppointment/> */}
      <LiveAppointment />
    </div>
  );
};

export default ClinicConsultPage;
