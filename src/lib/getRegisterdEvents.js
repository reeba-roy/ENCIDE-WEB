import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const normalizeDate = (field) => {
  if (!field) return null;
  if (typeof field.toDate === "function") return field.toDate();
  if (field instanceof Date) return field;
  return null;
};

export const getRegisteredEvents = async (allEventIDs) => {
  const promises = allEventIDs.map(async (id) => {
    const ref = doc(db, "events", id);
    const snap = await getDoc(ref);
    return { id, ...snap.data(), date: normalizeDate(snap.data().date) };
  });

  return Promise.all(promises);
};
