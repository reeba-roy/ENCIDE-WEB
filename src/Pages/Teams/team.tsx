import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface TeamProps {
  name: string;
  img: string;
  position: string;
  linkedin: string;
  github: string;
}

export default function Team({
  name,
  img,
  position,
  linkedin,
  github,
}: TeamProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
      {/* Card Container */}
      <div className="relative h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-purple-500/30 hover:border-purple-500/60 transition-colors duration-500">
        
        {/* Image Container */}
        <div className="relative w-full bg-gradient-to-b from-purple-900/20 to-purple-950/20 flex rounded-t-2xl items-center justify-center overflow-hidden h-80">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500"></div>
          <img 
            className="max-h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
            src={img} 
            alt={`${name}'s photo`} 
          />
        </div>

        {/* Info Section */}
        <div className="p-5 pb-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-white text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors duration-300">
              {name}
            </h3>
            <p className="text-purple-300 text-sm font-semibold group-hover:text-purple-200 transition-colors duration-300">{position}</p>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 hover:text-purple-100 transition-all duration-300 transform hover:scale-110"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 hover:text-purple-100 transition-all duration-300 transform hover:scale-110"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none"></div>
      </div>
    </div>
  );
}
