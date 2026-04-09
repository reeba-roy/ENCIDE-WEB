import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react";

const DashboardStats = ({ upcomingCount, completedCount, totalEvents }) => {
  const stats = [
    {
      label: "Upcoming Events",
      value: upcomingCount,
      icon: Clock,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Total Registered",
      value: totalEvents,
      icon: Calendar,
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/10",
    },
    {
      label: "Attendance Rate",
      value:
        totalEvents > 0
          ? `${Math.round((completedCount / totalEvents) * 100)}%`
          : "0%",
      icon: TrendingUp,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 hover:border-violet-500/30 transition-all duration-300 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-neutral-400">{stat.label}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
