import { useState } from "react";
import { useNavigate /*useSearchParams*/ } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HomePage/HeroSection";

function Home() {
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
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <NavBar />

        {/* HeroSection */}
        <HeroSection/>
        

        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
              alt="E-Summit background"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              E-Summit-Rec 2025
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Join the biggest entrepreneurship summit of the year. Connect with
              industry leaders, innovative startups, and fellow entrepreneurs in
              this transformative event.
            </p>
            <div className="mt-10">
              <button
                onClick={handleRegisterClick}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
