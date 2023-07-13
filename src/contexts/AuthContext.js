import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { currentUser, signup, signin, logout } = useContext(AuthContext);
  return { currentUser, signup, signin, logout };
};
