import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Building,
  School,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function SignUpForm({ onLoad }) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    semester: 1,
    department: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const { user, signup, deleteCurrentUser } = useContext(AuthContext);

  if (user) return <Navigate to="/"></Navigate>;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleError = (errorMessage) => {
    setFormData({ ...formData, password: "", confirmPassword: "" });
    toast.error(errorMessage);
  };

  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        handleError("Error: The email entered is invalid.");
        break;
      case "auth/missing-password":
        handleError("Error: Password is required.");
        break;
      case "auth/weak-password":
        handleError("Error: The password is weak.");
        break;
      case "auth/email-already-in-use":
        handleError("Error: An account with that email already exists.");
        break;
      case "auth/internal-error":
      default:
        handleError("Error: Something went wrong. Please retry.");
    }
  };

  const createUserDocument = async (userId) => {
    try {
      await setDoc(doc(db, "users", userId), {
        name: formData.name,
        semester: formData.semester,
        department: formData.department,
        college: formData.college,
        events: [],
        isAdmin: false,
      });

      toast.success("Successfully registerd new user ")
      navigate("/");
    } catch {
      handleError("Error: Something went wrong. Please retry.");
      await deleteCurrentUser();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true)
      setLoading(false);
      return;
    }

    try {
      const response = await signup(formData.email, formData.password);
      const userId = response.user.uid;
      await createUserDocument(userId);
    } catch (err) {
      handleAuthError(err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10 py-8"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-white mb-4 mt-6">
            Register Here
          </h1>
          <p className="text-neutral-400 text-sm">
            Create your account and start your journey
          </p>
        </div>
        {/* Register Form */}
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top highlight line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-50" />
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-neutral-300 ml-1"
              >
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 h-11 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-300 ml-1"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 h-11 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                  required
                />
              </div>
            </div>
            {/* Semester & Department Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="semester"
                  className="text-sm font-medium text-neutral-300 ml-1"
                >
                  Semester
                </label>
                <div className="relative group">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                  <input
                    id="semester"
                    name="semester"
                    type="number"
                    min="1"
                    max="8"
                    placeholder="e.g. 4"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 h-11 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="text-sm font-medium text-neutral-300 ml-1"
                >
                  Department
                </label>
                <div className="relative group">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                  <input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="e.g. CSE"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 h-11 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                    required
                  />
                </div>
              </div>
            </div>
            {/* College */}
            <div className="space-y-2">
              <label
                htmlFor="college"
                className="text-sm font-medium text-neutral-300 ml-1"
              >
                College
              </label>
              <div className="relative group">
                <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                <input
                  id="college"
                  name="college"
                  type="text"
                  placeholder="e.g. Institute of Technology"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 h-11 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                  required
                />
              </div>
            </div>
            {/* Password & Confirm Password Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-neutral-300 ml-1"
                >
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 h-11 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-neutral-300 ml-1"
                >
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 h-11 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
            {passwordError && (
              <div className="flex items-center gap-2 text-rose-500 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>password mismatch</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden group bg-violet-600 hover:bg-violet-700 text-white font-medium h-12 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </div>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-neutral-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Back to Home
          </Link>
        </div>
      </motion.div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default SignUpForm;
