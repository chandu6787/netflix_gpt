import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideos } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailers = (movieId) => {
  const dispatch = useDispatch();
useEffect(() => {
  if (!movieId) return;

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );

      const json = await data.json();

      // 🔥 IMPORTANT
      if (!json.results || json.results.length === 0) {
        console.log("No videos found");
        return; // ⛔ STOP here
      }

      const trailer =
        json.results.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        ) ||
        json.results[0];

      if (!trailer) return; // extra safety

      console.log("Final trailer:", trailer);

      dispatch(addTrailerVideos(trailer));
    } catch (error) {
      console.error(error);
    }
  };

  getMovieVideos();
}, [movieId, dispatch]);
  
};

export default useMovieTrailers;
