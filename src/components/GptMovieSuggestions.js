import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { gptMovies, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="mx-2 sm:mx-4 md:mx-8 my-4 sm:my-6 bg-black/90 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden">
      <div className="py-2">
        {movieNames.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={gptMovies[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;