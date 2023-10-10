import React, { useState } from "react";
import { IMG_CDN } from "../util/constants";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiCheckFill } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import { addItem } from "../util/watchlaterslice";
import { addPlay } from "../util/movieSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const MovieCard = ({ posterPath, title, overview, movie }) => {
  const [heart, setheart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Handleheart = (movie) => {
    setheart(true);
    dispatch(addItem(movie));
  };

  const playVideo = (movie) => {
    dispatch(addPlay(movie));
    navigate("/play");
  };

  return (
    <div className="main">
      <div className="h-[350px] overflow-y-hidden">
        <div className="p-1 overflow-y-hidden">
          <div className="content w-[200px] relative shadow-lg rounded-lg cursor-pointer">
            <img src={IMG_CDN + posterPath} alt="" className="rounded-lg " />
            <div className="textContent bg-black bg-opacity-80 p-5 flex flex-col">
              <h1 className="text-white font-bold text-3xl">{title}</h1>
              <p className="text-xs text-white">
                {overview.length < 130
                  ? overview
                  : overview.slice(0, 130) + "....."}
              </p>
              <div className="flex justify-between items-center w-full">
                <button
                  className="text-white py-3 hover:bg-opacity-80 rounded-md flex items-center"
                  onClick={() => playVideo(movie)}
                >
                  <BsFillPlayFill className="text-2xl" />
                  Play
                </button>
                <div>
                  <button onClick={() => Handleheart(movie)}>
                    {heart ? (
                      <RiCheckFill className="text-3xl mt-3 text-green-500" />
                    ) : (
                      <IoAddCircleOutline className="text-3xl mt-3 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
