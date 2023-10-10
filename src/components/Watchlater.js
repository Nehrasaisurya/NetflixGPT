import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NETFLIX_LOGO } from "../util/constants";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IMG_CDN } from "../util/constants";
import { addPlay } from "../util/movieSlice";
import { useNavigate } from "react-router";
import { BsFillPlayFill } from "react-icons/bs";

const Header = () => {
  const [dropdown, setdropdowm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDropdown = () => {
    setdropdowm(!dropdown);
  };

  const playVideo = (movie) => {
    dispatch(addPlay(movie));
    navigate("/play");
  };

  const user = useSelector((store) => store.user);
  const watchlater = useSelector((store) => store.watchlater.items);

  return (
    <div>
      <div className="absolute top-0 left-0 w-[100%] px-4 md:px-8 py-2 z-100 bg-gradient-to-b from-black z-10 flex items-center justify-between">
        <Link to="/browse">
          {" "}
          <img src={NETFLIX_LOGO} alt="logo" className="w-32 md:w-44" />
        </Link>
        {user && (
          <div className="flex items-center gap-6">
            <Link to="/browse">
              <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-sm  text-white font-bold">
                Home
              </button>
            </Link>
            <div className="flex cursor-pointer" onClick={handleDropdown}>
              <img src={user?.photoURL} className="w-10 rounded-sm" alt=".." />
              <button>
                <RiArrowDropDownLine className="text-white font-bold text-xl" />
              </button>
            </div>

            {dropdown && (
              <div className="absolute top-20 right-10 bg-black bg-opacity-80 px-10 pb-10 pt-16 clip rounded-md">
                <div className="flex items-center mb-5">
                  <img
                    src={user?.photoURL}
                    className="w-10 rounded-sm mr-3"
                    alt=".."
                  />
                  <h1 className="text-white">{user?.displayName}</h1>
                </div>
                <h1 className="text-xl text-white">Manage Profiles</h1>
                <p className="text-white">-----------------------</p>
                <h1 className="text-white">Account</h1>
                <h1 className="text-white">Help Center</h1>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-36 px-8 md:px-32">
        <h1 className="text-3xl font-bold text-white">Your Watchlater...</h1>
        <div className="flex overflow-x-scroll gap-7 mt-5">
          {watchlater.length !== 0 ? (
            watchlater.map((movie, index) => (
              <div className="main" key={index}>
                <div className=" overflow-y-hidden">
                  <div className="p-1 overflow-y-hidden">
                    <div className="w-[200px] relative shadow-lg rounded-lg ">
                      <img
                        src={IMG_CDN + movie.poster_path}
                        alt=""
                        className="rounded-lg"
                      />
                    </div>
                    <button
                      className="text-white py-3 hover:bg-opacity-80 rounded-md flex items-center"
                      onClick={() => playVideo(movie)}
                    >
                      <BsFillPlayFill className="text-2xl" />
                      Play
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white">
              <h1 className="text-xl">
                Your Watchlist is a blank canvas waiting to be painted with
                cinematic masterpieces .{" "}
                <Link to="/browse" className="underline">
                  Join the Netflix adventure now!
                </Link>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
