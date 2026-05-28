import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const normalizeDate = (field) => {
  if (!field) return null;
  if (typeof field.toDate === "function") return field.toDate();
  if (field instanceof Date) return field;
  return null;
};

export const getRegisteredEvents = async (allEventIDs) => {
  if (!Array.isArray(allEventIDs)) return [];
  
  const promises = allEventIDs.map(async (id) => {
    const ref = doc(db, "events", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    
    return { id, ...snap.data(), date: normalizeDate(snap.data().date) };
  });

  const results = await Promise.all(promises);
  return results.filter(Boolean);
};
