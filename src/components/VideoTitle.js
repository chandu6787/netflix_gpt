import React from "react";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end pb-[8%] sm:pb-[16%] md:pb-[20%] px-4 sm:px-10 md:px-16 lg:px-24 text-white bg-gradient-to-r from-black/90 via-black/40 to-transparent">

      {/* Title — visible on all screen sizes */}
      <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold drop-shadow-lg leading-tight max-w-[200px] sm:max-w-md md:max-w-lg">
        {title}
      </h1>

      {/* Overview — shown on md and above only */}
      <div className="hidden md:block mt-3 md:mt-4 max-w-xs lg:max-w-sm">
        <p className="text-sm lg:text-base text-gray-200 leading-relaxed line-clamp-3">
          {overview}
        </p>
      </div>

      {/* Buttons — visible on all screen sizes */}
      <div className="flex items-center gap-2 sm:gap-3 mt-3 md:mt-5">
        <button className="flex items-center gap-1.5 bg-white text-black py-1.5 px-4 sm:py-3 sm:px-8 md:py-3 md:px-10 text-xs sm:text-base md:text-lg font-bold rounded-md hover:bg-opacity-80 active:scale-95 transition-all duration-200 shadow-lg">
          <FaPlay className="text-black text-[10px] sm:text-sm md:text-base" />
          Play
        </button>

        <button className="flex items-center gap-1.5 bg-gray-500/60 text-white py-1.5 px-3 sm:py-3 sm:px-6 md:py-3 md:px-8 text-xs sm:text-base md:text-lg rounded-md hover:bg-gray-500/80 active:scale-95 transition-all duration-200 backdrop-blur-sm">
          <BsInfoCircle className="text-xs sm:text-base" />
          <span className="hidden sm:inline">More Info</span>
          <span className="inline sm:hidden">Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;