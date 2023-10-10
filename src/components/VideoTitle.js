import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full flex absolute flex-col h-screen justify-center px-8 md:px-14 text-white bg-black bg-opacity-60 md:bg-opacity-0 md:bg-gradient-to-r md:from-[#000] ">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-md mt-5 w-12/12 sm:w-10/12 md:w-6/12 lg:w-4/12">
        {overview}
      </p>
      <div className="mt-6 flex gap-5">
        <button className="bg-white text-black px-6 py-3 hover:bg-opacity-80 rounded-md flex items-center">
          <BsFillPlayFill className="text-2xl" />
          Play
        </button>
        <button className="bg-[#333333] text-white bg-opacity-80 hover:bg-opacity-70 px-6 py-3 rounded-md  flex items-center gap-1">
          <AiOutlineInfoCircle className="text-2xl" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
