import { motion } from "framer-motion";
import { Calendar, MapPin, X, CheckCircle2, Loader2 } from "lucide-react";

function Model({
  event,
  onClose,
  onConfirm,
  status,
  isRegistered,
  memberCount,
  setMemberCount,
  teamName,
  setTeamName,
  members,
  setMembers,
}) {
  const isChecking = status === "checking";
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isReady = status === "ready";


  const isTeamNameValid = memberCount === 1 || teamName.trim().length > 0;

  const areMembersValid = members.slice(0, memberCount).every((m, index) => {
    if (index === 0) {
      return m.phone?.trim().length > 0;
    }

    return (
      m.name?.trim().length > 0 &&
      m.email?.trim().length > 0 &&
      m.phone?.trim().length > 0
    );
  });

  const isFormValid = isTeamNameValid && areMembersValid;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="relative bg-neutral-900 border border-violet-500/20 rounded-2xl p-8 w-full max-w-md lg:max-w-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#404040 #171717",
        }}
      >
        {/* Webkit Scrollbar */}
        <style>
          {`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scroll::-webkit-scrollbar-track {
              background: #171717;
            }
            .custom-scroll::-webkit-scrollbar-thumb {
              background-color: #404040;
              border-radius: 10px;
            }
          `}
        </style>

        <div className="custom-scroll">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            {isChecking && (
              <div className="flex flex-col items-center gap-4 text-neutral-400 py-12">
                <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
                <p>Checking registration...</p>
              </div>
            )}

            {(isReady || isSubmitting) && (
              <>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-violet-400" />
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {isRegistered ? "Already registered" : "Confirm Registration"}
                </h3>

                <p className="text-neutral-400">
                  Register for{" "}
                  <span className="text-violet-300 font-medium">
                    {event.title}
                  </span>
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

                {!isRegistered && (
                  <div className="space-y-5">
                    {/* Team Size */}
                    <div>
                      <label className="text-sm text-neutral-400 block mb-2">
                        Team Size (Max 4)
                      </label>
                      <select
                        value={memberCount}
                        disabled={isSubmitting}
                        onChange={(e) => setMemberCount(Number(e.target.value))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Team Name */}
                    {memberCount > 1 && (
                      <div>
                        <label className="text-sm text-neutral-400 block mb-2">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                          placeholder="Enter team name"
                        />
                        {!isTeamNameValid && (
                          <p className="text-red-400 text-xs mt-1">
                            Team name is required
                          </p>
                        )}
                      </div>
                    )}

                    {/* Members */}
                    {members.slice(0, memberCount).map((member, index) => (
                      <div
                        key={index}
                        className="space-y-3 border border-neutral-800 p-4 rounded-lg"
                      >
                        <p className="text-sm text-neutral-400">
                          {index === 0 ? "Team Lead" : `Member ${index + 1}`}
                        </p>

                        <input
                          type="text"
                          placeholder="Name"
                          value={member.name}
                          disabled={index === 0 || isSubmitting}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[index].name = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                        />

                        <input
                          type="email"
                          placeholder="Email"
                          value={member.email}
                          disabled={index === 0 || isSubmitting}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[index].email = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                        />

                        <input
                          type="text"
                          placeholder="Phone"
                          value={member.phone}
                          disabled={isSubmitting}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[index].phone = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={onConfirm}
                    disabled={isSubmitting || !isFormValid}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-medium flex items-center justify-center gap-2"
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
              </>
            )}

            {isSuccess && (
              <div className="text-center space-y-6 py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>

                <h3 className="text-2xl font-bold text-white">
                  Registration Successful!
                </h3>

                <button
                  onClick={onClose}
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
                >
                  Close
                </button>
              </div>
            )}

            {status === "error" && (
              <div className="text-center text-red-400">
                Something went wrong. Please try again.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Model;
