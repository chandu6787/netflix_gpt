import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

const TrailerModal = ({ trailerKey, loading, title, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const renderBody = () => {
    if (loading) {
      return (
        <div className="w-full aspect-video bg-zinc-900 rounded-b-xl flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading trailer...</p>
        </div>
      );
    }
    if (!trailerKey) {
      return (
        <div className="w-full aspect-video bg-zinc-900 rounded-b-xl flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">🎬</span>
          <p className="text-gray-300 font-medium text-sm">No trailer available</p>
          <p className="text-gray-500 text-xs">TMDB has no video for this title</p>
        </div>
      );
    }
    return (
      <div className="relative w-full aspect-video bg-black rounded-b-xl overflow-hidden">
        <iframe
          className="w-full h-full scale-[1.01]"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* Mask YouTube title bar at top — extra tall to cover white line */}
        <div className="absolute top-0 left-0 w-full h-16 bg-black pointer-events-none" />
        {/* Mask YouTube progress bar + branding at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-14 bg-black pointer-events-none" />
        {/* Red animated progress line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-800 pointer-events-none">
          <div
            className="h-full bg-red-600 rounded-full"
            style={{
              animation: "progress linear 1 forwards",
              animationDuration: "180s", // adjust to match your average trailer length
            }}
          />
        </div>
        <style>{`
          @keyframes progress {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>
      </div>
    );
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[92vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 rounded-t-xl border-b border-white/10">
          <h2 className="text-white font-semibold text-sm sm:text-base truncate pr-4">
            {title || "Trailer"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-200 shrink-0"
            aria-label="Close trailer"
          >
            <IoClose size={22} />
          </button>
        </div>

        {renderBody()}
      </div>
    </div>
  );

  // Portal renders modal directly into document.body,
  // escaping any parent transforms/stacking contexts
  return ReactDOM.createPortal(modalContent, document.body);
};

export default TrailerModal;
