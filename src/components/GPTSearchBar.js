import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_BAR_TEXT } from "../utils/languageConstants";
import { getGroqResult } from "../utils/groq";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearch = async () => {
    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const text = await getGroqResult(gptQuery);
      const gptMovies = text.split(",");
      const PromiseArray = gptMovies.map((movie) => searchMovie(movie));
      const TMDBMovies = await Promise.all(PromiseArray);
      dispatch(addGptMovieResult({ gptMovies, TMDBMovies }));
    } catch (err) {
      console.error("Groq error:", err);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 md:pt-[12%] px-4 flex justify-center">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-black/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row items-stretch">
          <input
            type="text"
            className="flex-1 p-4 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none border-b sm:border-b-0 sm:border-r border-white/10"
            placeholder={SEARCH_BAR_TEXT[langKey]?.placeholder || "Search for movies..."}
            ref={searchText}
          />
          <button
            className="px-6 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm sm:text-base transition-colors duration-200 whitespace-nowrap"
            onClick={handleSearch}
          >
            {SEARCH_BAR_TEXT[langKey]?.search || "Search"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GPTSearchBar;