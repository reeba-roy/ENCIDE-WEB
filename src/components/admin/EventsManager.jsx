import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  X,
  AlertTriangle,
  Eye,
  Search,
  Star,
  Tag,
  Mail,
  Phone,
  User,
  QrCode,
  Check,
  CheckCircle2,
  XCircle,
  ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper: safely format a Firestore Timestamp or Date to a readable string
const formatDate = (ts) => {
  if (!ts) return "—";
  const d = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EventsManager = ({
  events,
  onEdit,
  onDelete,
  onApproveRegistration,
  onRejectRegistration,
}) => {
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedEventForRegistrations, setSelectedEventForRegistrations] =
    useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  const upcomingEvents = events.filter((e) => !e.is_over);
  const pastEvents = events.filter((e) => e.is_over);

  const handleDeleteClick = (id) => {
    setEventToDelete(id);
  };
  const confirmDelete = () => {
    if (eventToDelete) {
      onDelete(eventToDelete);
      setEventToDelete(null);
    }
  };
  const cancelDelete = () => {
    setEventToDelete(null);
  };
  const handleViewRegistrations = (event) => {
    setSelectedEventForRegistrations(event);
    setSearchTerm("");
    setStatusFilter("all");
  };
  const closeRegistrationsModal = () => {
    setSelectedEventForRegistrations(null);
  };

  const getStatusBadge = (event) => {
    if (event.highlighted) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Star className="w-3 h-3" />
          Featured
        </span>
      );
    }
    if (!event.is_over) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Upcoming
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
        Completed
      </span>
    );
  };

  const EventTable = ({ events: tableEvents, title }) => (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden mb-8">
      <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-500/10">
          <Calendar className="w-5 h-5 text-violet-400" />
        </div>
        <h2 className="text-lg font-bold text-white flex items-center gap-3">
          {title}
          <span className="bg-neutral-800 text-neutral-400 text-xs font-medium px-2 py-0.5 rounded-full border border-neutral-700">
            {tableEvents.length}
          </span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        {tableEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 mb-4">
              <Calendar className="w-6 h-6 text-neutral-600" />
            </div>
            <p className="text-neutral-400">No events found</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="text-xs uppercase bg-neutral-900/50 text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Date & Deadline</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Registrations</th>
                <th className="px-6 py-4">QR</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {tableEvents.map((event) => {
                // Calculate pending registrations count for this event
                const pendingCount = (event.participants || []).filter(
                  (p) => typeof p === "object" && p.status === "pending"
                ).length;

                return (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-neutral-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {event.image && (
                          <img
                            src={event.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-neutral-700 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">
                            {event.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {event.tag && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20">
                                <Tag className="w-2.5 h-2.5" />
                                {event.tag}
                              </span>
                            )}
                            <p className="text-xs text-neutral-500 line-clamp-1">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="flex items-center gap-1.5 text-neutral-300">
                          <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1.5 text-neutral-500">
                          <Clock className="w-3.5 h-3.5" />
                          Deadline: {formatDate(event.deadline)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-neutral-400 text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-white font-medium">
                          <Users className="w-4 h-4 text-violet-400" />
                          {event.participants_count || 0}
                        </span>
                        {pendingCount > 0 && (
                          <span
                            className="text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-full"
                            title={`${pendingCount} pending approval`}
                          >
                            {pendingCount} pending
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {event.paymentQr ? (
                        <div className="relative group/qr">
                          <img
                            src={event.paymentQr}
                            alt="QR"
                            className="w-8 h-8 rounded border border-neutral-700 object-cover cursor-pointer"
                          />
                          {/* Hover enlargement */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/qr:block z-50">
                            <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-2 shadow-2xl">
                              <img
                                src={event.paymentQr}
                                alt="Payment QR"
                                className="w-40 h-40 object-contain rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-neutral-600 flex items-center gap-1 text-xs">
                          <QrCode className="w-3.5 h-3.5" />
                          None
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(event)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleViewRegistrations(event)}
                          className="p-2 rounded-lg hover:bg-violet-500/10 text-neutral-400 hover:text-violet-400 transition-colors relative"
                          title="View Registrations"
                        >
                          <Eye className="w-4 h-4" />
                          {pendingCount > 0 && (
                            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          )}
                        </button>
                        <button
                          onClick={() => onEdit(event)}
                          className="p-2 rounded-lg hover:bg-violet-500/10 text-neutral-400 hover:text-violet-400 transition-colors"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  // Extract participants (teams) from the selected event
  // Each participant entry is either a string (user ID) or a map (team object)
  const currentParticipants = selectedEventForRegistrations
    ? (selectedEventForRegistrations.participants || []).filter(
        (p) => typeof p === "object" && p !== null
      )
    : [];

  // Flatten and prepare teams list
  const allTeamsWithMembers = currentParticipants.map((team) => ({
    team_name: team.team_name || "—",
    team_lead_id: team.team_lead_id || "—",
    count: team.count || 0,
    members: team.members || [],
    status: team.status || "approved", // fallback default approved for older entries
    payment_proof: team.payment_proof || "",
  }));

  const filteredTeams = allTeamsWithMembers.filter((team) => {
    // 1. Status Filter
    if (statusFilter !== "all" && team.status !== statusFilter) return false;

    // 2. Search Term Filter
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    if (team.team_name.toLowerCase().includes(term)) return true;
    if (team.team_lead_id.toLowerCase().includes(term)) return true;
    return team.members.some(
      (m) =>
        (m.name || "").toLowerCase().includes(term) ||
        (m.email || "").toLowerCase().includes(term) ||
        (m.phone || "").toLowerCase().includes(term)
    );
  });

  return (
    <>
      <div className="space-y-6">
        <EventTable events={upcomingEvents} title="Upcoming Events" />
        <EventTable events={pastEvents} title="Past Events" />
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {eventToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete Event
                </h3>
                <p className="text-neutral-400 mb-6">
                  Are you sure you want to delete this event? This action cannot
                  be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-lg shadow-red-600/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Registrations Dialog */}
      <AnimatePresence>
        {selectedEventForRegistrations && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    Registrations
                    <span className="bg-violet-500/10 text-violet-400 text-sm font-medium px-2.5 py-0.5 rounded-full border border-violet-500/20">
                      {selectedEventForRegistrations.participants_count || 0}{" "}
                      registered
                    </span>
                  </h2>
                  <p className="text-sm text-neutral-400 mt-1">
                    Teams registered for{" "}
                    <span className="text-white font-medium">
                      {selectedEventForRegistrations.title}
                    </span>
                  </p>
                </div>
                <button
                  onClick={closeRegistrationsModal}
                  className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Toolbar */}
              <div className="p-4 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/50">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search by team name, member, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                  />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-neutral-950 p-1 border border-neutral-800 rounded-lg shrink-0">
                  {["all", "pending", "approved", "rejected"].map((status) => {
                    const count = allTeamsWithMembers.filter(
                      (t) => status === "all" || t.status === status
                    ).length;

                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                          statusFilter === status
                            ? "bg-violet-600 text-white shadow"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        <span
                          className={`ml-1.5 text-[10px] px-1 py-0.2 rounded-full border ${
                            statusFilter === status
                              ? "bg-violet-500/20 text-white border-violet-400/30"
                              : "bg-neutral-800 text-neutral-500 border-neutral-700"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto custom-scrollbar p-4">
                {currentParticipants.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-neutral-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      No registrations yet
                    </h3>
                    <p className="text-neutral-500 text-sm">
                      Waiting for participants to sign up.
                    </p>
                  </div>
                ) : filteredTeams.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="w-12 h-12 text-neutral-700 mb-4" />
                    <p className="text-neutral-400 font-medium">
                      No results found
                    </p>
                    <p className="text-neutral-600 text-sm mt-1">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTeams.map((team, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-neutral-800 bg-neutral-950/50 overflow-hidden"
                      >
                        {/* Team Header */}
                        <div className="px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/50 border-b border-neutral-800">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-violet-500/10">
                              <Users className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-white">
                                  {team.team_name}
                                </p>
                                <span
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                    team.status === "pending"
                                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                      : team.status === "rejected"
                                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  }`}
                                >
                                  {team.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-500 mt-0.5">
                                Team Lead ID:{" "}
                                <span className="text-neutral-400 font-mono">
                                  {team.team_lead_id}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end md:self-auto">
                            {/* Payment proof screenshot preview */}
                            {team.payment_proof && (
                              <button
                                onClick={() =>
                                  setActiveLightboxImage(team.payment_proof)
                                }
                                className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all"
                                title="View payment proof"
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                                Payment Proof
                              </button>
                            )}

                            {/* Approval Actions */}
                            <div className="flex items-center gap-2">
                              {team.status !== "approved" && (
                                <button
                                  onClick={() =>
                                    onApproveRegistration(
                                      selectedEventForRegistrations.id,
                                      team.team_lead_id
                                    )
                                  }
                                  className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg font-medium transition-all"
                                  title="Approve registration"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Approve
                                </button>
                              )}
                              {team.status !== "rejected" && (
                                <button
                                  onClick={() =>
                                    onRejectRegistration(
                                      selectedEventForRegistrations.id,
                                      team.team_lead_id
                                    )
                                  }
                                  className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-2.5 py-1.5 rounded-lg font-medium transition-all"
                                  title="Reject registration"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  Reject
                                </button>
                              )}
                            </div>

                            <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-700">
                              {team.count} member{team.count !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        {/* Members */}
                        <div className="divide-y divide-neutral-800/50">
                          {team.members.map((member, mIdx) => (
                            <div
                              key={mIdx}
                              className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-800/10 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-xs font-medium border border-neutral-700">
                                  {(member.name || "?").charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white flex items-center gap-2">
                                    {member.name || "No name"}
                                    {mIdx === 0 && (
                                      <span className="text-[10px] text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20 font-semibold">
                                        Lead
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                                {member.email && (
                                  <span className="flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5 text-neutral-600" />
                                    {member.email}
                                  </span>
                                )}
                                {member.phone && (
                                  <span className="flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-neutral-600" />
                                    {member.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex justify-end">
                <button
                  onClick={closeRegistrationsModal}
                  className="px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox / Payment Proof Viewer */}
      <AnimatePresence>
        {activeLightboxImage && (
          <div
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <div className="absolute top-4 right-4 flex items-center gap-4 text-white">
              <span className="text-xs text-neutral-500 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full font-medium">
                Payment Proof screenshot
              </span>
              <button className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={activeLightboxImage}
              alt="Payment screenshot proof"
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-neutral-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // don't close if clicking the image itself
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventsManager;
