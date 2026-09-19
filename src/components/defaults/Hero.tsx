import React from 'react'
import TopNav from './TopNav';

const Hero = () => {
  return (
    <div className="bg-[url('/hero.png')] bg-cover bg-center h-screen">
        <div className="flex justify-center items-center mt-6">
            <TopNav />
        </div>
    </div>
  )
}

export default Hero