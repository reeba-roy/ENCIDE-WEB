import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  increment,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const normalizeDate = (field) => {
  if (!field) return null;
  if (typeof field.toDate === "function") return field.toDate();
  if (field instanceof Date) return field;
  return null;
};

export const fetchEvents = async () => {
  const q = query(
    collection(db, "events"),
    where("highlighted", "==", false),
    where("is_over", "==", false),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: normalizeDate(doc.data().date),
    deadline: normalizeDate(doc.data().deadline),
  }));
};

export const fetchFeaturedEvent = async () => {
  const q = query(
    collection(db, "events"),
    where("highlighted", "==", true),
    where("is_over", "==", false),
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => {
    const raw = doc.data();
    return {
      id: doc.id,
      ...raw,
      date: normalizeDate(raw.date),
      deadline: normalizeDate(raw.deadline),
    };
  });
  return data[0];
};

export const fetchPastEvents = async () => {
  const q = query(collection(db, "events"), where("is_over", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: normalizeDate(doc.data().date),
  }));
};



