import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ContactUs: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* NavBar */}
      <NavBar />

      {/* Contact Us */}
      
    <div className="bg-gray-900 text-white p-10 flex justify-center">
      <div className="w-11/12 flex flex-wrap lg:flex-nowrap justify-between gap-10 lg:gap-24">
        <div className="w-full lg:w-1/2">
          <h5 className="text-sm text-gray-200">Hello People</h5>
          <h2 className="text-4xl font-bold mt-2 text-purple-500">Contact us</h2>
          <p className="text-white mt-2 text-justify">
            For any queries or information, feel free to contact us. We are here to help you.
            Reach out to us through the following contact details.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <Mail className="text-purple-400 w-6 h-6" />
            <div>
              <p className="text-purple-400 font-semibold">Email</p>
              <a href="mailto:ecellrec1@gmail.com" className="text-gray-300 hover:underline">
                ecellrec1@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-purple-400 w-6 h-6" />
            <div>
              <p className="text-purple-400 font-semibold">Phone</p>
              <a href="tel:+919999999999" className="text-gray-300 hover:underline">
                +91 XXXXX XXXXX
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="text-purple-400 w-6 h-6" />
            <div>
              <p className="text-purple-400 font-semibold">Office</p>
              <p className="text-gray-300">Raghu Engineering College, Visakhapatnam.</p>
            </div>
          </div>
        </div>
      </div>
    </div>


      {/* Maps */}
      <div className="mt-10 m-10 flex justify-center">
        <iframe
          className="w-11/12 h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.6677547056574!2d83.4115950738706!3d17.994188183000187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3be321dab3af81%3A0x98aea1e9cbd6aabc!2sRaghu%20Engineering%20College%20(Autonomous)!5e0!3m2!1sen!2sin!4v1739294605728!5m2!1sen!2sin"
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
