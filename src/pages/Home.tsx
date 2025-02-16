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

        {/* Video Section */}

        {/* Events Section */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6">Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="bg-[#161b22] p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
              <h3 className="text-lg font-semibold">Event {index + 1}</h3>
              <p className="text-gray-400">Date: 2025-02-22</p>
              <p className="text-gray-400">Time: 10:00 AM - 12:00 PM</p>
              <p className="text-gray-400">Location: Conference Hall A</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#161b22] text-center py-8 mt-12">
        <h2 className="text-xl font-semibold">Don't Miss Out</h2>
        <p className="text-gray-300 mt-2">Join us in making this event successful. Register now and be part of the excitement.</p>
        <button className="mt-4 bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300">
          Register Now
        </button>
      </section>

        {/* Footer */}
        <div className="mt-20"></div>
        <Footer/>
        
      </div>
    </>
  );
}

export default Home;
