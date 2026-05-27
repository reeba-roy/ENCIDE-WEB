import { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div className="flex gap-3">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hrs" },
        { value: timeLeft.mins, label: "Min" },
        { value: timeLeft.secs, label: "Sec" },
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center backdrop-blur-sm">
            <span className="font-display text-lg md:text-xl font-bold text-red-400">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-neutral-400 mt-1 block">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
