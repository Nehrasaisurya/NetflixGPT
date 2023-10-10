import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN } from "../util/constants";
import { BsFillPlayFill } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addItem } from "../util/watchlaterslice";
import { addPlay } from "../util/movieSlice";
import { useNavigate } from "react-router";

const GptMovieSuggestions = () => {
  const { movieResults } = useSelector((store) => store.gpt);
  const loading = useSelector((store) => store.gpt.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleCart = (movie) => {
    dispatch(addItem(movie[0]));
  };

  const playVideo = (movie) => {
    dispatch(addPlay(movie[0]));
    navigate("/play");
  };

  if (!movieResults && !loading) {
    return (
      <h1 className="flex justify-center mt-10 text-white px-8 text-sm">
        Stuck on what to watch? Let us pick the perfect movie for you, enter
        what's in you head
      </h1>
    );
  } else if (!movieResults && loading) {
    return (
      <h1 className="flex justify-center mt-40 text-white">Loading.....</h1>
    );
  }
  return (
    <div className="flex justify-start flex-row md:flex-col px-2 sm:px-4 md:px-10 lg:px-52 xl:px-96 mt-10">
      <div>
        {movieResults.map((movie, index) => (
          <div
            className="flex justify-center flex-col sm:flex-row pb-2 pt-8"
            style={{ borderBottom: "1px solid gray" }}
            key={index}
          >
            <img
              src={IMG_CDN + movie[0].poster_path}
              alt="..."
              className="w-52 rounded-md mx-8"
            />
            <div className="text-white px-8 py-2">
              <h1 className="text-red-500 text-3xl font-bold">
                {movie[0].title}
              </h1>
              <p className="text-white mt-2 text-lg text-opacity-95">
                {movie[0].overview.length < 150
                  ? movie[0].overview
                  : movie[0].overview.slice(0, 150) + "...."}
              </p>
              <h1 className="mt-2 text-md text-white text-opacity-70">
                Released On:{" "}
                {movie[0].release_date.split("-").reverse().join("-")}
              </h1>
              <div className="flex gap-2 text-md text-white text-opacity-50">
                <h1>
                  {Math.floor(movie[0].vote_average * 10)}% Liked the movie
                </h1>
                <span>•</span>
                <h1>{movie[0].vote_count} votes</h1>
              </div>
              <div className="mt-6 flex gap-5">
                <button
                  className="bg-white text-black px-6 py-3 hover:bg-opacity-80 rounded-md flex items-center"
                  onClick={() => playVideo(movie)}
                >
                  <BsFillPlayFill className="text-2xl" />
                  Play
                </button>
                <button
                  className="bg-[#333333] text-white bg-opacity-80 hover:bg-opacity-70 p-3 rounded-md  flex items-center gap-1"
                  onClick={() => HandleCart(movie)}
                >
                  <IoAddCircleOutline className="text-2xl text-white" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
