import NavBar from "../components/NavBar";
import HeroSection from "../components/Home/HeroSection";
import Footer from "../components/Footer";

function Home() {

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        {/* Navbar */}
        <NavBar />

        {/* HeroSection */}
        <HeroSection/>

        {/* Footer */}
        <div className="mt-20"></div>
        <Footer/>
        
      </div>
    </>
  );
}

export default Home;
