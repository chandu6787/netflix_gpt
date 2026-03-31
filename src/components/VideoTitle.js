import React from 'react'
import { FaPlay } from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>

      <p
        className="hidden md:inline-block py-6 text-lg w-1/4 overflow-hidden mb-4"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}
      >
        {overview}
      </p>

      <div className="my-4 md:m-0 flex items-center">
        
        {/* 🔥 Play Button */}
        <button className="flex items-center gap-3 bg-white text-black py-2 md:py-4 px-4 md:px-12 text-lg md:text-xl font-semibold rounded-lg hover:bg-opacity-80 transition">
          <FaPlay className="text-black text-lg md:text-xl" />
          Play
        </button>

        {/* 🔥 More Info Button */}
        <button className="hidden md:flex items-center gap-3 mx-2 bg-gray-500 text-white py-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-70 transition">
          More Info
        </button>

      </div>
    </div>
  );
}

export default VideoTitle;