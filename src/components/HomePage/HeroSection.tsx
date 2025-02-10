import React from 'react'
import './HeroSection.css'
import { Cuboid } from 'lucide-react';
const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
    
    <div className="text-center">
      <h1 className="text-2xl md:text-5xl font-bold">
        Headline that highlights the <br /> Value Proposition
      </h1>
      <p className=" text-sm md:text-lg text-gray-400 mt-4 max-w-2xl">
        Describe exactly what your product or service does and how it makes your 
        customer’s lives better. Avoid using verbose words or phrases.
      </p>
      <div className="mt-6 flex gap-4 justify-center">
        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          Get started
        </button>
        <button className="px-6 py-2 border border-purple-600 text-purple-400 hover:text-purple-300">
          Learn more
        </button>
      </div>
    </div>

    {/*Brands Section */}
    <div className="mt-12 w-full text-center">
      <p className="text-gray-400 font-semibold">
        Trusted by the world's best companies [social proof to build credibility]
      </p>


      <div className="mt-12 overflow-hidden w-full relative">
        <div className="flex whitespace-nowrap animate-scroll">
          
          {Array(3).fill(
            <>
              <div className="flex items-center gap-12 mx-6">
                <span className="text-purple-500 font-bold text-2xl md:text-4xl flex justify-center align-middle gap-2"> <Cuboid size={40}/> Webflow</span>
                <span className="text-purple-500 font-bold text-2xl md:text-4xl flex justify-center align-middle gap-2"> <Cuboid size={40}/> Webflow</span>
                <span className="text-purple-500 font-bold text-2xl md:text-4xl flex justify-center align-middle gap-2"> <Cuboid size={40}/> Webflow</span>
                <span className="text-purple-500 font-bold text-2xl md:text-4xl flex justify-center align-middle gap-2"> <Cuboid size={40}/> Webflow</span>
                
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    
  </section>
  )
}

export default Home
