import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { validateEP } from "../utils/validateEP";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { user_Avatar, BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const email = useRef(null);
  const password = useRef(null);
  const displayName = useRef(null);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    const message = validateEP(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: displayName.current.value,
            photoURL: user_Avatar,
          })
            .then(() => {
              const { uid, email: userEmail, displayName: userDisplayName, photoURL } =
                auth.currentUser;
              dispatch(addUser({ uid, email: userEmail, displayName: userDisplayName, photoURL }));
            })
            .catch(() => setErrorMessage("Error updating profile."));
        })
        .catch((error) => setErrorMessage(error.code + "  " + error.message));
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const { uid, email: userEmail, displayName: userDisplayName, photoURL } =
            userCredential.user;
          dispatch(addUser({ uid, email: userEmail, displayName: userDisplayName, photoURL }));
        })
        .catch((error) => setErrorMessage(error.code + " -> " + error.message));
    }
  };

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  return (
    <div className="relative min-h-screen">
      <Header />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img className="w-full h-full object-cover" src={BG_URL} alt="background" />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/40" />
      </div>

      {/* Form Card */}
      <div className="flex items-center justify-center min-h-screen px-4 py-24">
        <form
          className="w-full max-w-sm sm:max-w-md bg-black/85 backdrop-blur-sm px-8 py-10 sm:px-12 rounded-xl text-white shadow-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 w-full bg-zinc-700/80 rounded-md border border-zinc-600 focus:border-white focus:outline-none transition-colors placeholder-gray-400 text-sm"
              ref={displayName}
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-zinc-700/80 rounded-md border border-zinc-600 focus:border-white focus:outline-none transition-colors placeholder-gray-400 text-sm"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-zinc-700/80 rounded-md border border-zinc-600 focus:border-white focus:outline-none transition-colors placeholder-gray-400 text-sm"
          />

          {errorMessage && (
            <p className="text-red-400 text-sm mt-1 px-1">{errorMessage}</p>
          )}

          <button
            onClick={handleButtonClick}
            type="button"
            className="p-4 mt-6 mb-2 bg-red-600 hover:bg-red-700 active:bg-red-800 w-full rounded-md font-bold text-base tracking-wide transition-colors"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-5 text-gray-400 text-sm">
            {isSignInForm ? "New to Netflix? " : "Already registered? "}
            <span
              onClick={toggleSignInForm}
              className="text-white cursor-pointer font-semibold hover:underline"
            >
              {isSignInForm ? "Sign Up Now" : "Sign In Now"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;