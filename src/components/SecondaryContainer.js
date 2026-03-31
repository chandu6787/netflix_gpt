import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black">
      <div className="-mt-52 relative z-20">
        <MovieList title={"Now Playing"} movies={movies?.NowPlayingMovies} />
      </div>
      <MovieList title={"Popular"} movies={movies?.PopularMovies} />
      <MovieList title={"Top Rated"} movies={movies?.TopRatedMovies} />
      <MovieList title={"Upcoming "} movies={movies?.UpcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
