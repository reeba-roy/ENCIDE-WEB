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
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Mock Data for Registered Users
const MOCK_REGISTRATIONS = {
  1: [
    {
      id: 101,
      name: "Alice Johnson",
      email: "alice.j@uni.edu",
      studentId: "CS21001",
      department: "Computer Science",
      year: "3rd",
    },
    {
      id: 102,
      name: "Bob Smith",
      email: "bob.s@uni.edu",
      studentId: "EE21045",
      department: "Electrical Eng.",
      year: "3rd",
    },
    {
      id: 103,
      name: "Charlie Brown",
      email: "charlie.b@uni.edu",
      studentId: "CS22012",
      department: "Computer Science",
      year: "2nd",
    },
    {
      id: 104,
      name: "Diana Prince",
      email: "diana.p@uni.edu",
      studentId: "ME20033",
      department: "Mechanical Eng.",
      year: "4th",
    },
    {
      id: 105,
      name: "Evan Wright",
      email: "evan.w@uni.edu",
      studentId: "CS21056",
      department: "Computer Science",
      year: "3rd",
    },
  ],
  2: [
    {
      id: 201,
      name: "Frank Castle",
      email: "frank.c@uni.edu",
      studentId: "CE21022",
      department: "Civil Eng.",
      year: "3rd",
    },
    {
      id: 202,
      name: "Grace Lee",
      email: "grace.l@uni.edu",
      studentId: "CS23005",
      department: "Computer Science",
      year: "1st",
    },
    {
      id: 203,
      name: "Henry Ford",
      email: "henry.f@uni.edu",
      studentId: "ME21011",
      department: "Mechanical Eng.",
      year: "3rd",
    },
  ],
  3: [
    {
      id: 301,
      name: "Isabella Ross",
      email: "isabella.r@uni.edu",
      studentId: "IT21009",
      department: "Information Tech.",
      year: "3rd",
    },
    {
      id: 302,
      name: "Jack Ryan",
      email: "jack.r@uni.edu",
      studentId: "CS21088",
      department: "Computer Science",
      year: "3rd",
    },
  ],
};

const EventsManager = ({ events, onEdit, onDelete }) => {
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedEventForRegistrations, setSelectedEventForRegistrations] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "completed");
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
  };
  const closeRegistrationsModal = () => {
    setSelectedEventForRegistrations(null);
  };
  const getStatusBadge = (status) => {
    if (status === "upcoming") {
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
  const EventTable = ({
    events,
    title,
  }) => (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden mb-8">
      <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-500/10">
          <Calendar className="w-5 h-5 text-violet-400" />
        </div>
        <h2 className="text-lg font-bold text-white flex items-center gap-3">
          {title}
          <span className="bg-neutral-800 text-neutral-400 text-xs font-medium px-2 py-0.5 rounded-full border border-neutral-700">
            {events.length}
          </span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        {events.length === 0 ? (
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
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Registrations</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {events.map((event) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-neutral-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{event.title}</p>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                        {event.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="flex items-center gap-1.5 text-neutral-300">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-neutral-500">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
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
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <Users className="w-4 h-4 text-violet-400" />
                      {event.registrations}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(event.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleViewRegistrations(event)}
                        className="p-2 rounded-lg hover:bg-violet-500/10 text-neutral-400 hover:text-violet-400 transition-colors"
                        title="View Registrations"
                      >
                        <Eye className="w-4 h-4" />
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
  // Get current registrations to display
  const currentRegistrations = selectedEventForRegistrations
    ? MOCK_REGISTRATIONS[selectedEventForRegistrations.id] || []
    : [];
  const filteredRegistrations = currentRegistrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
                      {currentRegistrations.length}
                    </span>
                  </h2>
                  <p className="text-sm text-neutral-400 mt-1">
                    Registered users for{" "}
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
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-900/50">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search by name, email, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors border border-neutral-700">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
              {/* Table Content */}
              <div className="flex-1 overflow-auto custom-scrollbar">
                {currentRegistrations.length === 0 ? (
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
                ) : filteredRegistrations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="w-12 h-12 text-neutral-700 mb-4" />
                    <p className="text-neutral-400">
                      No results found for "{searchTerm}"
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="text-xs uppercase bg-neutral-900/50 text-neutral-500 font-medium sticky top-0 backdrop-blur-sm z-10 border-b border-neutral-800">
                      <tr>
                        <th className="px-6 py-3">Student Info</th>
                        <th className="px-6 py-3">Academic Details</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {filteredRegistrations.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-neutral-800/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-white">
                                {user.name}
                              </p>
                              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                                {user.studentId}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-neutral-300">
                                {user.department}
                              </span>
                              <span className="text-xs text-neutral-500">
                                {user.year} Year
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Confirmed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
    </>
  );
};
export default EventsManager;
