import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Target, Heart } from "lucide-react";
import VisionMission from "../VisionMission/VisionMission";
import d1Image from "./d1.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <>
      <section
        id="about"
        className="py-24 bg-neutral-950 relative overflow-hidden"
        ref={ref}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.05),transparent_50%)] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-16 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 font-medium text-sm mb-4 border border-violet-500/20 shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Building Tomorrow's{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Leaders
              </span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              We are a student-led community dedicated to fostering innovation,
              leadership, and personal growth through impactful experiences.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 group hover:border-violet-500/30 transition-colors duration-500">
                <img
                  src={d1Image}
                  alt="About Encide"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display font-bold text-2xl">
                    Empowering Students Since 2022
                  </p>
                </div>
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-neutral-900/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-neutral-800 hidden md:block hover:border-fuchsia-500/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-fuchsia-500/10 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(217,70,239,0.3)]">
                    <Heart className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white">
                      Community First
                    </p>
                    <p className="text-sm text-neutral-400">Our core value</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-neutral-400 text-md leading-relaxed">
                Our community brings together passionate programmers
                creating a vibrant ecosystem of knowledge sharing and 
                skill development. Engage in challenging coding competitions,
                hackathons, and coding challenges that push your limits and
                help you become a better programmer.
              </p>
              <p className="text-neutral-400 text-md leading-relaxed">
                Beyond competitions, we host workshops, study jams, and
                mentorship programs to ensure continuous learning for every
                skill level. By connecting students with industry experts and
                peers, we create opportunities to innovate, build real-world
                projects, empowering our members to make a meaningful impact in the tech world.
              </p>
              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-fuchsia-500/30 hover:bg-neutral-900 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center shrink-0 group-hover:bg-fuchsia-500/20 transition-colors">
                    <Lightbulb className="w-5 h-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-white group-hover:text-fuchsia-200 transition-colors">
                      Innovation
                    </h4>
                    <p className="text-sm text-neutral-400">
                      Pushing boundaries daily
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-violet-500/30 hover:bg-neutral-900 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                    <Target className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-white group-hover:text-violet-200 transition-colors">
                      Excellence
                    </h4>
                    <p className="text-sm text-neutral-400">
                      Striving for the best
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <VisionMission />
    </>
  );
};
export default AboutSection;
