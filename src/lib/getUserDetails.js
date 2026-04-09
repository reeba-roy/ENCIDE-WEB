import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const getUserDetails = async (userId) => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};
