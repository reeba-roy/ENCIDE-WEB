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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    login(email, password)
      .then(() => {
        setError("");
        navigate("/");
      })
      .catch((err) => {
        setPassword("");
        switch (err.code) {
          case "auth/invalid-email":
            setError("Error: The email entered is invalid.");
            break;
          case "auth/invalid-credential":
            setError("Error: The email or password provided is incorrect.");
            break;
          case "auth/internal-error":
          default:
            setError("Error: Something went wrong. Please retry.");
        }
        console.log(error);

        setTimeout(() => setError(""), 3000);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
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
    </>
  );
}

export default LoginForm;
