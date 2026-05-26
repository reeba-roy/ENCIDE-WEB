import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Plus,
  ChevronLeft,
  Mail,
  Clock,
  User,
  LogOut,
  Settings,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ContactResponsesTable from "../../components/admin/ContactResponsesTable";
import EventsManager from "../../components/admin/EventsManager";
import AddEventDialog from "../../components/admin/AddEventDialog";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const Admin = ({ onLoad }) => {
  const [events, setEvents] = useState([]);
  const [contactResponses, setContactResponses] = useState([]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("contacts");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (onLoad) onLoad();
  }, []);

  // Real-time listener for contact-us collection
  useEffect(() => {
    const q = query(collection(db, "contact-us"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const responses = snapshot.docs.map((doc) => {
        const data = doc.data();
        let submittedAt = "Just now";
        let rawCreatedAt = new Date(0); // Default to epoch for sorting if missing
        if (data.createdAt) {
          const dateObj = typeof data.createdAt.toDate === "function"
            ? data.createdAt.toDate()
            : new Date(data.createdAt);

          rawCreatedAt = dateObj;
          submittedAt = dateObj.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }
        return {
          id: doc.id,
          name: data.name || "Anonymous",
          email: data.email || "",
          subject: data.subject || "No Subject",
          message: data.message || "",
          status: data.read ? "read" : "unread",
          submittedAt,
          rawCreatedAt,
        };
      });
      // Sort responses in-memory by creation date desc
      responses.sort((a, b) => b.rawCreatedAt - a.rawCreatedAt);
      setContactResponses(responses);
    }, (error) => {
      console.error("Error fetching contact responses:", error);
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener for events collection
  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          image: data.image || "",
          paymentQr: data.paymentQr || "",
          tag: data.tag || "",
          highlighted: data.highlighted || false,
          is_over: data.is_over || false,
          participants: data.participants || [],
          participants_count: data.participants_count || 0,
          // Keep raw Timestamps for Firestore operations, convert for display
          date: data.date,
          deadline: data.deadline,
        };
      });
      setEvents(eventsData);
    }, (error) => {
      console.error("Error fetching events:", error);
    });

    return () => unsubscribe();
  }, []);

  // Count pending approvals across all events
  const pendingApprovals = events.reduce((count, event) => {
    return (
      count +
      (event.participants || []).filter(
        (p) => typeof p === "object" && p.status === "pending"
      ).length
    );
  }, 0);

  const stats = [
    {
      label: "Total Contacts",
      value: contactResponses.length,
      icon: MessageSquare,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      label: "Unread Messages",
      value: contactResponses.filter((c) => c.status === "unread").length,
      icon: Mail,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      label: "Total Events",
      value: events.length,
      icon: Calendar,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Pending Approvals",
      value: pendingApprovals,
      icon: AlertCircle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  const handleAddEvent = async (formData) => {
    try {
      // Convert date strings to Firestore Timestamps
      const eventDate = formData.date
        ? Timestamp.fromDate(new Date(formData.date + "T00:00:00"))
        : null;
      const eventDeadline = formData.deadline
        ? Timestamp.fromDate(new Date(formData.deadline + "T00:00:00"))
        : null;

      await addDoc(collection(db, "events"), {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        image: formData.image,
        paymentQr: formData.paymentQr || "",
        tag: formData.tag,
        highlighted: formData.highlighted,
        is_over: formData.is_over,
        date: eventDate,
        deadline: eventDeadline,
        participants: [],
        participants_count: 0,
      });
      setIsAddEventOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleLogout = () => {
    // Navigate to admin login (or home for now)
    navigate("/");
  };

  const handleEditEvent = async (formData) => {
    try {
      const eventRef = doc(db, "events", formData.id);

      // Convert date strings to Firestore Timestamps
      const eventDate = formData.date
        ? Timestamp.fromDate(new Date(formData.date + "T00:00:00"))
        : null;
      const eventDeadline = formData.deadline
        ? Timestamp.fromDate(new Date(formData.deadline + "T00:00:00"))
        : null;

      await updateDoc(eventRef, {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        image: formData.image,
        paymentQr: formData.paymentQr || "",
        tag: formData.tag,
        highlighted: formData.highlighted,
        is_over: formData.is_over,
        date: eventDate,
        deadline: eventDeadline,
      });
      setEditingEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleToggleReadStatus = async (id, currentReadState) => {
    try {
      await updateDoc(doc(db, "contact-us", id), {
        read: !currentReadState,
      });
    } catch (error) {
      console.error("Error toggling contact response read status:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contact-us", id));
    } catch (error) {
      console.error("Error deleting contact response:", error);
    }
  };

  const handleApproveRegistration = async (eventId, teamLeadId) => {
    try {
      const eventRef = doc(db, "events", eventId);
      const snap = await getDoc(eventRef);
      if (!snap.exists()) return;

      const data = snap.data();
      const updatedParticipants = (data.participants || []).map((team) => {
        if (team.team_lead_id === teamLeadId) {
          return { ...team, status: "approved" };
        }
        return team;
      });

      await updateDoc(eventRef, { participants: updatedParticipants });
    } catch (error) {
      console.error("Error approving registration:", error);
    }
  };

  const handleRejectRegistration = async (eventId, teamLeadId) => {
    try {
      const eventRef = doc(db, "events", eventId);
      const snap = await getDoc(eventRef);
      if (!snap.exists()) return;

      const data = snap.data();
      const updatedParticipants = (data.participants || []).map((team) => {
        if (team.team_lead_id === teamLeadId) {
          return { ...team, status: "rejected" };
        }
        return team;
      });

      await updateDoc(eventRef, { participants: updatedParticipants });
    } catch (error) {
      console.error("Error rejecting registration:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-violet-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.05),transparent_50%)] pointer-events-none" />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors text-sm font-medium">
                  <ChevronLeft className="w-4 h-4" />
                  Back to Site
                </button>
              </Link>
              <div className="h-6 w-px bg-neutral-800 mx-2 hidden md:block" />
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-violet-600">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold text-white hidden md:block">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddEventOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-all shadow-lg shadow-violet-600/20"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Event</span>
              </button>
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-700 hover:border-violet-500 hover:shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)] transition-all overflow-hidden"
                >
                  <User className="w-5 h-5 text-neutral-400" />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="p-4 border-b border-neutral-800">
                          <p className="text-sm font-medium text-white">
                            Admin
                          </p>
                          <p className="text-xs text-neutral-500">
                            admin@encide.club
                          </p>
                        </div>
                        <div className="p-1">
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg transition-colors">
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Log out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 lg:px-20 py-8 mt-16 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-colors group`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-400 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-white mt-2 group-hover:text-violet-200 transition-colors">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Main Content Tabs */}
        <div className="space-y-6">
          <div className="inline-flex gap-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "contacts"
                  ? "bg-violet-600 text-white shadow-lg "
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Contact Responses
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "events"
                  ? "bg-violet-600 text-white shadow-lg "
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Manage Events
            </button>
          </div>
          <AnimatePresence mode="wait">
            {activeTab === "contacts" ? (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ContactResponsesTable responses={contactResponses} onDelete={handleDeleteContact} onToggleRead={handleToggleReadStatus} />
              </motion.div>
            ) : (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <EventsManager
                  events={events}
                  onEdit={setEditingEvent}
                  onDelete={handleDeleteEvent}
                  onApproveRegistration={handleApproveRegistration}
                  onRejectRegistration={handleRejectRegistration}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      {/* Add Event Dialog */}
      <AddEventDialog
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        onSubmit={handleAddEvent}
      />
      {/* Edit Event Dialog */}
      {editingEvent && (
        <AddEventDialog
          open={!!editingEvent}
          onOpenChange={(open) => !open && setEditingEvent(null)}
          onSubmit={(data) => handleEditEvent({ ...data, id: editingEvent.id })}
          initialData={editingEvent}
          isEditing
        />
      )}
    </div>
  );
};
export default Admin;
