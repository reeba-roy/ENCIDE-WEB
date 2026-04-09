import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight, XCircle } from "lucide-react";

const EventsList = ({ events, title, emptyMessage, isUpcomming }) => {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl h-full flex flex-col overflow-hidden">
      <div className="p-5 border-b border-neutral-800 flex items-center justify-between flex-none bg-neutral-900/50 backdrop-blur-md z-10">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div
        className="p-5 flex-1 overflow-y-auto min-h-0 pr-2 
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-neutral-800
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:hover:bg-violet-500/50
        transition-colors"
      >
        {events?.length === 0 ? (
          <p className="text-neutral-500 text-center py-8 text-sm">
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-3">
            {events?.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-3 rounded-xl bg-neutral-900/30 border border-neutral-800 hover:border-violet-500/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-neutral-200 text-sm truncate group-hover:text-violet-300 transition-colors">
                        {event.title}
                      </h4>
                      {!isUpcomming && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                            event.status === "upcoming"
                              ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                              : "bg-neutral-800 text-neutral-400 border-neutral-700"
                          }`}
                        >
                          Done
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date?.toDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {/* {event.time} */}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default EventsList;
