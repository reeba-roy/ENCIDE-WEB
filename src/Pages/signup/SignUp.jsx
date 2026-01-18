import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, signup, deleteCurrentUser } = useContext(AuthContext);
  if (user) return <Navigate to='/'></Navigate>;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleError = (errorMessage) => {
    setFormData({ ...formData, password: "", confirmPassword: "" });
    setError(errorMessage);
    setTimeout(() => setError(""), 3000);
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

      setError("");
      navigate("/");
    } catch {
      handleError("Error: Something went wrong. Please retry.");
      await deleteCurrentUser();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputs = document
      .getElementById("signup-form")
      .querySelectorAll("input");

    const allValid = [...inputs].every((input) => input.reportValidity());
    if (!allValid) {
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      handleError("Error: The passwords do not match.");
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
    <div className='flex flex-col items-center justify-center h-screen'>
      {error ? <p className='text-red-500'>{error}</p> : null}

      <form id='signup-form' className='my-6'>
        <label htmlFor='name'>Full name </label>
        <input
          type='text'
          id='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor='email'>Email address </label>
        <input
          type='email'
          id='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor='semester'>Semester </label>
        <input
          type='number'
          min='1'
          max='8'
          id='semester'
          value={formData.semester}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor='department'>Department </label>
        <input
          type='text'
          id='department'
          placeholder='eg. Data Science A'
          value={formData.department}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor='college'>College </label>
        <input
          type='text'
          id='college'
          value={formData.college}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor='password'>Password </label>
        <input
          type='password'
          id='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor='confirmPassword'>Confirm Password </label>
        <input
          type='password'
          id='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        {/* change the class of the button */}
        <button
          className='text-white'
          onClick={handleSubmit}
          disabled={loading}
        >
          Sign Up
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to='/login' className='text-blue-500 underline'>
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUpForm;
