import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useContext, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, Clock, Users, Zap } from "lucide-react";
import Countdown from "../../components/Countdown";
import { useNavigate } from "react-router-dom";

import {
  doc,
  updateDoc,
  arrayUnion,
  increment,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Model from "../../components/Model";
import { AuthContext } from "../../contexts/AuthContext";

import { useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchFeaturedEvent } from "../../lib/getEvents";
import { getUserDetails } from "../../lib/getUserDetails";
import { uploadToCloudinary, getEventFolder } from "../../lib/cloudinary";

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const RegistrationModal = ({ event, onClose }) => {
    const { user } = useContext(AuthContext);

    const [status, setStatus] = useState("checking");
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState(null);

    const [memberCount, setMemberCount] = useState(1);
    const [teamName, setTeamName] = useState("");
    const [paymentFile, setPaymentFile] = useState(null);

    const { data: userData, isLoading } = useQuery({
      queryKey: ["user-data"],
      queryFn: () => getUserDetails(user.uid),
      enabled: !!user?.uid,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    });

    const [members, setMembers] = useState([]);

    useEffect(() => {
      if (userData) {
        setMembers([
          {
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
          },
        ]);
      }
    }, [userData]);

    const userRef = doc(db, "users", user.uid);
    const eventRef = doc(db, "events", event.id);

    useEffect(() => {
      setMembers((prev) => {
        const updated = [...prev];

        while (updated.length < memberCount) {
          updated.push({ name: "", email: "", phone: "" });
        }

        return updated.slice(0, memberCount);
      });
    }, [memberCount]);

    useEffect(() => {
      let mounted = true;

      const check = async () => {
        try {
          const snap = await getDoc(eventRef);
          if (!snap.exists()) {
            setStatus("error");
            return;
          }
          const data = snap.data();
          const existingTeam = data.participants?.find(
            (team) => team.team_lead_id === user.uid,
          );
          if (mounted) {
            setIsRegistered(!!existingTeam);
            setRegistrationStatus(existingTeam?.status || (existingTeam ? "approved" : null));
            setStatus("ready");
          }
        } catch (err) {
          console.error(err);
          if (mounted) setStatus("error");
        }
      };

      check();
      return () => {
        mounted = false;
      };
    }, [event.id, user.uid]);

    const handleConfirm = async () => {
      if (isRegistered) {
        onClose();
        return;
      }

      try {
        setStatus("submitting");
        const start = Date.now();
        const isPaidEvent = !!event.paymentQr;
        const finalTeamName =
          memberCount === 1
            ? members[0].name
            : teamName.trim() || "Untitled Team";

        const teamObject = {
          team_lead_id: user.uid,
          team_name: finalTeamName,
          members,
          count: memberCount,
          status: isPaidEvent ? "pending" : "approved",
          payment_proof: "",
        };

        // Upload payment screenshot for paid events
        if (isPaidEvent && paymentFile) {
          const folder = getEventFolder(event.title);
          const paymentUrl = await uploadToCloudinary(
            paymentFile,
            `${folder}/payments`,
            user.uid
          );
          teamObject.payment_proof = paymentUrl;
        }

        await Promise.all([
          updateDoc(userRef, {
            events: arrayUnion(event.id),
          }),
          updateDoc(eventRef, {
            participants: arrayUnion(teamObject),
            participants_count: increment(1),
          }),
        ]);

        const elapsed = Date.now() - start;
        const delay = Math.max(600 - elapsed, 0);

        setTimeout(() => {
          setStatus("success");
        }, delay);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    return (
      <Model
        event={event}
        onClose={onClose}
        onConfirm={handleConfirm}
        status={status}
        isRegistered={isRegistered}
        registrationStatus={registrationStatus}
        memberCount={memberCount}
        setMemberCount={setMemberCount}
        teamName={teamName}
        setTeamName={setTeamName}
        members={members}
        setMembers={setMembers}
        paymentFile={paymentFile}
        setPaymentFile={setPaymentFile}
      />
    );
  };

  const { data: events, } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    refetchOnWindowFocus: false,
  });

  const { data: featuredEvent } = useQuery({
    queryKey: ["featured-event"],
    queryFn: fetchFeaturedEvent,
    refetchOnWindowFocus: false,
  });

  return (
    <section
      id="events"
      className="pt-12 pb-24 md:pt-16 md:pb-32 bg-neutral-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.08),transparent_40%)] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4 shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-violet-400 font-medium text-sm">
              Upcoming Events
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Don't Miss{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              What's Next
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            From hackathons to workshops, our events challenge and connect you
            with like-minded individuals.
          </p>
        </motion.div>
        {featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800  backdrop-blur-sm group hover:border-violet-500/30 transition-all duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="grid lg:grid-cols-[42%_58%] gap-0">
                <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neutral-900/80 lg:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-violet-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-violet-600/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {featuredEvent.tag}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center relative">
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3  transition-colors">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-neutral-400 mb-6 text-sm md:text-base leading-relaxed">
                    {featuredEvent.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      <span>{featuredEvent.date.toDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <MapPin className="w-4 h-4 text-violet-400" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Users className="w-4 h-4 text-violet-400" />
                      <span>
                        {featuredEvent.participants_count}+ Participants
                      </span>
                    </div>
                  </div>
                  {featuredEvent.deadline.toString() && (
                    <div className="mb-8">
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Registration closes in
                      </p>
                      <Countdown targetDate={featuredEvent.deadline} />
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedEvent(featuredEvent)}
                    className="w-fit group/btn inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all shadow-[0_0_20px_-5px_theme(colors.violet.500/0.5)] hover:shadow-[0_0_25px_-5px_theme(colors.violet.500/0.7)] hover:scale-[1.02]"
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div className="grid lg:grid-cols-2 gap-6">
          {events?.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative backdrop-blur-sm rounded-xl overflow-hidden border border-neutral-800 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image */}
                <div className="relative w-full h-48 sm:w-72 sm:h-auto shrink-0 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/80 hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent sm:hidden" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-neutral-950/80 border border-neutral-800 text-white text-xs font-medium backdrop-blur-md">
                    {event.tag}
                  </span>
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col justify-center flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors truncate">
                    {event.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-neutral-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-violet-500" />
                      {event.date.toDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-500" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-violet-500" />
                      {event.participants_count}+
                    </span>
                    {event.deadline && (
                      <span className="flex items-center gap-1.5 ">
                        <Clock className="w-3.5 h-3.5 text-violet-500" />
                        By{" "}
                        {event.deadline.toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        @{" "}
                        {event.deadline.toLocaleTimeString(undefined, {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-fit mt-auto px-4 py-2 rounded-lg bg-neutral-800 hover:bg-violet-600 text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 group/btn border border-neutral-700 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    Register Now
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <RegistrationModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
export default EventsSection;
