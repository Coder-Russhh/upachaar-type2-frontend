import React from "react";
import Banners from "../../components/PatientComp/Banners";
import DoctorsList from "../../components/PatientComp/DoctorsList";
import HealthConsern from "../../components/PatientComp/HealthConsern";
import PatientHeader from "../../components/PatientComp/PatientHeader";
import Speciality from "../../components/PatientComp/Speciality";

const PatientHome = () => {
  return (
    <>
      <PatientHeader/>
      <Banners />
      <HealthConsern />
      <Speciality />
      <DoctorsList />
    </>
  );
};

export default PatientHome;
