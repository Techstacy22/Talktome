import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

// createContext() makes a "container" that can share data with any component
// Think of it like a global variable, but the React way
const AuthContext = createContext();

// Custom hook - instead of writing useContext(AuthContext) everywhere,
// components can just call useAuth() to get the current user and auth functions
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider wraps your entire app and provides auth data to all components
export function AuthProvider({ children }) {
  // currentUser will hold the Firebase user object (or null if logged out)
  const [currentUser, setCurrentUser] = useState(null);
  // loading is true while Firebase checks if a user is already logged in
  const [loading, setLoading] = useState(true);

  // --- Auth Functions ---
  // Each function calls a Firebase method and returns a Promise
  // A Promise means: "this will finish later" (it talks to Firebase servers)

  // Sign up: creates a new account, then sets the user's display name
  async function signup(email, password, name) {
    // createUserWithEmailAndPassword sends email/password to Firebase
    // Firebase creates the account and returns the user object
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // updateProfile adds the user's name to their account
    await updateProfile(result.user, { displayName: name });
    return result;
  }

  // Login: checks email/password against existing accounts
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout: clears the user's session
  function logout() {
    return signOut(auth);
  }

  // Google sign-in: opens a popup window where user picks their Google account
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // GitHub sign-in: opens a popup window for GitHub authorization
  function signInWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // --- Auth State Listener ---
  // useEffect runs once when the component mounts
  // onAuthStateChanged is a Firebase listener that fires whenever:
  //   - A user logs in
  //   - A user logs out
  //   - The page refreshes (Firebase checks if there's a saved session)
  // This is what keeps users logged in even after refreshing the page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // user object if logged in, null if logged out
      setLoading(false);    // done checking, safe to render the app
    });
    // Cleanup: stop listening when the component unmounts
    return unsubscribe;
  }, []);

  // Everything in "value" will be available to any component that calls useAuth()
  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    signInWithGithub
  };

  // Don't render children until Firebase has checked for an existing session
  // This prevents a flash where the user appears logged out for a split second
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
