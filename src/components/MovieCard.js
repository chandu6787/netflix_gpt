import React, { useState } from "react";
import { BASE_IMAGE_URL, API_OPTIONS } from "../utils/constants";
import TrailerModal from "./Trailermodal";
import { FaPlay } from "react-icons/fa";

const MovieCard = ({ posterpath, id, title }) => {
  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!posterpath) return null;

  const handleClick = async () => {
    setShowModal(true);
    setLoading(true);
    setTrailerKey(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        API_OPTIONS,
      );
      const data = await res.json();

      const trailer =
        data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        data.results.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
        data.results[0];

      setTrailerKey(trailer?.key || null);
    } catch (err) {
      console.error("Trailer fetch error:", err);
      setTrailerKey(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTrailerKey(null);
    setLoading(false);
  };

  return (
    <>
      <div
        className="w-28 sm:w-36 md:w-44 pr-2 sm:pr-3 shrink-0 group cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative overflow-hidden rounded-md shadow-lg ring-1 ring-white/0 group-hover:ring-white/40 transition-all duration-300">
          <img
            alt={title || "Movie"}
            src={BASE_IMAGE_URL + posterpath}
            className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2.5 shadow-xl">
              <FaPlay className="text-black text-xs ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TrailerModal
          trailerKey={trailerKey}
          loading={loading}
          title={title}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default MovieCard;