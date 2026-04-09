import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Upload,
  X,
  ImageIcon,
  QrCode,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddEventDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
}) => {
  const fileInputRef = useRef();
  const paymentQrInputRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    status: "upcoming",
    image: "",
    paymentQr: "",
  });
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        status: "upcoming",
        image: "",
        paymentQr: "",
      });
    }
  }, [initialData, open]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      status: "upcoming",
      image: "",
      paymentQr: "",
    });
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePaymentQrUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          paymentQr: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleRemovePaymentQr = () => {
    setFormData((prev) => ({ ...prev, paymentQr: "" }));
    if (paymentQrInputRef.current) {
      paymentQrInputRef.current.value = "";
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const triggerPaymentQrInput = () => {
    paymentQrInputRef.current?.click();
  };
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      Date
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
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all text-sm [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>
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
                    <label className="text-sm font-medium text-neutral-300">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="w-full bg-neutral-950/30 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all appearance-none text-sm cursor-pointer"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Event Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-violet-400" />
                      Event Image
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {formData.image ? (
                      <div className="relative rounded-lg overflow-hidden border border-neutral-700 h-[160px] group bg-neutral-950/30">
                        <img
                          src={formData.image}
                          alt="Event preview"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-all transform hover:scale-105"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={triggerFileInput}
                        className="flex flex-col items-center justify-center gap-3 h-[160px] border border-dashed border-neutral-700 bg-neutral-950/30 rounded-lg cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group"
                      >
                        <div className="p-3 rounded-full bg-neutral-900 group-hover:scale-110 transition-transform duration-300">
                          <Upload className="w-5 h-5 text-neutral-500 group-hover:text-violet-400" />
                        </div>
                        <div className="text-center px-4">
                          <p className="text-sm font-medium text-neutral-400 group-hover:text-violet-300 transition-colors">
                            Upload Cover Image
                          </p>
                          <p className="text-xs text-neutral-600 mt-1Group">
                            PNG, JPG (Max 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Payment QR Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-violet-400" />
                      Payment QR Code
                    </label>
                    <input
                      ref={paymentQrInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePaymentQrUpload}
                      className="hidden"
                    />
                    {formData.paymentQr ? (
                      <div className="relative rounded-lg overflow-hidden border border-neutral-700 h-[160px] group bg-neutral-950/30">
                        <img
                          src={formData.paymentQr}
                          alt="Payment QR"
                          className="w-full h-full object-contain p-2 opacity-90 group-hover:opacity-50 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={handleRemovePaymentQr}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-all transform hover:scale-105"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={triggerPaymentQrInput}
                        className="flex flex-col items-center justify-center gap-3 h-[160px] border border-dashed border-neutral-700 bg-neutral-950/30 rounded-lg cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                      >
                        <div className="p-3 rounded-full bg-neutral-900 group-hover:scale-110 transition-transform duration-300">
                          <QrCode className="w-5 h-5 text-neutral-500 group-hover:text-indigo-400" />
                        </div>
                        <div className="text-center px-4">
                          <p className="text-sm font-medium text-neutral-400 group-hover:text-indigo-300 transition-colors">
                            Upload Payment QR
                          </p>
                          <p className="text-xs text-neutral-600 mt-1">
                            PNG, JPG (Max 2MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
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
                className="px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 transform hover:-translate-y-0.5"
              >
                {isEditing ? "Save Changes" : "Create Event"}
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
