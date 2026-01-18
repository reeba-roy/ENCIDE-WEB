import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Dashboard = ({ onLoad }) => {
  const { user: authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!authUser) return;
      try {
        const ref = doc(db, "users", authUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUser(snap.data());
          setFormData(snap.data());
        }
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    loadUserDetails();
  }, [authUser]);

  const handleOpenModal = () => {
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) return;
    try {
      const ref = doc(db, "users", authUser.uid);
      await updateDoc(ref, {
        name: formData.name,
        college: formData.college,
        department: formData.department,
        semester: Number(formData.semester),
      });
      setUser(formData);
      setIsModalOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className='p-4 pt-28 bg-[#121212] min-h-screen'>
      <div className='mb-4 relative z-10'>
        <h1 className='text-xl font-bold mb-2 text-white'>User Dashboard</h1>
        <button
          onClick={handleOpenModal}
          className='inline-flex items-center px-3 py-2 border rounded text-white'
        >
          Edit Profile
        </button>
      </div>

      <div className='border border-gray-600 rounded'>
        <table className='w-full'>
          <tbody>
            <tr className='border-b'>
              <td className='p-2 font-bold text-white'>Name</td>
              <td className='p-2 text-white'>{user?.name || "Loading..."}</td>
            </tr>
            <tr className='border-b'>
              <td className='p-2 font-bold text-white'>College</td>
              <td className='p-2 text-white'>
                {user?.college || "Loading..."}
              </td>
            </tr>
            <tr className='border-b'>
              <td className='p-2 font-bold text-white'>Department</td>
              <td className='p-2 text-white'>
                {user?.department || "Loading..."}
              </td>
            </tr>
            <tr className='border-b'>
              <td className='p-2 font-bold text-white'>Semester</td>
              <td className='p-2 text-white'>
                {user?.semester || "Loading..."}
              </td>
            </tr>
            <tr>
              <td className='p-2 font-bold text-white'>Events</td>
              <td className='p-2 text-white'>
                {user?.events?.length || 0} registered
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div>
          <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label className='text-white'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className='text-white'>College</label>
                <input
                  type='text'
                  name='college'
                  value={formData?.college || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className='text-white'>Department</label>
                <input
                  type='text'
                  name='department'
                  value={formData?.department || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className='text-white'>Semester</label>
                <input
                  type='number'
                  name='semester'
                  value={formData?.semester || ""}
                  onChange={handleInputChange}
                  min='1'
                  max='8'
                  required
                />
              </div>

              <div>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='text-white'
                >
                  Cancel
                </button>
                <button type='submit' className='text-white'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
