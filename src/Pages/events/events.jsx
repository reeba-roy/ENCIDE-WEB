import { useState, useEffect } from "react";
import CarouselComponent from "../../components/carousel";
import SplitText from "../../components/SplitText.tsx";

import icl2 from "../../assets/images/icl2.jpg";
import cloneitup from "../../assets/images/cloneitup.jpg";
import ace from "../../assets/images/aceplacements.jpg";
import code2 from "../../assets/images/code2job.jpg";
import ctf from "../../assets/images/ctf.jpg";
import dsa from "../../assets/images/dsa-blitz.jpg";
import encode from "../../assets/images/encode.jpg";
import excite from "../../assets/images/excite.jpg";
import tech from "../../assets/images/tech-trial.jpg";
import turtle from "../../assets/images/turtle.jpg";
const upcomingimages = [];
const images = [
  {
    img: "/image.png",
    ename: "DAWN 1.0",
    date: "22 MAY 2023",
    desc: "Intro to CP basics",
  },
  {
    img: icl2,
    ename: "Interclass Coding League",
    date: "22 JULY 2024",
    desc: "Interclass coding competition",
  },
  {
    img: cloneitup,
    ename: "CloneItUp",
    date: "11 SEPTEMBER 2024",
    desc: "Beginner coding challenge",
  },
  {
    img: ace,
    ename: "Strategies to Ace Placements",
    date: "JULY 31",
    desc: "Placement preparation strategies",
  },
  {
    img: code2,
    ename: "Code2Job",
    date: "AUG 7",
    desc: "Career-focused coding event",
  },
  {
    img: ctf,
    ename: "CaptureTheFlag",
    date: "17 AUGUST 2024",
    desc: "CTF hacking challenge",
  },
  {
    img: dsa,
    ename: "DSA Blitz",
    date: "AUGUST 3",
    desc: "Quick DSA practice",
  },
  {
    img: encode,
    ename: "XTREME ENCODE",
    date: "22 JULY 2024",
    desc: "Advanced encoding contest",
  },
  {
    img: excite,
    ename: "EXCITE",
    date: "12 APRIL 2024",
    desc: "Exciting tech showdown",
  },
  {
    img: tech,
    ename: "TECH TRIAL",
    date: "27 SEPTEMBER 2024",
    desc: "Tech skills competition",
  },
  {
    img: turtle,
    ename: "TURTLE POOKALAM",
    date: "18 SEPTEMBER 2024",
    desc: "Cultural design contest",
  },
];

function EventComponent() {
  const [tab, setTab] = useState(0);
  const [transition, setTransition] = useState("");
  const [screen, setScreen] = useState(true);

  const isSmallScreen = () =>
    window.innerWidth <= 768 ? setScreen(false) : setScreen(true);

  useEffect(() => {
    isSmallScreen();
    window.addEventListener("resize", isSmallScreen);
    return () => window.removeEventListener("resize", isSmallScreen);
  }, []);

  const handleNext = () => {
    setTransition("fade-out");
    setTimeout(() => {
      setTab((tab + 1) % images.length);
      setTransition("fade-in");
    }, 300);
  };

  const handlePrev = () => {
    setTransition("fade-out");
    setTimeout(() => {
      setTab((tab - 1 + images.length) % images.length);
      setTransition("fade-in");
    }, 300);
  };

  return (
    <section id="events" className="flex flex-col px-4 py-8 md:px-24">
      <SplitText
        text="EVENTS"
        className="text-6xl text-[40px] font-[550] mb-8 text-white"
        delay={100}
        duration={0.8}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="left"
      />

      {upcomingimages && upcomingimages.length > 0 && (
        <div className="mb-12">
          <div className="text-2xl text-[#DB9EE5] font-semibold mb-8">
            Upcoming Events
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingimages.map((event, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#9A00B3] hover:border-[#DB9EE5] transition-all duration-300 hover:shadow-lg hover:shadow-[#9A00B3]/50"
              >
                <div className="relative overflow-hidden bg-black aspect-square">
                  <img
                    src={event.img}
                    alt={event.ename}
                    className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {event.ename}
                  </h3>

                  <div className="text-sm text-[#DB9EE5] font-semibold mb-2">
                    Date: {event.date}
                  </div>

                  <p className="mb-4 text-sm text-slate-300 line-clamp-2">
                    {event.desc}
                  </p>

                  <button className="w-full bg-[#9A00B3] hover:bg-[#DB9EE5] text-white font-semibold py-2 px-4 rounded transition-colors duration-300 hover:text-black">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 pb-8 sm:grid-cols-2">
        <div className="flex flex-col col-span-1 pb-4 sm:pb-0">
          <div className="text-2xl text-[#DB9EE5] font-semibold">
            Our Past Events
          </div>
        </div>
        <div className="flex items-center justify-start cols-span-1 sm:justify-end ">
          {/* <button
            onClick={handlePrev}
            className="flex items-center text-slate-300 pb-1 px-4 rounded border-2 border-slate-300 text-xl font-semibold justify-center bg-[#9A00B3] hover:bg-transparent hover:border-[#9A00B3] hover:text-[#9A00B3] duration-300"
          >
            Previous Events
          </button> */}
        </div>
      </div>
      {screen && (
        <div>
          <div className="event-carousel flex relative overflow-hidden h-[60vh]">
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="w-full absolute left-[25%] flex">
                <img
                  className={`three absolute -left-60 scale-[0.85] h-full -z-10 blur-md aspect-square w-[360px] ${transition}`}
                  src={images[(tab + 2) % images.length].img}
                  alt="Event"
                />
                <img
                  className={`two absolute -left-32 scale-[0.925] h-full -z-10 blur-sm aspect-square w-[360px] ${transition}`}
                  src={images[(tab + 1) % images.length].img}
                  alt="Event"
                />
                <img
                  className={`one aspect-square w-[360px] ${transition}`}
                  src={images[tab].img}
                  alt="Event"
                />
                <div className="bg-[#7b2e87] w-[35%] p-4 scale-y-[0.85]">
                  <div className="pl-4 pb-2 text-2xl scale-y-[1.2] font-arial font-bold text-white">
                    {images[tab].ename}
                  </div>
                  <div className="pb-4 pl-4">
                    <div className="text-lg scale-y-[1.2] font-arial font-semibold text-slate-200">
                      Date : {images[tab].date}
                    </div>
                  </div>

                  <div className="pl-4 pb-4 flex scale-y-[1.2]  font-mono font-normal text-slate-200">
                    {images[tab].desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 mx-2 min-w-[120px] rounded border-2 text-xl font-semibold bg-transparent border-[#9A00B3] text-[#9A00B3] duration-300 hover:bg-[#9A00B3] hover:text-[#111010] outline outline-transparent hover:outline-black -outline-offset-4"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className=" px-4 py-2 mx-2 min-w-[120px] rounded border-2 text-xl font-semibold bg-transparent border-[#9A00B3] text-[#9A00B3] duration-300 hover:bg-[#9A00B3] hover:text-[#111010] outline outline-transparent hover:outline-black -outline-offset-4"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {!screen && <CarouselComponent images={images} />}
    </section>
  );
}

export default EventComponent;
