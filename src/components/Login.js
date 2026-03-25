import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { validateEP } from "../utils/validateEP";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true); // true = Sign In

  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    // validate + call Firebase
    const message = validateEP(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message)
      return;
    if(!isSignInForm)
    {

createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" ->"+errorMessage);
    // ..
  });

    }else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"->"+errorMessage);
  });


    }
    
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative min-h-screen">
      <Header />

      <div className="absolute inset-0 -z-10 ">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_small.jpg"
          alt="background"
        />
      </div>
      <form
        className="absolute p-12 bg-black bg-opacity-80 w-3/12 mx-auto right-0 left-0 top-[15%] rounded-lg text-white"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl font-bold mb-7">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Name field — only for Sign Up */}
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 rounded"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700 rounded"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 rounded"
        />
        <p className="text-red-500">{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          type="button"
          className="p-4 my-4 bg-red-600 w-full rounded font-bold"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle between Sign In / Sign Up */}
        <p className="mt-4 text-gray-400">
          {isSignInForm ? "New to Netflix? " : "Already registered? "}
          <span
            onClick={toggleSignInForm}
            className="text-white cursor-pointer font-bold"
          >
            {isSignInForm ? "Sign Up Now" : "Sign In Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
