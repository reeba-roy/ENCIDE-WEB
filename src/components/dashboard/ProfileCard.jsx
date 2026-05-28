import { motion } from "framer-motion";
import { Mail, School, Building, GraduationCap, Edit3, X, Phone, AwardIcon } from "lucide-react";
import { useState } from "react";
import EditModal from "../pop-up/EditProfile";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ProfileCard = ({ user: initialUser }) => {

  const [profileData, setProfileData] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  const editUserDetails = async (updatedUser) => {
    setProfileData(updatedUser)
    console.log("Updated user : ", updatedUser)
    try {
      const userRef = doc(db, "users", initialUser.id)
      await updateDoc(userRef, updatedUser)

    } catch (error) {
      console.log("Some error occured", error)
    }
  }

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  const infoItems = [
    { icon: Mail, label: "Email", value: profileData.email },
    { icon: Phone, label: "Phone", value: profileData.phone },
    { icon: School, label: "College", value: profileData.college },
    { icon: Building, label: "Department", value: profileData.department },
    { icon: GraduationCap, label: "Semester", value: profileData.semester },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden h-full">
          {/* Banner Gradient */}
          <div className="h-24 bg-red-950/40 backdrop-blur-md border-b border-red-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_70%)]" />
          </div>
          <div className="px-6 pb-6 -mt-12 text-center">
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-neutral-950 shadow-xl bg-neutral-900 flex items-center justify-center relative mb-3">
              {profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-red-400 text-2xl font-bold">
                  {getInitials(profileData.name)}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white">{profileData.name}</h2>
            <p className="text-sm text-neutral-400 mb-4">
              {profileData.department}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/50 text-neutral-300 text-sm hover:bg-red-600/20 hover:text-white hover:border-red-500/50 transition-all duration-300"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          </div>
          <div className="h-px bg-neutral-800 mx-6 mb-6" />
          <div className="px-6 pb-6 space-y-4">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="p-1.5 rounded-lg bg-red-500/10">
                  <item.icon className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs text-neutral-500">{item.label}</p>
                  <p className="text-neutral-200 truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <EditModal
        user={profileData}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={(updatedUser) => editUserDetails(updatedUser)}
      />
    </>
  );
};
export default ProfileCard;
