import { useState } from "react";
import { Eye, Mail, MailOpen, Reply, Trash2, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactResponsesTable = ({ responses }) => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const handleOpenResponse = (response) => {
    setSelectedResponse(response);
    setIsReplying(false);
    setReplyMessage("");
  };
  const handleCloseDialog = () => {
    setSelectedResponse(null);
    setIsReplying(false);
    setReplyMessage("");
  };
  const handleReplyClick = () => {
    setIsReplying(true);
  };
  const handleSendReply = () => {
    console.log(
      "Sending reply to:",
      selectedResponse?.email,
      "Message:",
      replyMessage,
    );
    setIsReplying(false);
    setReplyMessage("");
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "unread":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Mail className="w-3 h-3" />
            Unread
          </span>
        );
      case "read":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <MailOpen className="w-3 h-3" />
            Read
          </span>
        );
      case "replied":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Reply className="w-3 h-3" />
            Replied
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
            {status}
          </span>
        );
    }
  };
  return (
    <>
      <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10">
            <Mail className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-lg font-bold text-white">
            Contact Form Responses
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="text-xs uppercase bg-neutral-900/50 text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {responses.map((response) => (
                <motion.tr
                  key={response.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-neutral-800/30 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {response.name}
                  </td>
                  <td className="px-6 py-4">{response.email}</td>
                  <td className="px-6 py-4 truncate max-w-[200px] text-neutral-300">
                    {response.subject}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-neutral-500">
                    {response.submittedAt}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(response.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenResponse(response)}
                        className="p-2 rounded-lg hover:bg-violet-500/10 text-neutral-400 hover:text-violet-400 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* View Response Dialog */}
      <AnimatePresence>
        {selectedResponse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
            >
              <button
                onClick={handleCloseDialog}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {selectedResponse.subject}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    From:{" "}
                    <span className="text-white font-medium">
                      {selectedResponse.name}
                    </span>{" "}
                    ({selectedResponse.email})
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono bg-neutral-800/30 px-3 py-2 rounded-lg border border-neutral-800/50">
                    <span>Submitted:</span>
                    <span>{selectedResponse.submittedAt}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-800/30 border border-neutral-800 text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {selectedResponse.message}
                  </div>
                  {/* Reply Section */}
                  {isReplying ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-4 border-t border-neutral-800"
                    >
                      <div className="flex items-center gap-2 text-sm text-white font-medium">
                        <Reply className="w-4 h-4 text-violet-400" />
                        Reply to {selectedResponse.name}
                      </div>
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type your reply message here..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 min-h-[120px] resize-none transition-all"
                      />
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setIsReplying(false)}
                          className="px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-sm font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendReply}
                          disabled={!replyMessage.trim()}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-all shadow-lg shadow-violet-600/20"
                        >
                          <Send className="w-4 h-4" />
                          Send Email
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                      <button
                        onClick={handleCloseDialog}
                        className="px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-sm font-medium transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleReplyClick}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-neutral-900 hover:bg-neutral-200 font-medium text-sm transition-colors"
                      >
                        <Reply className="w-4 h-4" />
                        Reply via Email
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default ContactResponsesTable;
