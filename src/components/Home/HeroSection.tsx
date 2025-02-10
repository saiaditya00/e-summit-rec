import { useState } from "react";
import { useNavigate /*useSearchParams*/ } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './HeroSection.css'
import { Cuboid } from 'lucide-react';
import EsummitLogo from '../../assets/E-Summit-Logo.png';

const Home = () => {
  const [error, setError] = useState("");
    const { user, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
  
    const handleGoogleSignIn = async () => {
      try {
        await signInWithGoogle();
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

  const handleRegisterClick = () => {
    if (!user) {
      navigate("/?register=true");
      handleGoogleSignIn();
    } else {
      navigate("/register");
    }
  };
  return (
    <>
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
    
    <div className="text-center my-10">
      <img src={EsummitLogo} width={200} height={200} alt="" className="m-auto" />
      <h1 className="text-2xl md:text-5xl font-bold">
        E-Summit'25 <br /> <span className='text-3xl' >Raghu Engineering College</span>
      </h1>
      <p className=" text-sm md:text-lg text-gray-400 mt-4 max-w-2xl">
        Join the biggest entrepreneurship summit of the year. Connect with
        industry leaders, innovative startups, and fellow entrepreneurs in
        this transformative event.
      </p>
      <div className="mt-6 flex gap-4 justify-center">
        <button onClick={handleRegisterClick} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          Resgister Now
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

  {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
  </>
  )
}

export default Home
