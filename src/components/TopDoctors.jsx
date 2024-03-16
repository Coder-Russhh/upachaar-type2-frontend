import React from "react";
import { FaStar, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import dkguta from "../assets/HomeImg/dkgupta.jpg";
import ashokSeth from "../assets/HomeImg/ashokSeth.jpg";
import raghu from "../assets/HomeImg/raghu.jpg";
import doctor1 from "../assets/HomeImg/doctor1.jpg";

const TopDoctors = () => {
  const topDoctorsData = [
    {
      id: 1,
      name: "Dr. D.K Gupta",
      specialty: "Orthopedic",
      rating: 4.8,
      twitter: "https://twitter.com/john_doe_twitter",
      linkedin: "https://www.linkedin.com/in/john_doe_linkedin",
      instagram: "https://www.instagram.com/john_doe_instagram",
      image: dkguta,
      imageLink: "https://www.joh.co.in/dk-gupta.html",
    },
    {
      id: 2,
      name: "Dr. Ashok Seth",
      specialty: "Cardiologist",
      rating: 4.9,
      twitter: "https://twitter.com/john_doe_twitter",
      linkedin: "https://www.linkedin.com/in/john_doe_linkedin",
      instagram: "https://www.instagram.com/john_doe_instagram",
      image: ashokSeth,
      imageLink: "https://en.wikipedia.org/wiki/Ashok_Seth",
    },
    {
      id: 3,
      name: "Dr. Raghunandan Torsekar.",
      specialty: "Dermatologist",
      rating: 4.7,
      twitter:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
      linkedin:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
      instagram:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
      image: raghu,
      imageLink:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
    },
    {
      id: 4,
      name: "Dr. Omkar",
      specialty: "Physiologist",
      rating: 4.7,
      twitter:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
      linkedin:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
      instagram:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
      image: doctor1,
      imageLink:
        "https://in.linkedin.com/in/raghunandan-govind-torsekar-b383b427",
    },
  ];

  return (
    <div id="topdoctor" className="container mx-auto my-8">
      <div className="font-bold mb-4 text-center">
        <h2 className="md:text-4xl text-2xl mb-4 text-color underline">Current High Rated Doctors</h2>
        <h4 className="md:text-4xl hidden md:block text-xs font-normal">
          These Doctors are Highly rated in our platform you can connect with
          them
        </h4>
        <h4 className="md:hidden text-xs font-normal">
          These Doctors are Highly rated in our platform 
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-10 md:mx auto px-4 md:px-12">
        {topDoctorsData.map((doctor) => (
          <div
            key={doctor.id}
            className="p-6 rounded-lg shadow-2xl flex flex-col justify-center items-center transition-transform transform hover:scale-105 h-full w-[100%]  md:w-[45%] lg:w-auto ring-2 ring-black"
          >
            {doctor.twitter && (
              <a
                href={doctor.imageLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-48 h-48 object-cover mb-4 rounded-md"
                />
              </a>
            )}
            <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
            <p className="text-gray-600 mb-2">{doctor.specialty}</p>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-500 mr-2" />
              <span className="font-semibold">{doctor.rating}</span>
            </div>
            <div className="flex items-center space-x-4">
              {doctor.twitter && (
                <a
                  href={doctor.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSquareXTwitter
                    color="black"
                    className="text-blue-400 cursor-pointer hover:text-blue-600"
                  />
                </a>
              )}
              {doctor.linkedin && (
                <a
                  href={doctor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-blue-700 cursor-pointer hover:text-blue-900" />
                </a>
              )}
              {doctor.instagram && (
                <a
                  href={doctor.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-pink-500 cursor-pointer hover:text-pink-700" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
