import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-4 sm:px-6 md:px-10 py-2">
      <h1 className="text-base sm:text-xl md:text-2xl font-semibold py-2 sm:py-4 text-white tracking-wide">
        {title}
      </h1>

      {/* Scrollable row */}
      <div
        className="flex overflow-x-scroll pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-0">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              posterpath={movie.poster_path}
              title={movie.title || movie.original_title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;