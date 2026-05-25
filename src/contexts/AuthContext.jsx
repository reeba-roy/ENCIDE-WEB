import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setIsAdmin(userDoc.data().isAdmin === true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user data in AuthContext:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsAdmin(false);
    return signOut(auth);
  };

  const deleteCurrentUser = () => deleteUser(user);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, login, signup, logout, deleteCurrentUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
