import React from "react";
import Slider from "react-slick";
// import patient1 from "../../assets/PatientImg/patient1.jpg";
// import patient2 from "../../assets/PatientImg/patient2.jpg";
import ban1 from "../../assets/PatientImg/banner/ban1r.jpg";
import ban2 from "../../assets/PatientImg/banner/ban2r.jpg";
import ban3 from "../../assets/PatientImg/banner/ban3r.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <div className="flex justify-center my-4 rounded-xl overflow-hidden">
  <Slider {...settings} className="md:h-[50vh] h-[25vh] w-[90vw]">
    {/* <div className="overflow-hidden rounded-xl">
      <img src={ban1} alt="" className="md:h-[50vh] h-[25vh] w-full object-cover" />
    </div> */}
    <div className="overflow-hidden rounded-xl">
      <img src={ban2} alt="" className="md:h-[50vh] h-[25vh] w-full object-cover" />
    </div>
    <div className="overflow-hidden rounded-xl">
      <img src={ban3} alt="" className="md:h-[50vh] h-[25vh] w-full object-cover" />
    </div>
  </Slider>
</div>

  );
};

export default Banners;
