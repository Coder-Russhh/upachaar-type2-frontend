import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Articles from "../../components/Articles";
import RatingReviews from "../../components/RatingReviews";
import "./LandingPage.css";
import SignInAs from "./SignInAs";
import group from "../../assets/HomeImg/group.png";
import ShowFeed from "../../components/ShowFeed";
import TopDoctors from "../../components/TopDoctors";
import Chatbot from "../../components/Chatbot";
import MainHeading from "./MainHeading";
import Services from "../../components/Services";
import ContactUs from "../../components/PatientComp/ContactUs";
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";

const LandingPage = () => {
  return (
    <>
      <div>
        {/* <Chatbot /> */}
        <LandingHeader />
        <MainHeading />

        {/* our services */}
        <Services />

        {/* top specialist */}
        <TopDoctors />

        {/* showFeed */}
        <ShowFeed />

        <section className="h-[90vh]">
          <div className="h-[10vh]"></div>
          <SignInAs />
        </section>

        {/* patients reviews and feedback */}
        <div className=" h-[90vh] flex md:flex-row flex-col justify-between items-center px-4 mt-4">
          <RatingReviews />
          <div
            className="h-[80vh] w-1/2 bg-cover bg-center md:block hidden transition-transform transform hover:scale-105"
            style={{ backgroundImage: `url(${group})` }}
          ></div>
        </div>
        {/* scroll for tips and blogs */}
        <Articles />

        {/* contact us */}
        <ContactUs />

        {/* footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
