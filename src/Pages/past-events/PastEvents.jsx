import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calendar,
  Trophy,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPastEvents } from "../../lib/getEvents";
const PastEventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const {
    data: pastEvents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["past-events"],
    queryFn: fetchPastEvents,
    refetchOnWindowFocus: false,
  });
  const nextSlide = () => {
    if (pastEvents && pastEvents.length > 0) {
      setActiveIndex((prev) => (prev + 1) % pastEvents.length);
    }
  };
  const prevSlide = () => {
    if (pastEvents && pastEvents.length > 0) {
      setActiveIndex(
        (prev) => (prev - 1 + pastEvents.length) % pastEvents.length,
      );
    }
  };
  // Get visible events (3 at a time on desktop)
  const getVisibleEvents = () => {
    if (!pastEvents || pastEvents.length === 0) return [];
    const events = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % pastEvents.length;
      events.push({ ...pastEvents[index], originalIndex: index });
    }
    return events;
  };
  return (
    <section
      id="past-events"
      className="py-20 px-1 md:px-4 lg:px-16 xl:px-20 bg-neutral-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.05),transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            <p className="text-neutral-400 font-medium mt-4 animate-pulse">
              Loading events...
            </p>
          </div>
        ) : isError || !pastEvents || pastEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-neutral-400">
            <p>Unable to load past events.</p>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="relative mb-12"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  Our{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Legacy
                  </span>
                </h2>
                <p className="text-neutral-400">
                  A showcase of successful events that have shaped our community
                  and inspired hundreds of students.
                </p>
              </div>
              {/* Navigation Controls - Absolute Right Bottom */}
              <div className="hidden md:flex absolute right-0 bottom-0 items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-violet-600 hover:border-violet-600 hover:text-white text-neutral-400 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div className="flex gap-1.5">
                  {pastEvents.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-8 bg-violet-600"
                          : "w-2 bg-neutral-800 hover:bg-neutral-700"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-violet-600 hover:border-violet-600 hover:text-white text-neutral-400 transition-all duration-300 group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
            {/* Mobile Navigation Controls */}
            <div className="flex md:hidden items-center justify-center gap-3 mb-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-violet-600 hover:border-violet-600 hover:text-white text-neutral-400 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="flex gap-1.5">
                {pastEvents.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-violet-600"
                        : "w-2 bg-neutral-800 hover:bg-neutral-700"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-violet-600 hover:border-violet-600 hover:text-white text-neutral-400 transition-all duration-300 group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            {/* Events Carousel */}
            <div className="grid md:grid-cols-3 gap-6">
              {getVisibleEvents().map((event, index) => (
                <motion.article
                  key={`${event.id}-${activeIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500`}
                >
                  {/* Card with dynamic height */}
                  <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-violet-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-white backdrop-blur-md">
                        {event.tag}
                      </div>
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/90 px-2.5 py-1 rounded-full border border-neutral-800 backdrop-blur-md">
                        <Calendar className="w-3.5 h-3.5 text-violet-400" />
                        {event.date.toDateString()}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-neutral-400 text-sm mb-6 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="mt-auto">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-neutral-800">
                          <div className="text-center">
                            <p className="text-lg font-bold text-white">
                              {event.participants_count}
                            </p>
                            <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                              Joined
                            </p>
                          </div>
                          {/* <div className="text-center">
                            <p className="text-lg font-bold text-white">
                              {event.stats.projects}
                            </p>
                            <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                              Built
                            </p>
                          </div> */}
                          <div className="text-center">
                            <p className="text-lg font-bold text-fuchsia-400">
                              {event.winners}
                            </p>
                            <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                              Winners
                            </p>
                          </div>
                        </div>
                        {/* Hover Reveal Button */}
                        <div className="mt-5">
                          <button className="w-full py-2.5 rounded-lg bg-neutral-800  text-white text-sm font-medium transition duration-300 flex items-center justify-center gap-2 group/btn border border-neutral-700 hover:bg-violet-600 hover:border-violet-500 hover:transition hover:duration-300">
                            View Gallery
                            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            {/* Bottom Stats Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pb-20"
            >
              {[
                { value: "50+", label: "Events Organized" },
                { value: "5000+", label: "Total Participants" },
                { value: "200+", label: "Projects Built" },
                { value: "₹5L+", label: "Prizes Awarded" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 hover:border-violet-500/20 transition-colors"
                >
                  <p className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
export default PastEventsSection;
