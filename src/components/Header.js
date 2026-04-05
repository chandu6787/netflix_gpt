import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const gptshow = useSelector((store) => store.gpt.showGPTSearch);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-4 sm:px-8 py-3 bg-gradient-to-b from-black via-black/95 to-transparent z-50 flex flex-row justify-between items-center gap-3">
      {/* Logo */}
      <img
        className="w-28 sm:w-36 md:w-44 shrink-0"
        src={LOGO}
        alt="logo"
      />

      {/* Right section */}
      {user && (
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          {/* Language selector — only in GPT mode */}
          {gptshow && (
            <select
              onChange={handleLanguageChange}
              className="bg-black/70 text-white text-xs sm:text-sm border border-gray-600 rounded-md px-2 py-1.5 focus:outline-none focus:border-white transition-colors cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* GPT toggle button */}
          <button
            onClick={handleGPTSearchClick}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 rounded-full shadow-lg shadow-blue-900/50 transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            <span className="text-sm sm:text-base">🤖</span>
            <span className="hidden xs:inline sm:inline">
              {gptshow ? "Go to Home" : "GPT Search"}
            </span>
          </button>

          {/* User avatar */}
          <div className="relative group shrink-0">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover ring-2 ring-transparent group-hover:ring-white transition-all duration-300 cursor-pointer"
              src={user?.photoURL}
              alt="usericon"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full border-2 border-black"></span>
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 text-xs sm:text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-white px-3 sm:px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
          >
            <span>⏻</span>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;