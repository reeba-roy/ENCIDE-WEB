import { useState, useEffect } from "react";

import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Dashboard = ({ onLoad }) => {
  useEffect(() => {
    if (onLoad) onLoad();
  }, []);

  // TODO: Change hardcoded value to get user from context
  const username = "example_user";

  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const ref = doc(db, "users", username);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUser(snap.data());
          setFormData(snap.data());
          console.log(snap.data());
        }
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    loadUserDetails();
  }, []);

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
    try {
      const ref = doc(db, "users", username);
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
    <div className='p-4'>
      <div className='mb-4'>
        <h1 className='text-xl font-bold mb-2 text-white'>User Dashboard</h1>
        <button
          onClick={handleOpenModal}
          className='border px-4 py-2 text-white'
        >
          Edit Profile
        </button>
      </div>

      <div className='border'>
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
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 w-96 border'>
            <h2 className='text-lg font-bold mb-4 text-black'>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <label className='block mb-1 text-black'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                  className='w-full border p-2'
                  required
                />
              </div>

              <div className='mb-2'>
                <label className='block mb-1 text-black'>College</label>
                <input
                  type='text'
                  name='college'
                  value={formData?.college || ""}
                  onChange={handleInputChange}
                  className='w-full border p-2'
                  required
                />
              </div>

              <div className='mb-2'>
                <label className='block mb-1 text-black'>Department</label>
                <input
                  type='text'
                  name='department'
                  value={formData?.department || ""}
                  onChange={handleInputChange}
                  className='w-full border p-2'
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='block mb-1 text-black'>Semester</label>
                <input
                  type='number'
                  name='semester'
                  value={formData?.semester || ""}
                  onChange={handleInputChange}
                  min='1'
                  max='8'
                  className='w-full border p-2'
                  required
                />
              </div>

              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='border px-4 py-2 text-black'
                >
                  Cancel
                </button>
                <button type='submit' className='border px-4 py-2 text-black'>
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
