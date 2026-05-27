import { useState, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contact-us"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Failed to send message !");
    }
    setIsSubmitting(false);
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "encide@encidemace.xyz",
      href: "mailto:encide@encidemace.xyz",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9827390384",
      href: "tel:+919827390384",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mar Athanasius College of Engineering, Kothamangalam, Kerala",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-[radial-gradient(circle_at_0%_0%,rgba(220, 38, 38,0.05),transparent_30%)]"
      ref={ref}
    >
      <div className="container mx-auto px-4 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Let's{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Have questions or ideas? We'd love to hear from you. Reach out and
            let's start a conversation.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Get in Touch
              </h3>
              <p className="text-neutral-400">
                Whether you want to join, collaborate, or just say hi, we're
                always excited to connect with fellow students.
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-red-500/50 hover:shadow-[0_0_30px_-10px_theme(colors.red.500/0.3)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800 shadow-2xl relative overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6 pt-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="flex h-11 w-full rounded-lg border border-neutral-800 bg-neutral-950/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 hover:border-neutral-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@university.edu"
                    required
                    className="flex h-11 w-full rounded-lg border border-neutral-800 bg-neutral-950/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 hover:border-neutral-700"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="flex h-11 w-full rounded-lg border border-neutral-800 bg-neutral-950/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 hover:border-neutral-700"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  required
                  className="flex min-h-[120px] w-full rounded-lg border border-neutral-800 bg-neutral-950/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 hover:border-neutral-700 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 hover:transition hover:duration-250 h-12 rounded-lg px-8 active:scale-[0.98] duration-200"
              >
                {isSubmitting ? (
                  <>
                    <CheckCircle className="w-5 h-5 animate-pulse mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </section>
  );
};
export default ContactSection;
