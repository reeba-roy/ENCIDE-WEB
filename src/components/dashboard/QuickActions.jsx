import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarArrowUp,
  Mail,
  Users,
  LogOut,
  Book,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const QuickActions = () => {
  
  const { logout } = useContext(AuthContext);

  const actions = [
    {
      icon: Calendar,
      label: "Browse Events",
      href: "/#events",
      color: "text-red-400",
    },
    {
      icon: Users,
      label: "Meet Team",
      href: "/#team",
      color: "text-red-500",
    },
    {
      icon: Mail,
      label: "Contact Us",
      href: "/#contact",
      color: "text-emerald-400",
    },
    {
      icon: CalendarArrowUp,
      label: "past events",
      href: "/#past-events",
      color: "text-amber-400",
    },
    {
      icon: Book,
      label: "about us",
      href: "/#about",
      color: "text-neutral-400",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-red-500/30 hover:bg-neutral-800 transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-neutral-950 group-hover:scale-110 transition-transform">
                <action.icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <span className="text-[10px] sm:text-xs text-neutral-400 group-hover:text-white transition-colors text-center">
                {action.label}
              </span>
            </Link>
          ))}
          <Link
            to={"/"}
            onClick={logout}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-red-500/30 hover:bg-neutral-800 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-neutral-950 group-hover:scale-110 transition-transform">
              <LogOut className={`w-4 h-4 text-blue-400`} />
            </div>
            <span className="text-[10px] sm:text-xs text-neutral-400 group-hover:text-white transition-colors text-center">
              logout
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;
