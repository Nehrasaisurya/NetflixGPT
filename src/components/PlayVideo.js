import React, { useState } from "react";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../util/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPlay } from "../util/movieSlice";

const PlayVideo = () => {
  const video = useSelector((store) => store.movies.play);

  const dispatch = useDispatch();

  const [key, setkey] = useState();

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        video?.id +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((r) => r.type === "Trailer");
    const Trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addPlay(null));
    setkey(Trailer);
  };

  useEffect(() => {
    getMovieVideos();
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe
        className="w-full h-full brightness-150"
        src={
          "https://www.youtube.com/embed/" +
          key?.key +
          "?autoplay=1&mute=1&controls=1&loop=1"
        }
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default PlayVideo;
