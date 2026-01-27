import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, X, CheckCircle2 } from "lucide-react";

function Model({ event, onClose, handleConfirm, step, isEventAlreadyRegistered }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-neutral-900 border border-violet-500/20 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <AnimatePresence mode="wait">
          {step === "confirm" ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {isEventAlreadyRegistered ? "Already registered" : "Confirm Registration"}
              </h3>
              <p className="text-neutral-400 mb-6">
                You are about to register for{" "}
                <span className="text-violet-300 font-medium">
                  {event.title}
                </span>
                .
              </p>
              <div className="bg-neutral-800/50 rounded-xl p-4 mb-8 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  {event.date.toString()}
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  {event.location}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isEventAlreadyRegistered}
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all shadow-lg shadow-violet-600/20"
                >
                  {isEventAlreadyRegistered ? "Already registered" : "Confirm"}
                  
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center relative z-10 py-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Registration Successful!
              </h3>
              <p className="text-neutral-400 mb-8">
                You have successfully registered for the event. Check your email
                for details.
              </p>
              <button
                onClick={onClose}
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Model;
