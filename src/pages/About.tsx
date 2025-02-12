import React from "react";
import NavBar from "../components/NavBar";
import Team from "../components/About/Team";
import Footer from "../components/Footer";
import aboutPlace from "../assets/about-placeholder.png";
import pointsIcon from "../assets/points-icon.png";

// Define types for stats and values
interface Stat {
  number: string;
  label: string;
}

interface Value {
  title: string;
  desc: string;
}

// Data for statistics section
const stats: Stat[] = [
  { number: "2015", label: "Founded" },
  { number: "$20M", label: "Product Sales" },
  { number: "500+", label: "Employees" },
  { number: "5K+", label: "Customers" },
];

// Data for company values
const values: Value[] = [
  {
    title: "Describe value one",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  },
  {
    title: "Describe value two",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  },
  {
    title: "Describe value three",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  },
];

const About = () => {
  return (
    <div className="bg-gray-900 h-auto">
      <NavBar />

      {/* about section goes here */}
      <div className="aboutSection mt-10 text-white bg-gray-900 px-6 md:px-20">
        {/* Header Section */}
        <div className="headSec text-white md:h-[25vh] w-full mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Describe why your company exists [mission statement]
          </h1>
          <p className="text-sm md:text-base">
            Explain what your company is working on and the value you provide to
            your customers.
          </p>
        </div>

        {/* Company Growth Section */}
        <div className="highlightSec text-white h-auto md:h-[40vh] flex flex-wrap justify-between gap-4">
          <h2 className="w-full md:w-[40%] text-xl md:text-2xl font-semibold">
            Highlight the growth of your company by the numbers
          </h2>
          <div className="rightSec w-full md:w-[50%]">
            <p className="h-auto md:h-[30%] text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <div className="statsSec grid grid-cols-2 gap-4 mt-4">
              {stats.map((stat, index) => (
                <div key={index} className="box text-center">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {stat.number}
                  </h2>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="imgSec h-[100vh] py-10 text-white md:h-[80vh] mt-4">
          <img
            src={aboutPlace}
            alt="About us section image"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="py-10 h-screen">
          {/* Importance Section */}
          <div className="importanceSec text-white h-[40vh] md:h-[30vh] mt-10 w-full md:w-[50vw]">
            <p className="mb-2">Our values</p>
            <h2 className="text-xl font-semibold md:text-2xl mb-2">
              Emphasize what's important to your company
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare.
            </p>
          </div>

          {/* Points Section */}
          <div className="pointsSec text-white h-auto md:h-[40vh] mt-4 flex flex-wrap gap-10">
            {values.map((value, index) => (
              <div key={index} className="pointBox w-full md:w-[30%]">
                <img className="mb-6" src={pointsIcon} alt="icon" />
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6">
                  {value.title}
                </h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* team section goes here */}
      <div className="mx-11 mt-96 sm:mt-0">
        <Team />
      </div>

      {/* footer goes here */}
      <Footer />
    </div>
  );
};

export default About;
