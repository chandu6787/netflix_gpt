import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="background"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative  pb-12">
        <GPTSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GPTSearch;