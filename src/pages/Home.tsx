import NavBar from "../components/NavBar";
import HeroSection from "../components/Home/HeroSection";

function Home() {

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <NavBar />

        {/* HeroSection */}
        <HeroSection/>
        
      </div>
    </>
  );
}

export default Home;
