import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

function LoginForm({ onLoad }) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  if (user) return <Navigate to="/"></Navigate>;

  const handleAuthError = (errorCode) => {
    setPassword("");
    switch (errorCode) {
      case "auth/invalid-email":
        setError("Error: The email entered is invalid.");
        break;
      case "auth/missing-password":
        setError("Error: Password is required.");
        break;
      case "auth/invalid-credential":
        setError("Error: The email or password provided is incorrect.");
        break;
      case "auth/internal-error":
      default:
        setError("Error: Something went wrong. Please retry.");
    }

    setTimeout(() => setError(""), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.password || !formData.email) {
      toast.error("Provide a valid emain and password");
      return;
    }

    try {
      await login(formData.email, formData.password);
      setError("");
      toast.success("Successfully logged in")
      navigate("/");
    } catch (err) {
      handleAuthError(err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10 mt-4">
          <h1 className="text-3xl font-bold text-white mb-3">Welcome Back</h1>
          <p className="text-neutral-400">Sign in to continue your journey</p>
        </div>
        {/* Login Form */}
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top highlight line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-50" />
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full pl-11 pr-4 h-12 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-neutral-300"
                >
                  Password
                </label>
                <Link
                  to="#"
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-violet-400 transition-colors duration-300" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 h-12 rounded-lg bg-neutral-950/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-neutral-700"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full relative overflow-hidden group bg-violet-600 hover:bg-violet-700 text-white font-medium h-12 rounded-lg transition-all duration-300  hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline underline-offset-4"
              >
                Sign up
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

export default LoginForm;
