import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function LoginForm({ onLoad }) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputs = document
      .getElementById("login-form")
      .querySelectorAll("input");

    const allValid = [...inputs].every((input) => input.reportValidity());
    if (!allValid) {
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      setError("");
      navigate("/");
    } catch (err) {
      handleAuthError(err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-form" className="flex items-center justify-center h-screen">
      {error ? <p color="#FF0000">{error}</p> : null}
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* change the class of the button */}
        <button
          className="text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
