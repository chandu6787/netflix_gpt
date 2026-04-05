import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.NowPlayingMovies);
  if (!movies || movies.length === 0) return null;

  const { original_title, overview, id } = movies[8];

  return (
     <div className="relative bg-black w-full h-[75vw] min-h-[300px] sm:h-[60vw] sm:min-h-[380px] md:aspect-video md:h-auto">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;