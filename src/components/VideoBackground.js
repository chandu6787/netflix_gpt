import { useSelector } from "react-redux";
import useMovieTrailers from "../hooks/useMovieTrailers";

const VideoBackground = ({ movieId }) => {
  useMovieTrailers(movieId);
  const trailerVideo = useSelector((store) => store.movies?.TrailerVideos);
  if (!trailerVideo) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&playsinline=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      {/* Mask YouTube title bar at the top */}
      <div className="absolute top-0 left-0 w-full h-16 bg-black pointer-events-none" />

      {/* Mask YouTube logo/watermark at the bottom-right */}
      <div className="absolute bottom-0 right-0 w-36 h-14 bg-black pointer-events-none" />

      {/* Bottom fade into SecondaryContainer */}
      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-40 md:h-72 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoBackground;