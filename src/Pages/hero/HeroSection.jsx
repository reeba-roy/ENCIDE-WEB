import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Code2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import planetHorizon from "../../assets/planet-horizon.png";
import encideLogo from "../../assets/encideLogo.png";
import LiquidEther from "../../components/LiquidEther";

const codeSnippets = [
  "const future = await dream.build();",
  "function innovate() { return magic; }",
  "while(alive) { code(); learn(); grow(); }",
  "export default createLegend();",
  "if(impossible) { makeItPossible(); }",
  "const success = passion + persistence;",
];
// Floating code particles
const CodeParticle = ({ delay, x, duration }) => (
  <motion.div
    className="absolute text-red-500/20 font-mono text-xs whitespace-nowrap"
    initial={{ y: "100vh", x: `${x}%`, opacity: 0 }}
    animate={{ y: "-100vh", opacity: [0, 0.5, 0.5, 0] }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {codeSnippets[Math.floor(Math.random() * codeSnippets.length)]}
  </motion.div>
);
// Typing effect hook
const useTypingEffect = (text, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return { displayedText, isComplete };
};
// Animated counter
const AnimatedNumber = ({ target, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const controls = animate(count, target, { duration, delay: 0.5 });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [target, duration, count, rounded]);
  return <span>{displayValue}</span>;
};
// Terminal window component
const TerminalWindow = () => {
  const { displayedText: line1, isComplete: complete1 } = useTypingEffect(
    "$ encide --init",
    60,
    1000,
  );
  const { displayedText: line2, isComplete: complete2 } = useTypingEffect(
    "Initializing creativity engine...",
    40,
    2500,
  );
  const { displayedText: line3 } = useTypingEffect(
    "Ready to code the impossible ✓",
    50,
    4500,
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative w-full max-w-lg mx-auto lg:mx-0"
      style={{ perspective: "1000px" }}
    >
      {/* Terminal glow */}
      <div className="absolute -inset-4 bg-red-500/20 rounded-2xl blur-2xl" />
      {/* Terminal container */}
      <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-xl overflow-hidden shadow-2xl shadow-red-500/10">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/50 border-b border-neutral-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-neutral-500 font-mono ml-2">
            encide-terminal
          </span>
        </div>
        {/* Terminal content */}
        <div className="p-4 font-mono text-sm space-y-2 min-h-[120px]">
          <div className="flex items-center gap-2">
            <span className="text-red-500">→</span>
            <span className="text-neutral-200">{line1}</span>
            {!complete1 && (
              <span className="animate-pulse text-red-500">▊</span>
            )}
          </div>
          {complete1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-neutral-400">{line2}</span>
              {!complete2 && (
                <span className="animate-pulse text-red-500">▊</span>
              )}
            </motion.div>
          )}
          {complete2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-emerald-400"
            >
              <span>{line3}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
// Orbiting icons
const OrbitingElement = ({ icon: Icon, delay, radius, duration }) => (
  <motion.div
    className="absolute w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center backdrop-blur-sm"
    style={{
      left: "50%",
      top: "50%",
    }}
    animate={{
      x: [
        Math.cos(0) * radius - 20,
        Math.cos(Math.PI / 2) * radius - 20,
        Math.cos(Math.PI) * radius - 20,
        Math.cos((3 * Math.PI) / 2) * radius - 20,
        Math.cos(2 * Math.PI) * radius - 20,
      ],
      y: [
        Math.sin(0) * radius - 20,
        Math.sin(Math.PI / 2) * radius - 20,
        Math.sin(Math.PI) * radius - 20,
        Math.sin((3 * Math.PI) / 2) * radius - 20,
        Math.sin(2 * Math.PI) * radius - 20,
      ],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <Icon className="w-5 h-5 text-red-400" />
  </motion.div>
);
const HeroSection = ({ loading }) => {
  useEffect(() => {
    loading();
  }, [loading]);

  const particles = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 2,
    x: Math.random() * 100,
    duration: 15 + Math.random() * 10,
  }));
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-neutral-950 font-display"
    >
      {/* Planet background - Restored as requested */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 blur-md"
          style={{
            backgroundImage: `url(${planetHorizon})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark gradient overlay - fades bottom, keeps top clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
      </motion.div>
      {/* LiquidEther WebGL fluid simulation background */}
      <div className="absolute inset-0 pointer-events-auto z-5">
        <LiquidEther
          colors={['#dc2626', '#ef4444', '#991b1b']}
          mouseForce={20}
          cursorSize={100}
          isViscous={true}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.6,
          }}
        />
      </div>
      {/* Atmospheric glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 via-transparent to-transparent pointer-events-none" />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Floating code particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <CodeParticle key={i} {...particle} />
        ))}
      </div>
      {/* Central radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/5 blur-[100px] pointer-events-none" />
      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            {/* Main heading - ENCIDE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 -ml-[15px]"
            >
              <img src={encideLogo} className="w-[270px] h-auto mx-auto lg:mx-0" />
            </motion.div>
            {/* Motto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-12 bg-gradient-to-b from-red-500 to-transparent rounded-full opacity-60" />
              <p className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-neutral-200">
                Code what you can't
              </p>
            </motion.div>
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg text-neutral-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Where impossible becomes{" "}
              <span className="text-red-300 font-semibold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                {"{ possible }"}
              </span>
              . <span className="text-neutral-300">Join a community crafting the future, one line at a time.</span>
            </motion.p>
            {/* CTA Buttons - Pure Tailwind Replacements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-br from-red-600 to-red-700 rounded-lg transition-all duration-300 shadow-[0_8px_16px_-4px_rgba(220,38,38,0.4)] hover:shadow-[0_12px_24px_-4px_rgba(220,38,38,0.6)] hover:scale-105 overflow-hidden border border-red-500/20"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">Join ENCIDE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("events")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-neutral-900/40 border-2 border-neutral-700 rounded-lg hover:bg-neutral-800/60 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-neutral-400 group-hover:text-red-300 transition-colors" />
                <span>Explore Events</span>
              </button>
            </motion.div>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              {[
                { value: 50, label: "Members", suffix: "+" },
                { value: 50, label: "Events Held", suffix: "+" },
                { value: 4, label: "Years Legacy", suffix: "+" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-display font-bold text-white">
                    <AnimatedNumber target={stat.value} />
                    <span className="text-red-400">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Right column - Terminal + Decorations */}
          <div className="relative hidden lg:block">
            {/* Orbiting elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80">
                <OrbitingElement
                  icon={Code2}
                  delay={0}
                  radius={160}
                  duration={20}
                />
                <OrbitingElement
                  icon={Terminal}
                  delay={5}
                  radius={160}
                  duration={20}
                />
                <OrbitingElement
                  icon={Sparkles}
                  delay={10}
                  radius={160}
                  duration={20}
                />
              </div>
            </div>
            {/* Terminal window */}
            <TerminalWindow />
            {/* Decorative code blocks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-4 top-1/4 px-4 py-2 rounded-lg bg-neutral-900/60 backdrop-blur-md border border-neutral-800 font-mono text-xs text-neutral-400 shadow-xl"
            >
              <span className="text-red-400">const</span> passion ={" "}
              <span className="text-emerald-400">'∞'</span>;
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -left-8 bottom-1/4 px-4 py-2 rounded-lg bg-neutral-900/60 backdrop-blur-md border border-neutral-800 font-mono text-xs text-neutral-400 shadow-xl"
            >
              <span className="text-red-400">{"<"}</span>
              <span className="text-amber-400">Innovation</span>
              <span className="text-red-400">{"/>"}</span>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-neutral-500 font-mono">
          scroll.explore()
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-red-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
export default HeroSection;
