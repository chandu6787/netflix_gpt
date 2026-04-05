import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black pb-10 sm:pb-14">
      {/* On mobile: small overlap. On larger screens: deeper overlap into the video fade zone */}
      <div className="-mt-8 sm:-mt-24 md:-mt-40 lg:-mt-56 relative z-20">
        <MovieList title="Now Playing" movies={movies?.NowPlayingMovies} />
      </div>

      <div className="mt-2 sm:mt-4">
        <MovieList title="Popular" movies={movies?.PopularMovies} />
      </div>
      <MovieList title="Top Rated" movies={movies?.TopRatedMovies} />
      <MovieList title="Upcoming" movies={movies?.UpcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;