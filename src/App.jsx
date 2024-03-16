import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Notification from "./components/DoctorComp/Notification";
import Footer from "./components/Footer";
import HealthFeed from "./components/HealthFeed";
import NotFound from "./components/NotFound";
import Payment from "./components/Payment";
import AccessRestrict from "./pages/DoctorPage/AccessRestrict";
import ClinicInformation from "./pages/DoctorPage/ClinicInformation";
import DoctorHealthFeed from "./pages/DoctorPage/DoctorHealthFeed";
import DoctorHome from "./pages/DoctorPage/DoctorHome";
import DoctorSignIn from "./pages/DoctorPage/DoctorSignIn";
import DoctorSignUp from "./pages/DoctorPage/DoctorSignUp";
import PatientRecord from "./pages/DoctorPage/PatientRecord";
import LandingPage from "./pages/LandingPage/LandingPage";
import AppointmentRecord from "./pages/PatientPage/AppointmentRecord";
import ClinicConsultPage from "./pages/PatientPage/ClinicConsultPage";
import HealthMetrics from "./pages/PatientPage/HealthMetrics";
import MedicalHistory from "./pages/PatientPage/MedicalHistory";
import PatientHome from "./pages/PatientPage/PatientHome";
import PatientSignIn from "./pages/PatientPage/PatientSignIn";
import PatientSignUp from "./pages/PatientPage/PatientSignUp";
import VideoConsultPage from "./pages/PatientPage/VideoConsultPage";
import Rough from "./pages/Rough/Rough";
import PatientManagement from "./pages/StaffPage/PatientManagement";
import StaffHealthFeed from "./pages/StaffPage/StaffHealthFeed";
import StaffId from "./pages/StaffPage/StaffId";
import StaffProfile from "./pages/StaffPage/StaffProfile";
import StaffSignIn from "./pages/StaffPage/StaffSignIn";

// trying socket--
import MainHeading from "./pages/LandingPage/MainHeading";
import StaffMainProfile from "./pages/StaffPage/StaffMainProfile";
import DoctorMainProfile from "./pages/DoctorPage/DoctorMainProfile";
import PatientProfile from "./components/PatientComp/PatientProfile";
import Loading from "./components/Loading";
import ConnectRoom from "./pages/videoPage/ConnectRoom";
import Lobby from "./pages/videoPage/DoctorLobby";
import GetStarted from "./pages/LandingPage/GetStarted";
import PatientNotification from "./pages/PatientPage/PatientNotification";
import DoctorLobby from "./pages/videoPage/DoctorLobby";
import PatientLobby from "./pages/videoPage/PatientLobby";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate some delay for demonstration purposes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the delay time as needed

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/rough" element={<Rough />} />
        <Route path="/connectroom/:roomId" element={<ConnectRoom/>} />
        <Route path="/load" element={<GetStarted/>} />
        <Route path="/" element={loading ? <Loading /> : <GetStarted />} />

        {/* video----- */}
        <Route path="/doctor/videoLobby/:doctorId" element={<DoctorLobby />} />
        <Route path="/patient/videoLobby/:patientId" element={<PatientLobby />} />

        {/* landing page */}
        <Route path="/home" element={<LandingPage />} />
        <Route path="/mainheading" element={<MainHeading />} />

        {/* patient routes--------------- */}
        <Route path="/patient/sign-up" element={<PatientSignUp />} />
        <Route path="/patient/sign-in" element={<PatientSignIn />} />
        <Route path="/patient/home/:patientId" element={<PatientHome />} />
        <Route path="/patient/usernotification/:patientId" element={<PatientNotification />} />
        <Route path="/patient/appointmentsrecord/:patientId" element={<AppointmentRecord />}
        />
        <Route path="/patient/medicalhistory/:patientId" element={<MedicalHistory />}
        />
        <Route
          path="/patient/healthmetrics/:patientId"
          element={<HealthMetrics />}
        />
        <Route path="/patient/healthfeed/:patientId" element={<HealthFeed />} />
        <Route
          path="/patient/patientprofile/:patientId"
          element={<PatientProfile />}
        />
        <Route
          path="/patient/clinic/:patientId/:doctorId"
          element={<ClinicConsultPage />}
        />
        <Route
          path="/patient/video/:patientId/:doctorId"
          element={<VideoConsultPage />}
        />
        <Route path="/patient/payment" element={<Payment />} />

        {/* doctor routes------------- */}
        <Route path="/doctor/sign-up" element={<DoctorSignUp />} />
        <Route path="/doctor/sign-in" element={<DoctorSignIn />} />
        <Route path="/doctor/home/:doctorId" element={<DoctorHome />} />
        <Route
          path="/doctor/clinicinfo/:doctorId"
          element={<ClinicInformation />}
        />
        <Route
          path="/doctor/healthfeed/:doctorId"
          element={<DoctorHealthFeed />}
        />
        <Route
          path="/doctor/patientrecord/:doctorId"
          element={<PatientRecord />}
        />
        <Route
          path="/doctor/notifications/:doctorId"
          element={<Notification />}
        />
        <Route
          path="/doctor/mainprofile/:doctorId"
          element={<DoctorMainProfile />}
        />
        {/* acess restricted to particular users */}
        <Route path="/access-restricted" element={<AccessRestrict />} />

        {/* staff routes----------*/}
        <Route path="/staff/staffId" element={<StaffId />} />
        <Route path="/staff/sign-in/:staffId" element={<StaffSignIn />} />
        <Route
          path="/staff/profile/:doctorId/:staffId"
          element={<StaffProfile />}
        />
        <Route
          path="/staff/patientmanagement/:doctorId/:staffId"
          element={<PatientManagement />}
        />
        <Route
          path="/staff/staffhealthfeed/:doctorId/:staffId"
          element={<StaffHealthFeed />}
        />
        <Route
          path="/staff/staffmainprofile/:doctorId/:staffId"
          element={<StaffMainProfile />}
        />

        {/* random routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {shouldDisplayFooter && <Footer />} */}
    </>
  );
}

export default App;
