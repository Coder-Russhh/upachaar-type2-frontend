import React from 'react'
import SignInAs from './SignInAs'
import signInDoctor1 from "../../assets/HomeImg/signInDoctor1.jpg"

const Provider = () => {
  return (
    <div
    className="h-[100vh] bg-center flex justify-between items-center bg-cover bg-center-top px-16 relative"
    style={{ backgroundImage: `url(${signInDoctor1})` }}
  >
    <div className="w-[40%]">
      <SignInAs />
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-700 square hover:from-blue-700 hover:to-blue-900">
      <div className="tilt text-white">Book Now</div>
    </div>
  </div>
  )
}

export default Provider