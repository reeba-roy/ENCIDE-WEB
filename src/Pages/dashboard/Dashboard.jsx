import { useState, useEffect, useContext, useRef } from "react";
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
  const [toast, setToast] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!authUser) return;
      try {
        const ref = doc(db, "users", authUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const userData = snap.data();
          setUser(userData);
          setFormData(userData);

          if (userData.events && userData.events.length > 0) {
            const eventDetails = [];
            for (const eventRef of userData.events) {
              try {
                const eventSnap = await getDoc(eventRef);
                if (eventSnap.exists()) {
                  const eventData = eventSnap.data();
                  let dateStr = "TBA";
                  if (eventData.date) {
                    dateStr = eventData.date.toDate().toLocaleDateString();
                  }
                  eventDetails.push({
                    id: eventRef.id,
                    name: eventData.name || "Unknown Event",
                    date: dateStr,
                  });
                }
              } catch (err) {
                console.error(`Error fetching event ${eventRef.id}:`, err);
              }
            }
            setRegisteredEvents(eventDetails);
          }
        }
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setEventsLoading(false);
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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
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
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Failed to update profile", "error");
    }
  };

  return (
    <div className='min-h-screen bg-[#0f0f12] pt-28 pb-16'>
      <div className='mx-auto w-full max-w-4xl px-4'>
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-400'>Welcome back</p>
            <h1 className='text-2xl font-bold text-white'>
              {user?.name ? `${user.name}` : "User Dashboard"}
            </h1>
          </div>
          <button
            onClick={handleOpenModal}
            className='inline-flex items-center justify-center rounded-md bg-[#9a00b3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b100d1]'
          >
            Edit Profile
          </button>
        </div>

        <div className='overflow-hidden rounded-xl border border-[#262626] bg-[#141414] shadow-lg'>
          <table className='w-full text-sm'>
            <tbody className='divide-y divide-[#262626]'>
              <tr>
                <td className='p-4 font-semibold text-white'>Name</td>
                <td className='p-4 text-gray-300'>
                  {user?.name || "Loading..."}
                </td>
              </tr>
              <tr>
                <td className='p-4 font-semibold text-white'>College</td>
                <td className='p-4 text-gray-300'>
                  {user?.college || "Loading..."}
                </td>
              </tr>
              <tr>
                <td className='p-4 font-semibold text-white'>Department</td>
                <td className='p-4 text-gray-300'>
                  {user?.department || "Loading..."}
                </td>
              </tr>
              <tr>
                <td className='p-4 font-semibold text-white'>Semester</td>
                <td className='p-4 text-gray-300'>
                  {user?.semester || "Loading..."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Registered Events Table */}
        <div className='mt-8'>
          <h2 className='mb-4 text-lg font-semibold text-white'>
            Registered Events
          </h2>
          <div className='overflow-hidden rounded-xl border border-[#262626] bg-[#141414] shadow-lg'>
            {eventsLoading ? (
              <p className='p-4 text-gray-300'>Loading...</p>
            ) : registeredEvents.length > 0 ? (
              <table className='w-full text-sm'>
                <thead className='border-b border-[#262626] bg-[#1a1a1a]'>
                  <tr>
                    <th className='p-4 text-left font-semibold text-white'>
                      Event Name
                    </th>
                    <th className='p-4 text-left font-semibold text-white'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-[#262626]'>
                  {registeredEvents.map((event) => (
                    <tr key={event.id}>
                      <td className='p-4 text-gray-300'>{event.name}</td>
                      <td className='p-4 text-gray-300'>{event.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className='p-4 text-gray-400'>No events registered</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm'>
          <div className='w-full max-w-lg rounded-xl border border-[#262626] bg-[#141414] p-6 shadow-2xl'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-white'>Edit Profile</h2>
              <button
                type='button'
                onClick={handleCloseModal}
                className='text-sm text-gray-400 transition hover:text-white'
              >
                Close
              </button>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-300'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                  required
                  className='w-full rounded-md border border-[#2a2a2a] bg-[#0f0f12] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9a00b3]'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-300'>
                  College
                </label>
                <input
                  type='text'
                  name='college'
                  value={formData?.college || ""}
                  onChange={handleInputChange}
                  required
                  className='w-full rounded-md border border-[#2a2a2a] bg-[#0f0f12] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9a00b3]'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-300'>
                  Department
                </label>
                <input
                  type='text'
                  name='department'
                  value={formData?.department || ""}
                  onChange={handleInputChange}
                  required
                  className='w-full rounded-md border border-[#2a2a2a] bg-[#0f0f12] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9a00b3]'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-300'>
                  Semester
                </label>
                <input
                  type='number'
                  name='semester'
                  value={formData?.semester || ""}
                  onChange={handleInputChange}
                  min='1'
                  max='8'
                  required
                  className='w-full rounded-md border border-[#2a2a2a] bg-[#0f0f12] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9a00b3]'
                />
              </div>

              <div className='flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='rounded-md border border-[#2a2a2a] px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-[#3a3a3a] hover:text-white'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='rounded-md bg-[#9a00b3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b100d1]'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className='fixed bottom-6 right-6 z-[60]'>
          <div
            className={`rounded-lg border px-4 py-3 text-sm shadow-xl backdrop-blur-sm ${
              toast.type === "error"
                ? "border-red-500/30 bg-red-500/10 text-red-200"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
