import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Events = () => {
  return (
    <div className="bg-[#111827]">
    <NavBar />
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-white">Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#161b22] p-6 rounded-lg shadow-md hover:scale-105 transition-transform text-white"
          >
            <h3 className="text-lg font-semibold">Event {index + 1}</h3>
            <p className="text-gray-400">Date: 2025-02-22</p>
            <p className="text-gray-400">Time: 10:00 AM - 12:00 PM</p>
            <p className="text-gray-400">Location: Conference Hall A</p>
          </div>
        ))}
      </div>
    </section>
    <Footer />
    </div>
  );
};

export default Events;