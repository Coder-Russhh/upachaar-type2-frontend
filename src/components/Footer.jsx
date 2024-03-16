import React from "react";

const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-color text-white p-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-1/3  md:w-1/3 lg:w-1/5 mb-8">
          <h3 className="md:text-2xl text-sm font-semibold mb-4 hover:underline">From Upchaar</h3>
          <ul className="text-xs md:text-lg">
            <li>About</li>
            <li>Blogs</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className=" w-1/3 md:w-1/4 lg:w-1/5 mb-8">
          <h3 className="md:text-2xl  text-sm font-semibold mb-4 hover:underline">For Doctors</h3>
          <ul className="text-xs md:text-lg">
            <li>Join Us</li>
            <li>Benefits</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className=" w-1/3 md:w-1/4 lg:w-1/5 mb-8">
          <h3 className="md:text-2xl text-sm font-semibold mb-4 hover:underline">For Patients</h3>
          <ul className="text-xs md:text-lg">
            <li>Find a Doctor</li>
            <li>Book Appointment</li>
            <li>Insurance</li>
          </ul>
        </div>
        <div className=" w-1/3 md:w-1/4 lg:w-1/5 mb-8">
          <h3 className="md:text-2xl text-sm font-semibold mb-4 hover:underline">For Hospitals</h3>
          <ul className="text-xs md:text-lg">
            <li>Partner with Us</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className=" w-1/3 md:w-1/4 lg:w-1/5 mb-8">
          <h3 className="md:text-2xl text-sm font-semibold mb-4 hover:underline">Socials</h3>
          <ul className="text-xs md:text-lg">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <div>
          <h1 className="my-2 text-lg font-semibold">Upchaar</h1>
        </div>
        <div>
          <h1 className="">&copy; {currentYear} Upchaar. All rights reserved.</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
