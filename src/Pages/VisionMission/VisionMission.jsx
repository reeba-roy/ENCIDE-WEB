import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Rocket } from "lucide-react";
const VisionMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      className="py-16 md:py-24 bg-neutral-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-fuchsia-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group h-full"
          >
            <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-neutral-800 hover:border-violet-500/30 shadow-lg hover:shadow-[0_0_30px_-10px_rgba(124,58,237,0.1)] transition-all duration-300 h-full">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors duration-500">
                  <Rocket className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-neutral-400 text-sm lg:text-base leading-relaxed group-hover:text-neutral-300 transition-colors">
                    ENCIDE, the premier coding club of Mar Athanasius College of
                    Engineering, is dedicated to fostering a community of
                    passionate coders, developers, and tech enthusiasts.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap gap-2 group-hover:border-violet-500/20 transition-colors">
                {["Learn", "Connect", "Grow", "Lead"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 font-medium border border-violet-500/10 group-hover:border-violet-500/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative group h-full"
          >
            <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-neutral-800 hover:border-violet-500/30 shadow-lg hover:shadow-[0_0_30px_-10px_rgba(124,58,237,0.1)] transition-all duration-300 h-full">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors duration-500">
                  <Eye className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                    Our Vision
                  </h3>
                  <p className="text-neutral-400 text-sm lg:text-base leading-relaxed group-hover:text-neutral-300 transition-colors">
                    The club provides a supportive and inclusive peer-to-peer
                    learning environment where members can share knowledge,
                    exchange ideas, and work together on exciting coding
                    projects.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 group-hover:border-violet-500/20 transition-colors">
                <p className="text-xs text-violet-400/80 italic">
                  "Empowering students to discover their potential."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default VisionMission;
