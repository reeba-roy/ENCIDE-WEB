import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  X,
  ImageIcon,
  Tag,
  Star,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper: convert a Firestore Timestamp (or Date) to "YYYY-MM-DD" for <input type="date">
const timestampToDateString = (ts) => {
  if (!ts) return "";
  const d = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AddEventDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    deadline: "",
    location: "",
    description: "",
    image: "",
    tag: "",
    highlighted: false,
    is_over: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        date: timestampToDateString(initialData.date),
        deadline: timestampToDateString(initialData.deadline),
        location: initialData.location || "",
        description: initialData.description || "",
        image: initialData.image || "",
        tag: initialData.tag || "",
        highlighted: initialData.highlighted || false,
        is_over: initialData.is_over || false,
      });
    } else {
      setFormData({
        title: "",
        date: "",
        deadline: "",
        location: "",
        description: "",
        image: "",
        tag: "",
        highlighted: false,
        is_over: false,
      });
    }
  }, [initialData, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        title: "",
        date: "",
        deadline: "",
        location: "",
        description: "",
        image: "",
        tag: "",
        highlighted: false,
        is_over: false,
      });
    } catch (err) {
      console.error("Error submitting event:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const tagOptions = [
    "hackathon",
    "workshop",
    "seminar",
    "competition",
    "webinar",
    "meetup",
    "bootcamp",
    "conference",
    "other",
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-neutral-800 border border-neutral-700/50 rounded-2xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700/50 bg-neutral-900">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isEditing ? "Edit Event" : "Add New Event"}
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  {isEditing
                    ? "Update the event details below."
                    : "Fill in the details to create a new event."}
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-full hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Scrollable Form Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar bg-neutral-900">
              <form
                id="event-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">
                    Event Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter event title"
                    className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm"
                    required
                  />
                </div>

                {/* Date & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm [color-scheme:dark]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-violet-400" />
                      Registration Deadline
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                      className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>

                {/* Location & Tag */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-violet-400" />
                      Location
                    </label>
                    <input
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Enter event location"
                      className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-violet-400" />
                      Event Tag
                    </label>
                    <div className="relative">
                      <select
                        value={formData.tag}
                        onChange={(e) => handleChange("tag", e.target.value)}
                        className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all appearance-none text-sm cursor-pointer"
                        required
                      >
                        <option value="" disabled>
                          Select a tag
                        </option>
                        {tagOptions.map((t) => (
                          <option key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-neutral-500">
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-violet-400" />
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Enter event description"
                    className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none min-h-[120px] text-sm custom-scrollbar"
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-violet-400" />
                    Image URL
                  </label>
                  <input
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm"
                  />
                  {formData.image && (
                    <div className="relative rounded-lg overflow-hidden border border-neutral-700 h-[160px] bg-neutral-950/30">
                      <img
                        src={formData.image}
                        alt="Event preview"
                        className="w-full h-full object-cover opacity-80"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Toggle switches */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Highlighted toggle */}
                  <label className="flex items-center justify-between p-4 rounded-xl border border-neutral-700 bg-neutral-950/30 cursor-pointer hover:border-violet-500/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.highlighted ? 'bg-amber-500/10' : 'bg-neutral-800'} transition-colors`}>
                        <Star className={`w-4 h-4 ${formData.highlighted ? 'text-amber-400' : 'text-neutral-500'} transition-colors`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Highlighted</p>
                        <p className="text-xs text-neutral-500">Feature this event</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.highlighted}
                        onChange={(e) => handleChange("highlighted", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 transition-colors"></div>
                    </div>
                  </label>

                  {/* Is Over toggle */}
                  <label className="flex items-center justify-between p-4 rounded-xl border border-neutral-700 bg-neutral-950/30 cursor-pointer hover:border-violet-500/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.is_over ? 'bg-emerald-500/10' : 'bg-neutral-800'} transition-colors`}>
                        <CheckCircle className={`w-4 h-4 ${formData.is_over ? 'text-emerald-400' : 'text-neutral-500'} transition-colors`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Event Over</p>
                        <p className="text-xs text-neutral-500">Mark as completed</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.is_over}
                        onChange={(e) => handleChange("is_over", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 transition-colors"></div>
                    </div>
                  </label>
                </div>
              </form>
            </div>
            {/* Footer */}
            <div className="p-6 border-t border-neutral-700/50 flex justify-end gap-3 bg-neutral-900 rounded-b-2xl">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-5 py-2.5 rounded-lg border border-neutral-600 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                form="event-form"
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Save Changes"
                  : "Create Event"}
              </button>
            </div>
            {/* Custom Styles for Scrollbar */}
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #171717; /* neutral-900 */
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #404040; /* neutral-700 */
                border-radius: 9999px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #525252; /* neutral-600 */
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default AddEventDialog;
