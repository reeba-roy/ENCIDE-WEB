import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "President",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&q=80",
    bio: "Computer Science major with a passion for building inclusive communities.",
    socials: { linkedin: "#", twitter: "#", email: "alex@nexusclub.edu" },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Vice President",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    bio: "Business Administration student focused on event management and partnerships.",
    socials: { linkedin: "#", twitter: "#", email: "sarah@nexusclub.edu" },
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&q=80",
    bio: "Software Engineering enthusiast driving our technical initiatives forward.",
    socials: { linkedin: "#", twitter: "#", email: "marcus@nexusclub.edu" },
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    bio: "Design major bringing creativity and visual storytelling to our brand.",
    socials: { linkedin: "#", twitter: "#", email: "emily@nexusclub.edu" },
  },
];
const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="team"
      className="py-24 bg-neutral-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220, 38, 38,0.08),transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Meet the{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Leaders
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            The passionate individuals who make Nexus Club the thriving
            community it is today.
          </p>
        </motion.div>
        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center"
            >
              {/* Image Container */}
              <div className="relative mb-6 mx-auto w-48 h-48">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-red-500/50 transition-all duration-300 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Info */}
              <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-red-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-red-500 font-medium text-sm mb-3">
                {member.role}
              </p>
              <p className="text-neutral-400 text-sm mb-5 max-w-xs mx-auto leading-relaxed group-hover:text-neutral-300 transition-colors">
                {member.bio}
              </p>
              {/* Socials */}
              <div className="flex justify-center gap-3">
                <a
                  href={member.socials.linkedin}
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.socials.twitter}
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm"
                  aria-label={`${member.name}'s Twitter`}
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${member.socials.email}`}
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamSection;
