import React from "react";
import Team from "./team";
import { teams } from "./teaminfo";
import SplitText from "../../components/SplitText.tsx"; 

export default function Teams() {
  return (
    <section id="team">
    <div className=" bg-[#121212] py-10 px-20">
      <div className="heading pb-8">
        <SplitText
            text="TEAM"
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
        <div className="text-lg text-[#DB9EE5] font-semibold">
          Meet our current execom
        </div>
      </div>
      <div className="md:grid grid-cols-4 gap-4">
        {teams.map((team) => (
          <Team
            key={team.name}
            name={team.name}
            className="col-span-1"
            img={team.img}
            position={team.position}
            linkedin={team.linkedin}
            github={team.github}
          />
        ))}
      </div>
    </div>
    </section>
  );
}
