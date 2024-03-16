import React from 'react'

const Loading = () => {
  return (
    <div className="bg-color text-color h-screen flex justify-center items-center">
    <h1 className="text-4xl text-semi-bold text-white md:text-8xl relative">
      <span className="animate-loading" style={{animationDelay: '0.1s'}}>U</span>
      <span className="animate-loading" style={{animationDelay: '0.3s'}}>P</span>
      <span className="animate-loading" style={{animationDelay: '0.5s'}}>A</span>
      <span className="animate-loading" style={{animationDelay: '0.7s'}}>C</span>
      <span className="animate-loading" style={{animationDelay: '0.9s'}}>H</span>
      <span className="animate-loading" style={{animationDelay: '1.1s'}}>A</span>
      <span className="animate-loading" style={{animationDelay: '1.3s'}}>A</span>
      <span className="animate-loading" style={{animationDelay: '1.5s'}}>R</span>
      <div className='bg-white h-[1px] animate-loading'></div>
    </h1>
  </div>
  )
}

export default Loading