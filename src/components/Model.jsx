import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, X, CheckCircle2, Loader2 } from "lucide-react";

function Model({ event, onClose, onConfirm, status, isRegistered }) {
  const isChecking = status === "checking";
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isReady = status === "ready";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative bg-neutral-900 border border-violet-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl min-h-[380px] flex flex-col justify-center overflow-hidden"
      >
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Checking State */}
        {isChecking && (
          <div className="flex flex-col items-center justify-center gap-4 text-neutral-400">
            <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
            <p>Checking registration...</p>
          </div>
        )}

        {/* Ready / Confirm State */}
        <div className="relative flex-1 flex flex-col justify-center">
          {isChecking && (
            <div className="flex flex-col items-center gap-4 text-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
              <p>Checking registration...</p>
            </div>
          )}

          {(isReady || isSubmitting) && (
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-violet-400" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                {isRegistered ? "Already registered" : "Confirm Registration"}
              </h3>

              <p className="text-neutral-400">
                You are about to register for{" "}
                <span className="text-violet-300 font-medium">
                  {event.title}
                </span>
                .
              </p>

              <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-800 space-y-3 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  {event.date.toString()}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  {event.location}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={onConfirm}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing
                    </>
                  ) : isRegistered ? (
                    "Close"
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                Registration Successful!
              </h3>

              <p className="text-neutral-400">
                You are now registered. Check your email for details.
              </p>

              <button
                onClick={onClose}
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {status === "error" && (
          <div className="text-center text-red-400">
            Something went wrong. Please try again.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Model;
