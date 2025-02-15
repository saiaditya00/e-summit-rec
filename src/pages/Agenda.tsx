import { ChevronRight } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Placeholder from "../assets/about-placeholder.png"

export default function Agenda() {
    return (
      <div className="bg-gray-900">
      <NavBar />
        <div className="bg-[#0d1117] events-page-container w-full h-full flex flex-col items-center justify-center">
            <div className="events-page w-160 my-20 flex flex-col h-auto items-center">
                <p className="text-white">Tagline</p>
                <h1 className="medium text-white text-4xl font-bold my-3 text-center">
                    Medium length section headline goes here
                </h1>
                <p className="text-center text-white my-4 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptatum rerum ullam! Similique illo, optio, officia ea sapiente non, magnam amet vel vitae nobis tempore incidunt fugit nemo quo unde.
                </p>
                <div className="flex flex-row space-x-4 my-3 justify-between p-0">
                    <button type="button" className=" flex-grow text-violet-500">
                        Click Me
                    </button>
                    <button type="button" className="text-violet-500">
                        Click Me
                    </button>
                    <button type="button" className="flex-grow text-violet-500">
                        <ChevronRight />
                    </button>
                </div>
            </div>
            <div className="timeline-container w-full h-full">
                {Array(10).fill(null).map((_, index) => (
                    <div key={index} className="timeline w-full h-screen  flex flex-row items-center">
                        {index % 2 === 0 ? (
                            <>
                                <div className="w-2/3 h-screen p-8">
                                    <img src={Placeholder} alt="placeholder" className="h-full  mx-auto" />
                                </div>
                                <div className="timeline-item flex flex-col items-center mx-3 w-1/20 h-screen">
                                    <div className="bg-purple-600 w-2 flex h-20"></div>
                                    <div className="bg-purple-600 w-7 my-2 h-7 rounded-full flex items-center justify-center text-white"></div>
                                    <div className="bg-purple-600 w-2 flex-grow"></div>
                                </div>
                                <div className="w-2/3 h-screen p-8">
                                    <div className="w-full p-5 h-full mx-auto flex flex-col items-start">
                                        <div className="events-page w-100 my-20 flex flex-col h-auto items-start">
                                            <p className="text-white">Tagline</p>
                                            <h1 className="medium text-white text-4xl font-bold my-3">
                                                Medium length section headline goes here
                                            </h1>
                                            <p className="text-white my-4 px-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptatum rerum ullam! Similique illo, optio, officia ea sapiente non, magnam amet vel vitae nobis tempore incidunt fugit nemo quo unde.
                                            </p>
                                            <div className="flex flex-row space-x-4 my-3 justify-between p-0">
                                                <button type="button" className=" flex-grow text-violet-500">
                                                    Click Me
                                                </button>
                                                <button type="button" className="text-violet-500">
                                                    Click Me
                                                </button>
                                                <button type="button" className="flex-grow text-violet-500">
                                                    <ChevronRight />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-2/3 h-screen p-8">
                                    <div className="w-full p-5 h-full  mx-auto flex flex-col items-end">
                                        <div className="events-page w-100 my-20 flex flex-col h-auto items-end">
                                            <p className="text-white">Tagline</p>
                                            <h1 className="medium text-white text-4xl font-bold my-3">
                                                Medium length section headline goes here
                                            </h1>
                                            <p className="text-white my-4 px-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptatum rerum ullam! Similique illo, optio, officia ea sapiente non, magnam amet vel vitae nobis tempore incidunt fugit nemo quo unde.
                                            </p>
                                            <div className="flex flex-row space-x-4 my-3 justify-between p-0">
                                                <button type="button" className=" flex-grow text-violet-500">
                                                    Click Me
                                                </button>
                                                <button type="button" className="text-violet-500">
                                                    Click Me
                                                </button>
                                                <button type="button" className="flex-grow text-violet-500">
                                                    <ChevronRight />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-item flex flex-col items-center mx-3 w-1/20 h-screen">
                                    <div className="bg-purple-600 w-2 flex h-20"></div>
                                    <div className="bg-purple-600 w-7 my-2 h-7 rounded-full flex items-center justify-center text-white"></div>
                                    <div className="bg-purple-600 w-2 flex-grow"></div>
                                </div>
                                <div className="w-2/3 h-screen p-8">
                                    <img src={Placeholder} alt="placeholder" className="h-full  mx-auto" />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-[#0d1117] h-20"></div>
        <Footer />
        </div>
    );
}